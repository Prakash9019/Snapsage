import React, { useState, useRef } from "react";
import { SafeAreaView, View, ScrollView, Image,   ActivityIndicator, TouchableOpacity, TextInput, StyleSheet, Alert, Dimensions, Keyboard } from "react-native";
import axiosClient from '../api/axiosClient';
import { Text } from "../../global"
const { width, height } = Dimensions.get('window');

interface OtpVerificationScreenProps {
    onVerified: (otpCode: string) => void;
    onGoBack: () => void;
    mobileNumber: string;
}

export default function OtpVerificationScreen({ onVerified, onGoBack, mobileNumber }: OtpVerificationScreenProps) {
    const [otp, setOtp] = useState<string>('');
    const otpInputRef = useRef<TextInput>(null);
    const [loading, setLoading] = useState(false);
    const handleVerifyOtp = async () => {

        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter the 6-digit OTP.');
            return;
        }
        onVerified(otp);
    };

    const handleResendOtp = () => {
        Alert.alert('Resend OTP', 'OTP has been resent to your number.');
        // You would typically call an API endpoint here to resend the OTP
    };

    const renderOtpBoxes = () => {
        const otpDigits = otp.padEnd(6, ' ').split('');
        return otpDigits.map((digit, index) => (
            <View key={index} style={digit !== ' ' ? styles.otpBoxFilled : styles.otpBox}>
                <Text style={styles.otpDigit}>{digit !== ' ' ? digit : ''}</Text>
            </View>
        ));
    };

    const handleBoxPress = () => {
        if (otpInputRef.current) {
            otpInputRef.current.focus();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0k9b9575_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>OTP Verification</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                <Text style={styles.promptText}>
                    We have sent a verification code to{"\n"}
                    <Text style={{ color: "#2D5FDE" }}>{mobileNumber}</Text>
                    </Text>

                    <TouchableOpacity onPress={handleBoxPress}>
                        <View style={styles.otpInputContainer}>
                            {renderOtpBoxes()}
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        ref={otpInputRef}
                        style={styles.hiddenInput}
                        maxLength={6}
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={setOtp}
                        onBlur={() => Keyboard.dismiss()}
                        caretHidden={true}
                    />
                    <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
                        <Text style={styles.resendText}>Didn’t get the OTP? <Text style={styles.resendLink}>Resend SMS</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={onGoBack} style={styles.backToLogin}>
                    <Text style={styles.backToLoginText}>Go back to login methods</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.nextButton} onPress={handleVerifyOtp} disabled={loading}>
                {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.nextButtonText}>{"Next"}</Text>
            )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
    //   marginTop:height*0.05,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF1F3',
    },
    backButton: {
        paddingRight: width * 0.04,
    },
    backIcon: {
        width: width * 0.06,
        height: height * 0.03,
    },
    headerText: {
        color: "#000000",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: width * 0.08,
        paddingTop: height * 0.05,
    },
    promptText: {
        color: "#000000",
        fontSize: width * 0.04,
        textAlign: "center",
        // width: width * 0.6,
        marginBottom: height * 0.04,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: height * 0.04,
    },
    otpBox: {
        width: width * 0.12,
        height: width * 0.12,
        borderColor: "#00000026",
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpBoxFilled: {
        width: width * 0.12,
        height: width * 0.12,
        borderColor: "#2C5FDD",
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpDigit: {
        fontSize: width * 0.06,
        fontFamily: 'Poppins_500Medium',
        color: '#000',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        top: 0,
        left: 0,
        opacity: 0,
    },
    resendButton: {
        marginBottom: height * 0.05,
    },
    resendText: {
        fontSize: width * 0.03,
        color: '#000',
    },
    resendLink: {
        color: '#2C5FDD',
        textDecorationLine: 'underline',
    },
    bottomBar: {
    //   marginBottom:height*0.05,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: height * 0.03,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    backToLogin: {
        marginBottom: height * 0.02,
    },
    backToLoginText: {
        color: '#2C5FDD',
        fontSize: width * 0.035,
        fontFamily: 'Poppins_500Medium',
    },
    nextButton: {
        backgroundColor: '#2C5FDD',
        borderRadius: 10,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        width: '80%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontFamily: 'Poppins_500Medium',
    },
});