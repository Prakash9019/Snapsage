import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, TextInput,Picker } from "../../global"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axiosClient from "../api/axiosClient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

interface ProfileSetupScreenProps {
  onProfileComplete: () => void;
}

export default function ProfileSetupScreen({ onProfileComplete }: ProfileSetupScreenProps) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [cityState, setCityState] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirmDate = (date: Date) => {
    const formatted = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setDateOfBirth(formatted);
    setDatePickerVisible(false);
  };

const handleProfileSubmit = async () => {
  if (loading) return; // prevent multiple clicks

  // ✅ Validation
  if (!name.trim()) {
    alert("Name is required");
    return;
  }
  if (!dateOfBirth) {
    alert("Date of Birth is required");
    return;
  }
  if (!gender) {
    alert("Gender is required");
    return;
  }
  if (!cityState.trim()) {
    alert("City and State are required");
    return;
  }
  if (!motherTongue.trim()) {
    alert("Mother Tongue is required");
    return;
  }
  if (!qualification.trim()) {
    alert("Qualification is required");
    return;
  }

  setLoading(true);

  try {
    const res = await axiosClient.post("/user/profile-setup", {
      name,
      dateOfBirth,
      gender,
      cityState,
      motherTongue,
      qualification,
    });
    alert(res.data.msg || "Profile saved successfully!");
    onProfileComplete();
  } catch (error: any) {
    alert(error.response?.data?.msg || "Failed to save profile. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView
		style={styles.scrollView}
		enableOnAndroid={true}
		extraScrollHeight={2}
		keyboardShouldPersistTaps="handled"
		>

        <View style={styles.column}>
          {/* Header */}
          <View style={styles.column2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/03vq38km_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.text}>{"Let’s get to \nknow about you"}</Text>
          </View>

          {/* Form Inputs */}
          {/* Name */}
          <View style={styles.column3}>
            <Text style={styles.text2}>{"What is your name?"}</Text>
            <TextInput
              placeholder="Enter your name..."
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          {/* Date of Birth + Gender */}
          <View style={styles.row}>
            {/* Date of Birth */}
            <View style={styles.column4}>
              <Text style={styles.text2}>{"Date of birth"}</Text>
              <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisible(true)}>
                <Text style={{ fontSize: 14, color: dateOfBirth ? "#000" : "#888" }}>
                  {dateOfBirth || "Select date"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
                maximumDate={new Date()}
              />
            </View>

            {/* Gender */}
            <View style={styles.column5}>
              <Text style={styles.text2}>{"Gender"}</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}
				 style={[
              styles.picker,
              gender === "" ? styles.placeholderText : styles.selectedText,
            ]}
				 >
                  <Picker.Item label="Select gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
          </View>

          {/* City/State */}
          <View style={styles.column3}>
            <Text style={styles.text2}>{"What city and state do you live in?"}</Text>
            <TextInput
              placeholder="E.g., Bengaluru, Karnataka"
              value={cityState}
              onChangeText={setCityState}
              style={styles.input}
            />
          </View>

          {/* Mother Tongue */}
          <View style={styles.column3}>
            <Text style={styles.text2}>{"What is your mother tongue?"}</Text>
            <TextInput
              placeholder="Enter your mother tongue"
              value={motherTongue}
              onChangeText={setMotherTongue}
              style={styles.input}
            />
          </View>

          {/* Qualification */}
          <View style={styles.column7}>
            <Text style={styles.text2}>{"What is your qualification?"}</Text>
            <TextInput
              placeholder="Enter your highest qualification"
              value={qualification}
              onChangeText={setQualification}
              style={styles.input}
            />
          </View>

          {/* Continue Button with Loading */}
          
        </View>
      </KeyboardAwareScrollView>
	  <TouchableOpacity style={styles.view3} onPress={handleProfileSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.text6}>{"Continue"}</Text>
            )}
          </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
// 	  placeholderText: {
// 		// padding:2,
//      fontSize: width * 0.0005,
//     color: "gray", // 👈 placeholder color
//   },
//   selectedText: {
//      fontSize: width * 0.005,
//     color: "black", // 👈 selected text color
//   },
pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    // marginTop: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
	  
	  placeholderText: {
		fontSize:8,
		color: "gray",             // only color changes
	  },
	  
	  selectedText: {
		fontSize:8,
		color: "black",
	  },
		  container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	box: {
		height: height * 0.06,
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	box2: {
		height: height * 0.06,
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
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
	box3: {
		height: height * 0.001,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: height * 0.016,
		paddingHorizontal: width * 0.05,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	column: {
		backgroundColor: "#FFFFFF",
	},
	column2: {
		backgroundColor: "#FFFFFF",
		paddingTop: height * 0.04,
		paddingBottom: height * 0.01,
		marginBottom: height * 0.02,
	},
	column3: {
		marginBottom: height * 0.03,
		marginHorizontal: width * 0.08,
	},
	column7: {
		marginBottom: height * 0.08,
		marginHorizontal: width * 0.08,
	},
	column4: {
		flex: 1,
		marginRight: width * 0.03,
	},
	column5: {
		flex: 1,
		fontSize: width * 0.035,
	},
	column6: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingTop: height * 0.018,
		paddingHorizontal: width * 0.08,
	},
	image: {
		width: width * 0.12,
		height: height * 0.06,
		marginBottom: height * 0.03,
		marginLeft: width * 0.08,
	},
	image2: {
		width: width * 0.05,
		height: height * 0.02,
	},
	input: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: height * 0.017,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.1,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	input2: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		flex: 1,
		paddingVertical: height * 0.004,
	},
	row: {
		flexDirection: "row",
		marginBottom: height * 0.03,
		marginHorizontal: width * 0.08,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#00000026",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: height * 0.016,
		paddingLeft: width * 0.08,
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
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: width * 0.08,
		fontFamily: 'Poppins_700Bold',
		marginLeft: width * 0.08,
		width: width * 0.7,
	},
	text2: {
		color: "#000000",
		fontSize: width * 0.04,
		fontFamily: 'Poppins_500Medium',
		marginBottom: height * 0.01,
	},
	text3: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		marginRight: width * 0.03,
	},
	text4: {
		color: "#000000",
		fontSize: width * 0.04,
		fontFamily: 'Poppins_500Medium',
		marginLeft: width * 0.08,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: width * 0.05,
		fontFamily: 'Poppins_500Medium',
	},
	text6: {
		color: "#FFFFFF",
		fontSize: width * 0.045,
		fontFamily: 'Poppins_500Medium',
	},
	view: {
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#2C5FDD",
		borderRadius: 10,
		paddingTop: height * 0.018,
		paddingBottom: height * 0.03,
		marginHorizontal: width * 0.002,
		shadowColor: "#00000033",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	view3: {
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#2C5FDD",
		borderRadius: 10,
		paddingVertical: height * 0.018,
		marginHorizontal: width * 0.08,
		marginBottom: width * 0.06,
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
