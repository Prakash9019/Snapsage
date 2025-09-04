import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "../../global"
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

interface SubmissionCompleteScreenProps {
  onHome: () => void;
  onCheckProgress: () => Promise<void> | void; // supports async navigation
}

export default function SubmissionCompleteScreen({
  onHome,
  onCheckProgress,
}: SubmissionCompleteScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckProgress = async () => {
    setLoading(true);
    try {
      AsyncStorage.setItem("hii","hello");
      await onCheckProgress(); // wait for navigation or API
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onHome}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/03kge5u8_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{"Home"}</Text>
        </View>

        <View style={styles.view}>
          <View style={styles.column}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/tftx8ms2_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
            <Text style={styles.text2}>{"Review Submitted"}</Text>
          </View>
        </View>

        {/* Continue / Check Progress Button */}
        <TouchableOpacity
          style={styles.view2}
          onPress={handleCheckProgress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.text3}>{"Check Progress"}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  column: { alignItems: "center" },
  image: {
    width: width * 0.07,
    height: height * 0.035,
    marginRight: width * 0.035,
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
    // marginTop: height * 0.08,
    marginBottom: height * 0.32,
    marginLeft: width * 0.08,
  },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  text: { color: "#000000", fontSize: width * 0.045, fontWeight: "bold" },
  text2: { color: "#000000", fontSize: width * 0.06, fontFamily: 'Poppins_700Bold' },
  text3: { color: "#FFFFFF", fontSize: width * 0.045, fontWeight: "bold" },
  view: { alignItems: "center", marginBottom: height * 0.35 },
  view2: {
    alignItems: "center",
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    paddingVertical: height * 0.018,
    marginHorizontal: width * 0.08,
    shadowColor: "#00000033",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
  },
});
