import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image,  TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import axiosClient from '../api/axiosClient';
import { Text,TextInput } from "../../global" 
const { width, height } = Dimensions.get('window');

interface WalletScreenProps {
    onBack: () => void;
    onWithdraw: () => void;
}

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
}

export default function WalletScreen({ onBack, onWithdraw }: WalletScreenProps) {
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                // Assuming you have an API endpoint to fetch wallet data
                // const response = await axiosClient.get('/wallet');
                // setTotalEarnings(response.data.totalEarnings);
                // setTransactions(response.data.transactions);

                // Mock data for transactions
                const mockTransactions = [
                    { id: '1', description: 'Review for TWS Headset', amount: 50, date: '' },
                    // { id: '2', description: 'Referral Bonus', amount: 40, date: '2025-08-14' },
                ];
                setTransactions(mockTransactions);
            } catch (error: any) {
                Alert.alert('Error', error.response?.data?.msg || 'Failed to fetch wallet data.');
            }
        };
        fetchWalletData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={onBack}>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/3trtsqs9_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text}>{"Wallet"}</Text>
                    </View>
                    <View style={styles.row2}>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/tuygkcp6_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image2}
                            />
                        </TouchableOpacity>
                        <View style={styles.column2}>
                            <Text style={styles.text2}>{"Earnings"}</Text>
                            <Text style={styles.text3}>{"₹" + 0}</Text>
                        </View>
                        <TouchableOpacity 
                        style={[
                            styles.button2,
                            {
                                backgroundColor:
                                totalEarnings > 0 &&
                                totalEarnings <= 1
                                        ? "#2C5FDD"
                                        : "#544A7126",
                            },
                        ]}
                          disabled={
     
        totalEarnings <= 0 
    } >
                            <Text style={styles.text4}>{"Withdraw"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text5}>{"Recent transactions"}</Text>
                    </View>
                    <View style={styles.view2}>
                        {transactions.length > 0 ? (
                            transactions.map(trans => (
                                <View key={trans.id} >
                                    {/* <Text>{trans.description}</Text>
                                    <Text style={styles.transactionAmount}>₹{trans.amount}</Text> */}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.text5}>{"No transactions found."}</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
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
        flex: 1,
        alignItems: "center",
        backgroundColor: "#2C5FDD",
        borderRadius: 5,
        paddingVertical: height * 0.01,
    },
    column: {
        backgroundColor: "#FFFFFF",
        paddingBottom: height * 0.0,
        paddingTop: height * 0.02,
    },
    column2: {
        marginRight: width * 0.17,
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
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: height * 0.04,
        paddingLeft: width * 0.08,
        paddingRight: width * 0.005,
        marginBottom: height * 0.01,
    },
    row2: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderColor: "#0000001A",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.035,
        marginBottom: height * 0.04,
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
        color: "#FFFFFF",
        fontSize: width * 0.035,
        fontWeight: "bold",
    },
    text5: {
        color: "#000000",
        fontSize: width * 0.035,
        fontWeight: "bold",
    },
    view: {
        alignItems: "center",
        paddingBottom: height * 0.001,
        marginBottom: height * 0.01,
        marginLeft: width * 0.08,
        alignSelf: 'flex-start',
    },
    view2: {
        alignItems: "center",
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        paddingVertical: height * 0.01,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    transactionAmount: {
        fontWeight: 'bold',
        color: 'green',
    },
});