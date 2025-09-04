import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Dimensions, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import logo2 from "../../assets/logo2.png";

const { width, height } = Dimensions.get("window");

interface Campaign {
  id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl: string;
}

interface Props {
  onCampaignDetails: (id: string) => void;
}

export default function ActiveCampaignsScreen({ onCampaignDetails }: Props) {
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Mock data for now
      const mockActive = [
        {
          id: "1",
          title: "Share Your Audio\nExperience and\nEarn ₹100",
          description:
            "Help brands improve their audio products. Record a short selfie video sharing your real experience and get rewarded!",
          reward: 100,
          imageUrl:
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/tsuiibdc_expires_30_days.png",
        },
      ];
      setActiveCampaigns(mockActive);
    } catch (err: any) {
      Alert.alert("Error", "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2C5FDD" />
        <Text>Loading campaigns...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {activeCampaigns.length > 0 ? (
          activeCampaigns.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => onCampaignDetails(c.id)}>
              <Text style={styles.title}>Audio Product Feedback</Text>
              <Text style={styles.desc}>{c.description}</Text>
              <ImageBackground
                source={logo2}
                style={styles.bg}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noCampaigns}>No active campaigns</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: width * 0.05, fontWeight: "bold", marginBottom: 4 },
  desc: { fontSize: width * 0.035, color: "#555", marginBottom: 12 },
  bg: {
    width: "100%",
    height: height * 0.25,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
  noCampaigns: { textAlign: "center", color: "#999", marginTop: 40 },
});
