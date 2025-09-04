// import React, { useState } from "react";
// import { SafeAreaView, View, ScrollView, Image, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// import {LinearGradient} from 'expo-linear-gradient';

// interface SplashScreenProps {
//   onContinue: () => void;
// }

// export default function SplashScreen({ onContinue }: SplashScreenProps) {
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<ScrollView style={styles.scrollView}>
// 				<View style={styles.column}>
// 					<LinearGradient
// 						start={{x:0, y:0}}
// 						end={{x:0, y:1}}
// 						colors={["#FFFFFFAB", "#8FB2FFAB"]}
// 						style={styles.view}>
// 						<Image
// 							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/48jma41q_expires_30_days.png"}}
// 							resizeMode = {"stretch"}
// 							style={styles.image}
// 						/>
// 					</LinearGradient>
// 					<Image
// 						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/q93a4l30_expires_30_days.png"}}
// 						resizeMode = {"stretch"}
// 						style={styles.absoluteImage}
// 					/>
// 				</View>
// 				<View style={styles.column2}>
// 					<Text style={styles.text}>
// 						{"Experience the future \n of reviewing."}
// 					</Text>
// 					<Text style={styles.text2}>
// 						{"Get paid on every video review approval, fast, secure, and tailored for the next generation's convenience and trust."}
// 					</Text>
// 				</View>
// 				<TouchableOpacity onPress={onContinue} style={styles.continueButton}>
// 					<Text style={styles.buttonText}>Get Started</Text>
// 				</TouchableOpacity>
// 			</ScrollView>
// 		</SafeAreaView>
// 	)
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	absoluteImage: {
// 		position: "absolute",
// 		bottom: 17,
// 		right: -2,
// 		left: -2,
// 		height: 469,
// 	},
// 	column: {
// 		marginTop: 28,
// 		marginHorizontal: 23,
// 	},
// 	column2: {
// 		paddingVertical: 16,
// 		marginBottom: 37,
// 		marginHorizontal: 32,
// 	},
// 	image: {
// 		height: 31,
// 		marginHorizontal: 30,
// 	},
// 	continueButton: {
// 		backgroundColor: "#2C5FDD",
// 		borderRadius: 10,
// 		paddingVertical: 15,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginHorizontal: 32,
// 		marginBottom: 54,
// 	},
// 	buttonText: {
// 		color: "#FFFFFF",
// 		fontSize: 18,
// 		fontWeight: "bold",
// 	},
// 	scrollView: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	text: {
// 		color: "#000000",
// 		fontSize: 28,
// 		fontWeight: "bold",
// 		marginBottom: 10,
// 		marginHorizontal: 8,
// 	},
// 	text2: {
// 		color: "#71727A",
// 		fontSize: 12,
// 		marginHorizontal: 8,
// 	},
// 	view: {
// 		borderRadius: 30,
// 		paddingTop: 507,
// 		paddingBottom: 6,
// 	},
// });


import React from "react";
import { SafeAreaView, View, ScrollView, Image,  StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Text,TextInput } from "../../global"
const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onContinue: () => void;
}

export default function SplashScreen1({ onContinue }: SplashScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#8FB2FFAB", "#FFFFFFAB"]}
            style={styles.view}>
            {/* <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/48jma41q_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image}
            /> */}
          </LinearGradient>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/q93a4l30_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.absoluteImage}
          />
        </View>
        <View style={styles.column2}>
          <Text style={styles.text}>
            {"Experience the future \n of reviewing."}
          </Text>
          <Text style={styles.text2}>
            {"Get paid on every video review approval, fast, secure, and tailored for the next generation's convenience and trust."}
          </Text>
        </View>
        <TouchableOpacity onPress={onContinue} style={styles.continueButton}>
          <Text style={styles.buttonText}>Get Started</Text>
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
  absoluteImage: {
    position: "absolute",
    bottom: height * 0.02,
    right: -width * 0.01,
    left: -width * 0.01,
    height: height * 0.55,
  },
  column: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.06,
  },
  column2: {
    paddingVertical: height * 0.02,
    marginBottom: height * 0.045,
    marginHorizontal: width * 0.08,
  },
  image: {
    height: height * 0.035,
    marginHorizontal: width * 0.08,
  },
  continueButton: {
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width * 0.08,
    marginBottom: height * 0.02,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: width * 0.07,
    fontFamily: "Poppins_700Bold", // ✅ instead of fontWeight: 800
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.02,
  },
  text2: {
    fontFamily: "Poppins_400Regular",   // ✅ instead of fontWeight: 400
    color: "#71727A",
    fontSize: width * 0.03,
    marginHorizontal: width * 0.02,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontFamily: "Poppins_700Bold",      // ✅ instead of fontWeight: 800
  },
  view: {
    borderRadius: 30,
    paddingTop: height * 0.6,
    paddingBottom: height * 0.007,
  },
});
