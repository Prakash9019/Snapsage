import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image,  TouchableOpacity,  StyleSheet, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width, height } = Dimensions.get('window');
import { Text,TextInput } from "../../global" 
interface VideoSubmissionScreen4Props {
    onContinue: (data: {
        likes: string;
        issues: string;
        priceJustification: string;
    }) => void;
}

export default function VideoSubmissionScreen4({ onContinue }: VideoSubmissionScreen4Props) {
	const [likes, setLikes] = useState('');
	const [issues, setIssues] = useState('');
	const [priceJustification, setPriceJustification] = useState('');

    const handleContinue = () => {
        // Simple validation
        if (!likes || !issues || !priceJustification) {
            Alert.alert('Error', 'Please fill all the fields to continue.');
            return;
        }

        const formData = {
            likes,
            issues,
            priceJustification,
        };

        onContinue(formData);
    };

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView style={styles.scrollView}>
			{/* <ScrollView style={styles.scrollView}> */}
				<View style={styles.column}>
					<View style={styles.column2}>
					
						
						<Text style={styles.text2}>
							{"Feature-Based \nFeedback"}
						</Text>
					</View>
					<View style={styles.column3}>
						<Text style={styles.text3}>
							{"What do you like the most of this product?"}
						</Text>
						<View style={styles.view2}>
							<TextInput
                                placeholder={"Write here..."}
                                value={likes}
                                onChangeText={setLikes}
                                multiline={true}
                                style={styles.input}
                            />
						</View>
					</View>
					<View style={styles.column3}>
						<Text style={styles.text3}>
							{"What are the biggest issues or limitations\n you’ve faced?"}
						</Text>
						<View style={styles.view2}>
							<TextInput
                                placeholder={"Write here..."}
                                value={issues}
                                onChangeText={setIssues}
                                multiline={true}
                                style={styles.input}
                            />
						</View>
					</View>
					<Text style={styles.text5}>
						{"Do you think the product justifies its price?"}
					</Text>
					<View style={styles.column4}>
						<View style={styles.view2}>
							<TextInput
                                placeholder={"Write here..."}
                                value={priceJustification}
                                onChangeText={setPriceJustification}
                                multiline={true}
                                style={styles.input}
                            />
						</View>
						
					</View>
				</View>
			{/* </ScrollView> */}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	absoluteView: {
		position: "absolute",
		bottom: -height * 0.06,
		right: -width * 0.08,
		left: -width * 0.08,
		backgroundColor: "#FFFFFF",
	},
	box: {
		width: width * 0.65,
		height: height * 0.01,
		backgroundColor: "#2C5FDD",
		borderRadius: 100,
	},
	column: {
		backgroundColor: "#FFFFFF",
		// paddingBottom: height * 0.06,
	},
	column2: {
		backgroundColor: "#FFFFFF",
		paddingTop: height * 0.04,
		paddingBottom: height * 0.02,
		marginBottom: height * 0.01,
	},
	column3: {
		marginBottom: height * 0.03,
		marginHorizontal: width * 0.08,
	},
	column4: {
		marginHorizontal: width * 0.08,
	},
	image: {
		width: width * 0.07,
		height: height * 0.035,
		marginRight: width * 0.035,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: width * 0.007,
		marginBottom: height * 0.05,
		marginLeft: width * 0.08,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: width * 0.045,
		fontFamily: 'Poppins_500Medium',
	},
	text2: {
		color: "#000000",
		fontSize: width * 0.08,
		fontFamily: 'Poppins_700Bold',
		marginLeft: width * 0.09,
		width: width * 0.7,
	},
	text3: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		marginBottom: height * 0.02,
	},
	text4: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		marginLeft: width * 0.05,
	},
	text5: {
		color: "#000000",
		fontSize: width * 0.04,
		fontFamily: 'Poppins_500Medium',
		marginBottom: height * 0.02,
		marginHorizontal: width * 0.08,
	},
	text6: {
		color: "#FFFFFF",
		fontSize: width * 0.045,
		fontFamily: 'Poppins_500Medium',
	},
	view: {
		backgroundColor: "#DAE5FF",
		borderRadius: 100,
		marginBottom: height * 0.04,
		marginHorizontal: width * 0.09,
	},
	view2: {
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
		paddingTop: height * 0.017,
		paddingBottom: height * 0.1,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	input: {
        height: height * 0.1,
        textAlignVertical: 'top',
        paddingLeft: width * 0.05,
        fontSize: width * 0.035,
        color: '#000',
    },
	view3: {
		alignItems: "center",
		backgroundColor: "#2C5FDD",
		borderRadius: 10,
		paddingVertical: height * 0.018,
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