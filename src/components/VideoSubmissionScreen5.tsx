import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../global";

const { width, height } = Dimensions.get("window");

interface VideoSubmissionScreen5Props {
  onContinue: (data: { purchaseInfluence: string[] }) => void;
  onBack: () => void;
}

const VideoSubmissionScreen5 = forwardRef(({ onContinue, onBack }: VideoSubmissionScreen5Props, ref) => {
  const [purchaseInfluence, setPurchaseInfluence] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    handleContinue: () => {
      if (purchaseInfluence.length === 0) {
        Alert.alert("Error", "Please select at least one option to continue.");
        return;
      }
      onContinue({ purchaseInfluence });
    }
  }));

  const handleOptionToggle = (option: string) => {
    if (purchaseInfluence.includes(option)) {
      setPurchaseInfluence(purchaseInfluence.filter((item) => item !== option));
    } else {
      setPurchaseInfluence([...purchaseInfluence, option]);
    }
  };

  const options = [
    "Festival Sale",
    "College reopening",
    "Salary/Bonus",
    "Needed it for travel",
    "Discount/Coupon offer",
    "Influencer review",
    "Other",
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
            <Text style={styles.text2}>{"Purchase\nInsight"}</Text>
          </View>

          <View style={styles.column3}>
            <Text style={styles.text3}>
              {"What influenced your decision to buy this product at that time?"}
            </Text>

            <View style={styles.column4}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionToggle(option)}
                >
                  <View style={styles.row}>
                    <Ionicons
                      name={
                        purchaseInfluence.includes(option)
                          ? "checkbox-outline"
                          : "square-outline"
                      }
                      size={24}
                      color={
                        purchaseInfluence.includes(option) ? "#2C5FDD" : "#989898"
                      }
                      style={{ marginRight: width * 0.04 }}
                    />
                    <Text
                      style={[
                        styles.text4,
                        purchaseInfluence.includes(option) && { color: "#2C5FDD" },
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

export default VideoSubmissionScreen5;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  column: { backgroundColor: "#FFFFFF" },
  column2: {
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.04,
    paddingBottom: height * 0.02,
    marginBottom: height * 0.02,
  },
  column3: {
    marginBottom: height * 0.06,
    marginHorizontal: width * 0.08,
  },
  column4: {
    backgroundColor: "#FFFFFF",
    borderColor: "#00000008",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: height * 0.03,
    paddingLeft: width * 0.09,
    shadowColor: "#00000008",
    shadowOpacity: 0.0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  text2: {
    color: "#000000",
    fontSize: width * 0.08,
    fontFamily: "Poppins_700Bold",
    marginLeft: width * 0.09,
    width: width * 0.6,
  },
  text3: {
    color: "#000000",
    fontSize: width * 0.04,
    fontFamily: "Poppins_500Medium",
    marginBottom: height * 0.02,
  },
  text4: { color: "#000000", fontSize: width * 0.04 },
});
