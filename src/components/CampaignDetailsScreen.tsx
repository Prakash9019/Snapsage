import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Dimensions } from "react-native";
import axiosClient from '../api/axiosClient';
import { LinearGradient } from 'expo-linear-gradient';
import { Text,TextInput } from "../../global" 
import { Campaign } from "../types/campaign";
import { sampleCampaign } from "../utils/sampleCampaignData";
const { width, height } = Dimensions.get('window');

interface CampaignDetailsScreenProps {
  campaignId: string;
  onBack: () => void;
  onStartProcess: (campaign: Campaign) => void;
}

export default function CampaignDetailsScreen({ campaignId, onBack, onStartProcess }: CampaignDetailsScreenProps) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        console.log(campaignId)
        // For now, use sample data. Replace with actual API call when backend is ready
        const response = await axiosClient.get(`/campaigns/${campaignId}`);
        setCampaign(response.data);
        
        // Use sample data for testing
        // setCampaign(sampleCampaign);
      //   const mockCampaignDetails = {
      //     id: '1',
      //     title: 'Share Your Audio Experience and Earn ₹100',
      //     category: 'Audio',
      //     startedAt: '14 Aug, 2025 13:00 PM',
      //     endingAt: '15 Aug, 2025 13:00 PM',
      //     overview: '1/ Tell us your audio product’s brand & model.\n2/ Share 2 pros you like most.\n3/ Share 2–3 cons or issues you face.\n4/ Suggest what you’d like improved in the next version.\n5/ Show the product possible.',
      //     guidelines: '1/ Make sure your face and product are clearly visible.\n2/ Speak clearly in a quiet environment.\n3/ Keep your phone steady and camera at eye level.\n4/ Share your honest opinion — no scripts needed.\n5/ Hold or show the product in the video if possible.\n6/ Mention product name → Pros → Cons → Suggestions → Overall rating.',
      //     imageUrl: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/p1rwwr9l_expires_30_days.png',
      //     stages: [ /* add mock stages here if needed */ ],
      // };
      // setCampaign(mockCampaignDetails);
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.msg || 'Failed to fetch campaign details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaignDetails();
  }, [campaignId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading campaign details...</Text>
      </View>
    );
  }

  if (!campaign) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Campaign not found.</Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: 'blue', marginTop: 20 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
          
          <View style={styles.row}>
            <View style={styles.row2}>
              <TouchableOpacity onPress={onBack}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/pri5evlz_expires_30_days.png" }}
                  resizeMode={"stretch"}
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text style={styles.text}>{"Campaign"}</Text>
            </View>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/aybj98aq_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
          </View>
          <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
            <Image
              source={{ uri: campaign.imageUrl }}
              resizeMode={"stretch"}
              style={styles.image3}
            />
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Category', campaign.category)}>
              <Text style={styles.text2}>{campaign.category}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text3}>{campaign.title}</Text>
          <View style={styles.column3}>
            <Text style={styles.text4}>{"About the campaign"}</Text>
            <View style={styles.row3}>
              <View style={styles.column4}>
                <Text style={styles.text5}>{"Started at"}</Text>
                <Text style={styles.text6}>{campaign.startedAt}</Text>
              </View>
              <View style={styles.column5}>
                <Text style={styles.text5}>{"Ending at"}</Text>
                <Text style={styles.text6}>{campaign.endingAt}</Text>
              </View>
            </View>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/xnrqw7bb_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image4}
            />
            <View style={styles.column6}>
              <Text style={styles.text7}>{"Overview"}</Text>
              <Text style={styles.text8}>{campaign.overview}</Text>
            </View>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/k5eulbm0_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image5}
            />
            <View style={styles.column7}>
              <Text style={styles.text7}>{"Video Submission Guidelines"}</Text>
              <Text style={styles.text9}>{campaign.guidelines}</Text>
            </View>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/sg6o03v4_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image6}
            />
            <Text style={styles.text10}>{"Approved videos will receive instant payment to your SnapSage wallet."}</Text>
          </View>
          </View>
          </ScrollView>

          {/* <ScrollView style={styles.scrollView}> */}
        {/* <View style={styles.sp}></View> */}
          <TouchableOpacity style={styles.button2} onPress={() => onStartProcess(campaign)}>
            <Text style={styles.text11}>{"Start Process"}</Text>
          </TouchableOpacity>
       {/* </ScrollView> */}

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sp:{
    // flex:1,
    // marginBottom:width * 0.02,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: height * 0.025,
    paddingBottom: width * 0.02,
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    
  },
  button: {
    backgroundColor: "#DAE5FF",
    borderRadius: 20,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.08,
  },
  button2: {
    padding:height*0.05,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    paddingVertical: height * 0.02,
    marginHorizontal: width * 0.04,
    marginVertical:height*0.01
  },
  column: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // paddingVertical: height * 0.045,
    paddingHorizontal: width * 0.04,
  },
  column2: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  column3: {
    alignSelf: "stretch",
    backgroundColor: "#DAE5FF4D",
    borderColor: "#00000008",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: height * 0.03,
    marginBottom: height * 0.04,
  },
  column4: {
    flex: 1,
    marginRight: width * 0.03,
  },
  column5: {
    flex: 1,
  },
  column6: {
    width:"100%",
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.06,
  },
  column7: {
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.06,
  },
  image: {
    width: width * 0.07,
    height: height * 0.03,
    marginRight: width * 0.035,
  },
  image2: {
    width: width * 0.07,
    height: height * 0.03,
  },
  image3: {
    width: width * 0.25,
    height: height * 0.12,
    marginBottom: height * 0.01,
  },
  image4: {
    height: height * 0.001,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.08,
  },
  image5: {
    height: height * 0.001,
    marginBottom: height * 0.025,
    marginHorizontal: width * 0.045,
  },
  image6: {
    height: height * 0.001,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.045,
  },
  row: {
    // marginTop:height * 0.05,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.06,
    marginHorizontal: width * 0.035,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width * 0.005,
  },
  row3: {
    flexDirection: "row",
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.06,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: width * 0.045,
    fontFamily: 'Poppins_700Bold',
  },
  text2: {
    color: "#2B53A9",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Medium',
  },
  text3: {
    color: "#71727A",
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    marginBottom: height * 0.02,
  },
  text4: {
    color: "#000000",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.03,
    marginLeft: width * 0.06,
  },
  text5: {
    color: "#71727A",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Medium',
    marginBottom: height * 0.005,
    marginLeft: width * 0.002,
  },
  text6: {
    color: "#000000",
    fontSize: width * 0.035,
    fontFamily: 'Poppins_700Bold',
  },
  text7: {
    color: "#000000",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.005,
  },
  text8: {
    color: "#71727A",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Medium',
    width: width * 1,
  },
  text9: {
    color: "#71727A",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Medium',
  },
  text10: {
    color: "#000000",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Medium',
    marginHorizontal: width * 0.1,
  },
  text11: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
  },
});

