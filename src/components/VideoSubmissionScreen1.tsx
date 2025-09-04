import React, { useState } from "react";
import {
  View,
  ScrollView,
  // Text,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Text,TextInput,Picker } from "../../global" // <-- use global wrapper

const { width, height } = Dimensions.get("window");

interface VideoSubmissionScreen1Props {
  onContinue: (data: {
    product: string;
    usageDuration: string;
    purchaseLocation: string;
    purchaseYear: string;
  }) => void;
}

export default function VideoSubmissionScreen1({ onContinue }: VideoSubmissionScreen1Props) {
  const [product, setProduct] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("");
  const [purchaseYear, setPurchaseYear] = useState("");

  const handleContinue = () => {
    if (!product || !usageDuration || !purchaseLocation || !purchaseYear) {
      Alert.alert("Error", "Please select all the fields to continue.");
      return;
    }

    onContinue({
      product,
      usageDuration,
      purchaseLocation,
      purchaseYear,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {/* Screen Title */}
      <Text style={styles.title}>Tell us about {"\n"} the product</Text>

      {/* Product */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>What product are you reviewing?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={product}
            onValueChange={(itemValue) => setProduct(itemValue)}
            style={[
              styles.picker,
              product === "" ? styles.placeholderText : styles.selectedText,
            ]}
          
          >
            <Picker.Item label="Select Product" value="" />
            <Picker.Item label="TWS" value="tws" />
            <Picker.Item label="Headset" value="headset" />
            <Picker.Item label="Earphones" value="earphones" />
            <Picker.Item label="Speakers" value="speakers" />
          </Picker>
        </View>
      </View>

      {/* Usage Duration */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>How long have you been using?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={usageDuration}
            onValueChange={(itemValue) => setUsageDuration(itemValue)}
            style={[
              styles.picker,
              usageDuration === "" ? styles.placeholderText : styles.selectedText,
            ]}
          >
            <Picker.Item label="Select Duration" value="" />
            <Picker.Item label="3 Months" value="3 months" />
            <Picker.Item label="4 Months" value="4 months" />
            <Picker.Item label="6 Months" value="6 months" />
            <Picker.Item label="1 Year" value="1 year" />
          </Picker>
        </View>
      </View>

      {/* Purchase Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Where did you purchase?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={purchaseLocation}
            onValueChange={(itemValue) => setPurchaseLocation(itemValue)}
            style={[
              styles.picker,
              purchaseLocation === "" ? styles.placeholderText : styles.selectedText,
            ]}
          >
            <Picker.Item label="Select Location" value="" />
            <Picker.Item label="Amazon" value="Amazon" />
            <Picker.Item label="Flipkart" value="Flipkart" />
            <Picker.Item label="Croma" value="Croma" />
            <Picker.Item label="Reliance Digital" value="Reliance Digital" />
            <Picker.Item label="Other Store" value="Other" />
          </Picker>
        </View>
      </View>

      {/* Purchase Year */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>When did you purchase? (Approx)</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={purchaseYear}
            onValueChange={(itemValue) => setPurchaseYear(itemValue)}
            style={[
              styles.picker,
              purchaseYear === "" ? styles.placeholderText : styles.selectedText,
            ]}
          >
            <Picker.Item label="Select Month & Year" value="" />
            <Picker.Item label="Jan 2024" value="Jan 2024" />
            <Picker.Item label="Jun 2024" value="Jun 2024" />
            <Picker.Item label="Dec 2024" value="Dec 2024" />
            <Picker.Item label="Feb 2025" value="Feb 2025" />
            <Picker.Item label="Mar 2025" value="Mar 2025" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: width * 0.08,
    // paddingBottom: height * 0.1,
  },
  title: {
    color: "#000",
    fontSize: width * 0.08,
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.04,
  },
  inputGroup: {
    marginBottom: height * 0.03,
  },
  label: {
    color: "#000",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_500Medium',
    marginBottom: height * 0.015,
  },
  pickerContainer: {
    borderColor: "#00000026",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: width * 0.0002,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  picker: { 
    height: 49, 
    width: "100%", 
    margin: 0,
    paddingVertical: 0,
    fontSize: width * 0.005,   // keep font same for all items
    lineHeight: 45,            // 👈 ensures text centers vertically
  },
  placeholderText: {
     fontSize: width * 0.005,
    color: "gray", // 👈 placeholder color
  },
  selectedText: {
     fontSize: width * 0.005,
    color: "black", // 👈 selected text color
  },
  pickerItem: {
    color: "blue", // normal text color
    fontSize: width * 0.005, // normal font size
  },
  placeholderItem: {
    fontSize: width * 0.005, // smaller font for placeholder
    color: "#0000002E", // placeholder color
  },
  
});
