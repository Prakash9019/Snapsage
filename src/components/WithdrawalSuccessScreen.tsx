import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');

interface WithdrawalSuccessScreenProps {
    onHome: () => void;
}

export default function WithdrawalSuccessScreen({ onHome }: WithdrawalSuccessScreenProps) {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.row}>
					<TouchableOpacity onPress={onHome}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/qzxq2jw7_expires_30_days.png"}}
							resizeMode = {"stretch"}
							style={styles.image}
						/>
					</TouchableOpacity>
					<Text style={styles.text}>
						{"Home"}
					</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.column}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/tjmcdoo8_expires_30_days.png"}}
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Text style={styles.text2}>
							{"Withdraw Requested"}
						</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.view2} onPress={onHome}>
					<Text style={styles.text3}>
						{"Go Home"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	column: {
		alignItems: "center",
	},
	image: {
		width: width * 0.06,
		height: height * 0.03,
		marginRight: width * 0.04,
	},
	image2: {
		width: width * 0.25,
		height: height * 0.12,
		marginBottom: height * 0.035,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: width * 0.005,
		marginTop: height * 0.05,
		marginBottom: height * 0.3,
		marginLeft: width * 0.08,
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
		color: "#000000",
		fontSize: width * 0.06,
		fontWeight: "bold",
	},
	text3: {
		color: "#FFFFFF",
		fontSize: width * 0.045,
		fontWeight: "bold",
	},
	view: {
		alignItems: "center",
		marginBottom: height * 0.35,
	},
	view2: {
		alignItems: "center",
		backgroundColor: "#2C5FDD",
		borderRadius: 10,
		paddingVertical: height * 0.018,
		marginBottom: height * 0.03,
		marginHorizontal: width * 0.08,
		shadowColor: "#00000033",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
});