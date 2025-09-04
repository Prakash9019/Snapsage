import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert } from "react-native";
import axiosClient from '../api/axiosClient';
import AntDesign from '@expo/vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

interface WithdrawalMethodModalProps {
    onClose: () => void;
    onSelect: (method: string, upiId?: string, accountDetails?: { accountNumber: string, ifscCode: string, accountName: string }) => void;
}

export default function WithdrawalMethodModal({ onClose, onSelect }: WithdrawalMethodModalProps) {
    const [selected, setSelected] = useState('');
    const [upiId, setUpiId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [accountName, setAccountName] = useState('');

    const [savedUpiId, setSavedUpiId] = useState('');
    const [savedAccountDetails, setSavedAccountDetails] = useState({ accountNumber: '', ifscCode: '', accountName: '' });

    useEffect(() => {
        const fetchSavedDetails = async () => {
            try {
                const upiResponse = await axiosClient.get('/user/upi-id');
                if (upiResponse.data?.upiId) {
                    setSavedUpiId(upiResponse.data.upiId);
                    setUpiId(upiResponse.data.upiId);
                }

                const accountResponse = await axiosClient.get('/user/account-details');
                if (accountResponse.data?.accountDetails) {
                    setSavedAccountDetails(accountResponse.data.accountDetails);
                    setAccountNumber(accountResponse.data.accountDetails.accountNumber);
                    setIfscCode(accountResponse.data.accountDetails.ifscCode);
                    setAccountName(accountResponse.data.accountDetails.accountName);
                }

            } catch (error) {
                console.error("Failed to fetch saved details:", error);
            }
        };
        fetchSavedDetails();
    }, []);

    const handleSaveUpi = async () => {
        if (!upiId) {
            Alert.alert('Error', 'Please enter a valid UPI ID.');
            return;
        }
        try {
            await axiosClient.post('/user/save-upi', { upiId });
            setSavedUpiId(upiId);
            // Alert.alert('Success', 'UPI ID saved!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save UPI ID. Please try again.');
        }
    };

    const handleSaveAccount = async () => {
        if (!accountNumber || !ifscCode || !accountName) {
            Alert.alert('Error', 'Please fill all account details.');
            return;
        }
        try {
            const accountDetails = { accountNumber, ifscCode, accountName };
            await axiosClient.post('/user/save-account', { accountDetails });
            setSavedAccountDetails(accountDetails);
            Alert.alert('Success', 'Account details saved!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save account details. Please try again.');
        }
    };

    const handleContinue = () => {
        if (!selected) {
            Alert.alert('Error', 'Please select a withdrawal method.');
            return;
        }

        if (selected === 'UPI' && !upiId) {
            Alert.alert('Error', 'Please enter or save your UPI ID.');
            return;
        }
        
        if (selected === 'Account transfer' && (!accountNumber || !ifscCode || !accountName)) {
            Alert.alert('Error', 'Please fill all account details.');
            return;
        }

        if (selected === 'UPI') {
            onSelect(selected, upiId);
        } else {
            const accountDetails = { accountNumber, ifscCode, accountName };
            onSelect(selected, undefined, accountDetails);
        }
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Select withdraw method</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}><AntDesign name="caretdown" size={14} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setSelected('UPI')}>
                        <Text style={styles.optionText}>UPI</Text>
                        <View style={selected === 'UPI' ? styles.radioButtonSelected : styles.radioButton} />
                    </TouchableOpacity>

                    {selected === 'UPI' && (
                        <View style={styles.upiInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter UPI ID"
                                value={upiId}
                                onChangeText={setUpiId}
                                placeholderTextColor="#71727A"
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveUpi}>
                            <Text style={styles.saveButtonText}>
        {savedUpiId ? "Saved" : "Save"}
    </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity style={styles.optionRow} onPress={() => setSelected('Account transfer')}>
                        <Text style={styles.optionText}>Account transfer</Text>
                        <View style={selected === 'Account transfer' ? styles.radioButtonSelected : styles.radioButton} />
                    </TouchableOpacity>

                    {selected === 'Account transfer' && (
                        <View style={styles.accountInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                                keyboardType="numeric"
                                placeholderTextColor="#71727A"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter IFSC code"
                                value={ifscCode}
                                onChangeText={setIfscCode}
                                placeholderTextColor="#71727A"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter account name"
                                value={accountName}
                                onChangeText={setAccountName}
                                placeholderTextColor="#71727A"
                            />
                             <TouchableOpacity style={styles.saveButton} onPress={handleSaveAccount}>
                                <Text style={styles.saveButtonText}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    headerText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#000',
    },
    closeButton: {
        padding: width * 0.02,
    },
    closeButtonText: {
        fontSize: width * 0.05,
        color: '#000',
    },
    optionsContainer: {
        marginBottom: height * 0.03,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.02,
    },
    optionText: {
        fontSize: width * 0.045,
        color: '#000',
    },
    radioButton: {
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: width * 0.025,
        borderWidth: 2,
        borderColor: '#E6E6E6',
    },
    radioButtonSelected: {
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: width * 0.025,
        borderWidth: 2,
        padding:width * 0.002,
        // borderColor: '#2C5FDD',
        backgroundColor: '#000000',
    },
    upiInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.02,
    },
    accountInputContainer: {
        marginTop: height * 0.01,
        marginBottom: height * 0.02,
    },
    input: {
        paddingVertical: height * 0.018,   // better height
        minHeight: height * 0.06,          // ensures placeholder is visible
        flex: 1,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 8,
        padding: width * 0.05,
        fontSize: width * 0.04,
        marginBottom: height * 0.01,
    },

    saveButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        marginLeft: width * 0.03,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#2C5FDD',
        fontSize: width * 0.03,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#2C5FDD',
        borderRadius: 10,
        paddingVertical: height * 0.02,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});