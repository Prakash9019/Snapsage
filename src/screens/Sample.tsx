// AuthScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, View, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes, isSuccessResponse } from '@react-native-google-signin/google-signin';
import OtpVerificationScreen from './OtpVerificationScreen';
import { Text, TextInput } from "../../global";

const { width, height } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: "43834655102-imbc0de7q0ldcv6fvcooutl3jf8999j1.apps.googleusercontent.com",
  iosClientId: "43834655102-jnmjrht1n89g07ut7uqf6bjc839dse3f.apps.googleusercontent.com",
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

interface AuthScreenProps {
  onLogin: (token: string) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'main' | 'otp' | 'email' | 'email-otp'>('main');
  const [loading, setLoading] = useState(false);

  // Save JWT/token
  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      onLogin(token);
    } catch {
      Alert.alert("Error", "Failed to save token.");
    }
  };

  // Firebase listener
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          saveToken(idToken); // Save Firebase token
          Alert.alert("Success", "Login successful!");
        });
      }
    });
    return subscriber;
  }, []);

  // Send OTP
  const handleSendOtp = async () => {
    if (!mobileNumber) {
      Alert.alert("Error", "Please enter mobile number");
      return;
    }
    setLoading(true);
    try {
      const confirmation = await signInWithPhoneNumber(getAuth(), "+91" + mobileNumber);
      setConfirm(confirmation);
      setAuthMode("otp");
      Alert.alert("Success", "OTP sent!");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (otpCode: string) => {
    if (!confirm) return;
    try {
      await confirm.confirm(otpCode);
      Alert.alert("Success", "Phone verified!");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  // Google sign in (unchanged)
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;
        if (idToken) saveToken(idToken);
      }
    } catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case "main":
        return (
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.continueButtonText}>Send OTP</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        );

      case "otp":
        return (
          <OtpVerificationScreen
            onVerified={handleVerifyOtp}
            onGoBack={() => setAuthMode("main")}
            mobileNumber={mobileNumber}
          />
        );
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
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollViewContent: { flexGrow: 1, alignItems: "center" },
  contentContainer: { width: "85%", marginTop: height * 0.1 },
  phoneInput: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 10,
    padding: 12, marginBottom: 20, width: "100%"
  },
  continueButton: {
    backgroundColor: "#2C5FDD", padding: 15,
    borderRadius: 10, alignItems: "center", marginBottom: 20,
  },
  continueButtonText: { color: "#fff", fontWeight: "bold" },
  googleButton: {
    borderWidth: 1, borderColor: "#ccc", padding: 15,
    borderRadius: 10, alignItems: "center"
  },
  socialButtonText: { fontWeight: "bold" }
});
