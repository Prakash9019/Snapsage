import React, { useState } from "react";
import { View,  StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text,TextInput } from "../../global"
const { width, height } = Dimensions.get("window");

interface VideoSubmissionScreen2Props {
  onContinue: (data: {
    mostUsedFor: string;
    whenUsedMost: string;
    useFrequency: string;
  }) => void;
  onBack: () => void;
}

export default function VideoSubmissionScreen2({ onContinue, onBack }: VideoSubmissionScreen2Props) {
  const [mostUsedFor, setMostUsedFor] = useState(""); // sample default
  const [whenUsedMost, setWhenUsedMost] = useState(""); // sample default
  const [useFrequency, setUseFrequency] = useState(""); // sample default

  const handleContinue = () => {
    const formData = {
      mostUsedFor,
      whenUsedMost,
      useFrequency,
    };
    onContinue(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {/* Screen Title */}
      <Text style={styles.title}>Tell us about {"\n"}the product usage</Text>

      {/* Most Used For */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>What do you use the product most for?</Text>
        <TextInput
          placeholder="E.g., Gaming, Work, Commuting"
          value={mostUsedFor}
          onChangeText={setMostUsedFor}
          style={styles.input}
        />
      </View>

      {/* When Used Most */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>When do you use the product most?</Text>
        <TextInput
          placeholder="E.g., Morning commute, Evenings"
          value={whenUsedMost}
          onChangeText={setWhenUsedMost}
          style={styles.input}
        />
      </View>

      {/* Use Frequency */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>How frequently do you use the product?</Text>
        <TextInput
          placeholder="E.g., Daily, A few times a week"
          value={useFrequency}
          onChangeText={setUseFrequency}
          style={styles.input}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.1, // avoid footer overlap
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
  input: {
    color: "#000",
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    backgroundColor: "#FFF",
    borderColor: "#00000026",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.017,
    paddingLeft: width * 0.05,
    shadowColor: "#00000008",
    shadowOpacity: 0.0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 2,
  },
});
