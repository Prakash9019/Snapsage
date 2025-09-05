
import React, { useState, useRef } from "react";
import { SafeAreaView, ActivityIndicator, View, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axiosClient from '../api/axiosClient';
import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "@react-native-firebase/auth";
import { auth } from "../api/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
   isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import Image1 from "./image.png"
import OtpVerificationScreen from './OtpVerificationScreen';
import { Text, TextInput } from "../../global"

const { width, height } = Dimensions.get('window');

GoogleSignin.configure({
    webClientId: "43834655102-imbc0de7q0ldcv6fvcooutl3jf8999j1.apps.googleusercontent.com",
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId: "43834655102-jnmjrht1n89g07ut7uqf6bjc839dse3f.apps.googleusercontent.com",
});

interface AuthScreenProps {
  onLogin: (token: string) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
 const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
    const [confirm, setConfirm] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authMode, setAuthMode] = useState<'main' | 'email' | 'otp' | 'email-otp'>('main');
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
const [otploading, setotpLoading] = useState(false);
  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      axiosClient.defaults.headers.common['x-auth-token'] = token;
      onLogin(token);
    } catch (error) {
      Alert.alert('Error', 'Failed to save token.');
    }
  };


   const handleSendOtp = async () => {
     if (!mobileNumber) {
       Alert.alert("Error", "Please enter mobile number");
       return;
     }
     setotpLoading(true);
     try {
       const confirmation = await signInWithPhoneNumber(getAuth(), "+91" + mobileNumber);
       setConfirm(confirmation);
       setAuthMode("otp");
       Alert.alert("Success", "OTP sent!");
     } catch (err: any) {
       Alert.alert("Error", err.message || "Failed to send OTP");
     } finally {
       setotpLoading(false);
     }
   };
