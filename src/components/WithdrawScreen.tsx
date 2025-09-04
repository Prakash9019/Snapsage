import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Alert, Modal } from "react-native";
import axiosClient from '../api/axiosClient';
import WithdrawalMethodModal from './WithdrawalMethodModal';
import WithdrawalSuccessScreen from "./WithdrawalSuccessScreen";

const { width, height } = Dimensions.get('window');

interface WithdrawScreenProps {
    onBack: () => void;
    onWithdraw: (amount: number) => void;
    currentBalance: number;
}

export default function WithdrawScreen({ onBack, onWithdraw, currentBalance }: WithdrawScreenProps) {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [accountDetails, setAccountDetails] = useState({ accountNumber: '', ifscCode: '', accountName: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const handleWithdraw = async () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            Alert.alert('Error', 'Please enter a valid withdrawal amount.');
            return;
        }

        if (parseFloat(withdrawAmount) > currentBalance) {
            Alert.alert('Error', 'Withdrawal amount exceeds your earnings.');
            return;
        }

        if (!selectedMethod) {
            Alert.alert('Error', 'Please select a withdrawal method.');
            return;
        }

        // Prepare the payload based on the selected method
        const payload: any = { amount: parseFloat(withdrawAmount) };
        if (selectedMethod === 'UPI') {
            payload.method = 'UPI';
            payload.upiId = upiId;
        } else {
            payload.method = 'Account transfer';
            payload.accountDetails = accountDetails;
        }

        try {
            // if (isSubmitted) {
            //     return <SubmissionCompleteScreen onHome={() => {}} onCheckProgress={() => {}} />;
            //   }
            setShowSuccess(true); 
            // API call to submit withdrawal request
            const res = await axiosClient.post('/wallet/withdraw', payload);
            Alert.alert('Success', res.data.msg);
            onWithdraw(parseFloat(withdrawAmount)); // Update parent state with the new balance
            // onBack();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.msg || 'Failed to submit withdrawal request.');
        }
    };
    if (showSuccess) {
        return <WithdrawalSuccessScreen onHome={onBack} />;
    }
    
    const handleMethodSelect = (method: string, upi?: string, account?: any) => {
        setSelectedMethod(method);
        if (upi) setUpiId(upi);
        if (account) setAccountDetails(account);
        setIsModalVisible(false);
    };

    // A helper function to display the selected method details
    const getMethodDisplay = () => {
      if (selectedMethod === 'UPI' && upiId) {
        return `UPI: ${upiId}`;
      } else if (selectedMethod === 'Account transfer' && accountDetails.accountNumber) {
        return `Account: ...${accountDetails.accountNumber.slice(-4)}`;
      }
      return "Select withdraw method";
    };

    return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row}>
						<TouchableOpacity onPress={onBack}>
							<Image
								source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/sxuqxw54_expires_30_days.png" }}
								resizeMode={"stretch"}
								style={styles.image}
							/>
						</TouchableOpacity>
						<Text style={styles.text}>{"Withdraw"}</Text>
					</View>
					<View style={styles.column2}>
						<View style={styles.row2}>
							<TouchableOpacity style={styles.button}>
								<Image
									source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/d78krt1r_expires_30_days.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
							</TouchableOpacity>
							<View>
								<Text style={styles.text2}>{"Earnings"}</Text>
								<Text style={styles.text3}>{`₹${currentBalance.toFixed(2)}`}</Text>
							</View>
						</View>
						<View style={styles.view}>
							<Text style={styles.text4}>{"Withdraw amount"}</Text>
						</View>
						<TextInput
							placeholder="Enter amount to withdraw"
							placeholderTextColor="#D3D3D3"
							value={withdrawAmount}
							onChangeText={setWithdrawAmount}
							keyboardType="numeric"
							style={styles.input}
						/>
					</View>
					<View style={styles.row3}>
						<TouchableOpacity style={styles.row4} onPress={() => setIsModalVisible(true)}>
							<Text style={styles.text5}>
								{getMethodDisplay()}
							</Text>
							<Image
								source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/8o3097f3_expires_30_days.png" }}
								resizeMode={"stretch"}
								style={styles.image3}
							/>
						</TouchableOpacity>
						<TouchableOpacity
    style={[
        styles.button2,
        {
            backgroundColor:
                parseFloat(withdrawAmount) > 0 &&
                parseFloat(withdrawAmount) <= currentBalance
                    ? "#2C5FDD"
                    : "#544A7126",
        },
    ]}
    disabled={
        !withdrawAmount ||
        parseFloat(withdrawAmount) <= 0 ||
        parseFloat(withdrawAmount) > currentBalance
    }
    onPress={handleWithdraw}
>
    <Text style={styles.text6}>Withdraw</Text>
</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <WithdrawalMethodModal
                    onClose={() => setIsModalVisible(false)}
                    onSelect={handleMethodSelect}
                />
            </Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    button: {
        backgroundColor: "#B9CFFF4D",
        borderRadius: 6,
        paddingVertical: height * 0.012,
        paddingHorizontal: width * 0.025,
        marginRight: width * 0.03,
    },
    button2: {
        // backgroundColor: "#2C5FDD",
        borderRadius: 5,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
    },
    column: {
        backgroundColor: "#FFFFFF",
    },
    column2: {
        backgroundColor: "#FFFFFF",
        borderColor: "#0000001A",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.5,
        marginHorizontal: width * 0.08,
        shadowColor: "#00000008",
        shadowOpacity: 0.0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20,
        elevation: 20,
    },
    image: {
        width: width * 0.06,
        height: height * 0.03,
        marginRight: width * 0.04,
    },
    image2: {
        width: width * 0.08,
        height: height * 0.04,
    },
    image3: {
        width: width * 0.06,
        height: height * 0.03,
    },
    input: {
        color: "#000000",
        fontSize: width * 0.05,
        fontWeight: "bold",
        borderColor: "#0000002E",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.015,
        paddingLeft: width * 0.09,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: height * 0.04,
        paddingLeft: width * 0.08,
        paddingRight: width * 0.002,
        marginTop: height * 0.02,
    },
    row2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: height * 0.03,
    },
    row3: {
        marginTop:height * 0.06,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: height * 0.04,
        paddingLeft: width * 0.07,
        paddingRight: width * 0.04,
        shadowColor: "#00000008",
        shadowOpacity: 0.0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20,
        elevation: 20,
    },  
    row4: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginRight: width * 0.03,
        // borderWidth: 1,
        borderColor: '#0000002E',
        borderRadius: 10,
        paddingHorizontal: width * 0.04,
        // paddingVertical: height * 0.015,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        color: "#000000",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    text2: {
        color: "#989898",
        fontSize: width * 0.025,
        fontWeight: "bold",
    },
    text3: {
        color: "#000000",
        fontSize: width * 0.06,
        fontWeight: "bold",
    },
    text4: {
        color: "#000000",
        fontSize: width * 0.04,
        fontWeight: "bold",
        
    },
    text5: {
        color: "#000000",
        fontSize: width * 0.035,
        fontWeight: "bold",
        marginRight: width * 0.02,
    },
    text6: {
        color: "#FFFFFF",
        fontSize: width * 0.04,
        fontWeight: "bold",
    },
    view: {
        paddingBottom: height * 0.02,
        // justifyContent:"center",
        // alignContent:"center",
        alignItems:"center"
    },
});