const handleVerifyOtp = async (otpCode: string) => {
  if (!confirm) return;
  setotpLoading(true);
  try {
    const userCredential = await confirm.confirm(otpCode);
    const user = userCredential.user;

    // Firebase ID token
    const idToken = await user.getIdToken();

    // Call backend
    const res = await axiosClient.post("/auth/login-phone-firebase", {
      token: idToken,
    });

    await saveToken(res.data.token);
    Alert.alert("Success", "Login successful!");
  } catch (error: any) {
    Alert.alert("Error", error.message || "Invalid OTP");
  } finally {
    setotpLoading(false);
  }
};



  const handleSendEmailOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email.');
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosClient.post('/auth/send-email-otp', { email });
      setOtpSessionId(res.data.sessionId);
      setAuthMode('email-otp');
      Alert.alert('Success', 'OTP sent to your email!');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.msg || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (otpCode: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosClient.post('/auth/verify-email-otp', { email, code: otpCode, password });
      saveToken(res.data.token);
      Alert.alert('Success', 'Login successful!');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.msg || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const [userInfo,setUserInfo]=useState<any>(null);
  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      const idToken = response.data.idToken;

      if (!idToken) {
        Alert.alert('Error', 'No ID token found from Google');
        setLoading(false);
        return;
      }

      const res = await axiosClient.post('/auth/login-google', { token: idToken });

      await saveToken(res.data.token);

      Alert.alert('Success', 'Google login successful!');
    } else {
      Alert.alert('Cancelled', 'User cancelled sign-in flow');
    }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available or outdated');
      } else {
        Alert.alert('Error', `Google sign-in failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case 'main':
        return (
          <>
           <Image
                  source={Image1}
                  resizeMode={"stretch"}
                  style={styles.image}
                />
            <View style={styles.contentContainer}>
             <View style={styles.phoneInputRow}>
                <Text style={styles.phoneCode}>+91</Text>
                <Text style={styles.line}>|</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter Phone Number"
                  placeholderTextColor="#71727A"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity 
                style={[styles.continueButton, loading && styles.buttonDisabled]} 
                onPress={handleSendOtp} 
                disabled={loading}
              >
                {otploading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.continueButtonText}>Continue</Text>
                )}
              </TouchableOpacity> 
                {/* <TouchableOpacity style={styles.emailButton} onPress={() => setAuthMode('email')} disabled={loading}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/4k5uas9t_expires_30_days.png" }}
                  style={styles.emailIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Continue with Email</Text>
              </TouchableOpacity> */}

              <View style={styles.orRow}>
                <View style={styles.divider} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.divider} />
              </View>
              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={loading}>
                {loading ? <ActivityIndicator /> : (
                  <>
                    <Image
                      source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/2gpeiykv_expires_30_days.png" }}
                      style={styles.googleIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.emailButton} onPress={() => setAuthMode('email')} disabled={loading}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/4k5uas9t_expires_30_days.png" }}
                  style={styles.emailIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Continue with Email</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: height * 0.05 }}>
            <Text style={styles.legalText}>
              {"By continuing, you agree to our\n"}
              <Text style={styles.legalLink}>Terms of Service</Text>{" | "}
              <Text style={styles.legalLink}>Privacy Policy</Text>{" | "}
              <Text style={styles.legalLink}>Content Policy</Text>
            </Text></View>
          </>
        );
      case 'otp':
        return <OtpVerificationScreen onVerified={handleVerifyOtp} onGoBack={() => setAuthMode('main')} mobileNumber={mobileNumber} />;
      case 'email':
        return (
          <View style={styles.emailFormContainer}>
            <Text style={styles.emailTitle}>Continue with Email</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.emailSignInButton} onPress={handleSendEmailOtp} disabled={loading}> 
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.emailSignInButtonText}>Sign In</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAuthMode('main')}> 
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );
      case 'email-otp':
        return <OtpVerificationScreen onVerified={handleVerifyEmailOtp} onGoBack={() => setAuthMode('email')} mobileNumber={email} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderAuthForm()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    width: width * 0.85,
    height: width * 0.80,
    marginBottom: height * 0.03,
  },
  text: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    width: '85%',
    alignItems: 'center',
    marginTop: height * 0.02
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    marginBottom: height * 0.02,
  },
  line: {
    fontSize: width * 0.05,
    color: '#71727A',
    marginRight: width * 0.02,
  },
  phoneCode: {
    fontSize: width * 0.04,
    color: '#71727A',
    marginRight: width * 0.02,
  },
  phoneInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#2C5FDD',
    width: '100%',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.03,
    //  marginTop: height * 0.03,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#EDF1F3',
  },
  orText: {
    marginHorizontal: width * 0.04,
    color: '#6C7278',
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#EFF0F6',
    borderRadius: 10,
    paddingVertical: height * 0.025,
    marginBottom: height * 0.015,
  },
  googleIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.03,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#EFF0F6',
    borderRadius: 10,
    paddingVertical: height * 0.025,
  },
  emailIcon: {
    width: width * 0.05,
    height: width * 0.04,
    marginRight: width * 0.03,
  },
  socialButtonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  legalText: {
    fontSize: width * 0.025,
    color: '#000',
    textAlign: 'center',
    marginTop: height * 0.05,
    width: width * 0.7,
  },
  legalLink: {
    color: '#2C5FDD',
  },
  emailFormContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  emailTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.05,
  },
  emailInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
  emailSignInButton: {
    backgroundColor: '#2C5FDD',
    width: '100%',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  emailSignInButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold'
  },
  backButtonText: {
    color: '#2C5FDD',
    marginTop: height * 0.02,
  },
});




// import { useState, useEffect } from 'react';
// import { Button, TextInput } from 'react-native';
// import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from '@react-native-firebase/auth';

// export default function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   // verification code (OTP - One-Time-Passcode)
//   const [code, setCode] = useState('');

//   // Handle login
//   function handleAuthStateChanged(user) {
//     if (user) {
//       // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
//       // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
//       // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
//       // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
//     }
//   }

//   useEffect(() => {
//     const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle the button press
//   async function handleSignInWithPhoneNumber(phoneNumber) {
//     console.log("REACHED HERE");
//     try{
//     const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
//      console.log("__________THIS IS CONFORMATION____________",confirmation);
//     setConfirm(confirmation);
//     }catch(e){
//       console.log("______THIS SI ERROR____________",e);
//     }
   
//   }

// async function confirmCode() {
//   if (!confirm) return;
//   try {
//     await confirm.confirm(code);
//     console.log("✅ User signed in successfully");
//   } catch (error) {
//     console.log("❌ Invalid code:", error);
//   }
// }


//   if (!confirm) {
//     console.log("JJJJJJJJJJJJJJj")
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => handleSignInWithPhoneNumber('+91 6301750186')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }