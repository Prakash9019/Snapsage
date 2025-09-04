import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Text,TextInput } from "../../global" 
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from '../api/axiosClient';
import { LinearGradient } from 'expo-linear-gradient';
import Home from "../../assets/Home.png"
import logo2 from "../../assets/logo2.png"
const { width, height } = Dimensions.get('window');

interface Campaign {
  _id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl: string;
}

interface CampaignSubmission {
  id: string;
  campaignTitle: string;
  status: 'In Progress' | 'Completed';
  imageUrl: string;
}

interface CampaignsScreenProps {
  onHome: () => void;
  onProfile: () => void;
  onWallet :()=>void;
  onCampaignDetails: (campaignId: string) => void;
}

export default function CampaignsScreen({ onHome, onProfile, onCampaignDetails,onWallet }: CampaignsScreenProps) {
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [mySubmissions, setMySubmissions] = useState<CampaignSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'my'>('active');
  const [myCampaignStatus, setMyCampaignStatus] = useState<'inProgress' | 'completed'>('inProgress');
const [hiiLoaded, setHiiLoaded] = useState(false);
const [hiiValue, setHiiValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeResponse = await axiosClient.get('/campaigns');
        setActiveCampaigns(activeResponse.data);
            console.log(activeResponse.data)
        // const submissionsResponse = await axiosClient.get('/user/submissions');
        // setMySubmissions(submissionsResponse.data);
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.msg || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

useEffect(() => {
  const checkProgress = async () => {
    try {
      const value = await AsyncStorage.getItem("hii");
      setHiiValue(value);
    } catch (e) {
      console.log("Error reading storage:", e);
    } finally {
      setHiiLoaded(true); // mark that storage check is done
    }
  };
  checkProgress();
}, []);


  const handleCheckProgress = async () => { 
    setLoading(true);
    try {
      // now mock submissions appear
      const mockSubmissions = [
        {
          id: '1',
          campaignTitle: 'Share Your Audio Experience and Earn ₹100',
          status: 'In Progress',
          imageUrl: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9x0qst8h_expires_30_days.png',
        },
      ];
      const processedSubmissions = mockSubmissions.map((sub: any) => ({
        ...sub,
        // status: sub.status === 'approved' ? 'Completed' : 'In Progress',
      }));
      setMySubmissions(processedSubmissions);
  
      // await onCampaignDetails("1"); // or navigation logic
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data as requested
        // const mockActiveCampaigns = [
          
        // ];
        // setActiveCampaigns(mockActiveCampaigns);

        const mockSubmissions = [
          {
            id: '1',
            campaignTitle: 'Share Your Audio Experience and Earn ₹100',
            status: 'In Progress',
            imageUrl: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9x0qst8h_expires_30_days.png',
          },
        ];
        const processedSubmissions = mockSubmissions.map((sub: any) => ({
          ...sub,
          status: sub.status === 'approved' ? 'Completed' : 'In Progress',
      }));
      setMySubmissions(processedSubmissions);
        // setMySubmissions(mockSubmissions);

      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.msg || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const inProgressSubmissions =  mySubmissions.filter(sub => sub.status === 'In Progress');
  // console.log(inProgressSubmissions)
  const completedSubmissions = mySubmissions.filter(sub => sub.status === 'Completed');
  
  const handleReviewNow = (campaignId: string) => {
    Alert.alert('Action', `Starting review for campaign: ${campaignId}`);
    // You would implement navigation to the video review page here, passing the campaignId
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading campaigns...</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (activeTab === 'active') {
      return (
        <View style={styles.campaignListContainer}>
          {activeCampaigns.length > 0 ? (
            activeCampaigns.map((campaign) => (
              <TouchableOpacity key={campaign._id} onPress={() => onCampaignDetails(campaign._id)}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <Text style={styles.campaignDescription}>{campaign.description}</Text>
                <ImageBackground
                  source={logo2}
                  resizeMode={'stretch'}
                  style={styles.campaignImageBackground}
                >
                  <View style={styles.campaignContent}>
                    {/* <View style={styles.campaignTextContainer}>
                      <Text style={styles.campaignHeaderText}>{campaign.title}</Text>
                      <TouchableOpacity style={styles.campaignButton}>
                        <Text style={styles.campaignButtonText}>{"Review now "}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.campaignImageOverlay}>
                      <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/8tb0srin_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.campaignIcon}
                      />
                      <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/j6uurjbj_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.campaignAbsoluteImage1}
                      />
                      <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/hge6oejb_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.campaignAbsoluteImage2}
                      />
                      <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/taf2cuiv_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.campaignAbsoluteImage3}
                      />
                    </View> */}
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCampaignsText}>No active campaigns found.</Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.bgs}>
 <View style={styles.myCampaignsStatus}>
    <TouchableOpacity 
      onPress={() => setMyCampaignStatus('inProgress')} 
      style={[styles.statusButtonWrapper, myCampaignStatus === 'inProgress' && styles.bgs1]}
    >
      <Text style={[styles.statusButton, myCampaignStatus === 'inProgress' && styles.activeStatus]}>
        In progress
      </Text>
      {myCampaignStatus === 'inProgress' && <View style={styles.statusUnderline} />}
    </TouchableOpacity>

    <TouchableOpacity 
      onPress={() => setMyCampaignStatus('completed')} 
      style={[styles.statusButtonWrapper, myCampaignStatus === 'completed' && styles.bgs1]}
    >
      <Text style={[styles.statusButton, myCampaignStatus === 'completed' && styles.activeStatus]}>
        Completed
      </Text>
      {myCampaignStatus === 'completed' && <View style={styles.statusUnderline} />}
    </TouchableOpacity>
  </View>
          {myCampaignStatus === 'inProgress'  && hiiLoaded && hiiValue &&  (

            inProgressSubmissions.length > 0 ? (
              inProgressSubmissions.map(sub => (
                <View key={sub.id} style={styles.submissionCard}>
                  <View style={styles.submissionCardContent}>
                    <Image
                      source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9x0qst8h_expires_30_days.png" }}
                      resizeMode={"stretch"}
                      style={styles.submissionImage}
                    />
                    <Text style={styles.submissionTitle}>Share Your Audio Experience and Earn ₹100</Text>
                  </View>
                  <View style={styles.submissionDivider} />
                  <View style={styles.submissionStatus}>
                    <Text style={styles.submissionStatusText}>Review has been submitted and waiting for approval</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noSubmissionsText}>No campaigns in progress.</Text>
            )
          )}
          {myCampaignStatus === 'completed' && (
            completedSubmissions.length > 0 ? (
              completedSubmissions.map(sub => (
                <View key={sub.id} style={styles.submissionCard}>
                  <View style={styles.submissionCardContent}>
                    <Image
                      source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9x0qst8h_expires_30_days.png" }}
                      resizeMode={"stretch"}
                      style={styles.submissionImage}
                    />
                    <Text style={styles.submissionTitle}>{sub.campaignTitle}</Text>
                  </View>
                  <View style={styles.submissionDivider} />
                  <View style={styles.submissionStatus}>
                    <Text style={[styles.submissionStatusText, { color: 'green' }]}>Review has been approved!</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noSubmissionsText}>No completed campaigns found.</Text>
            )
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/cz7v4rvu_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.headerImage}
            />
            <Text style={styles.headerText}>{"SNAPSAGE"}</Text>
          </View>
          <TouchableOpacity onPress={onWallet}>
  <Image
    source={{
      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/lctsf1jk_expires_30_days.png",
    }}
    resizeMode="stretch"
    style={styles.headerImageRight}
  />
</TouchableOpacity>

        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => setActiveTab('active')} style={styles.tabItem}>
            <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Active Campaigns</Text>
            {activeTab === 'active' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('my')} style={styles.tabItem}>
            <Text style={[styles.tabText, activeTab === 'my' && styles.tabTextActive]}>My Campaigns</Text>
            {activeTab === 'my' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentScrollView}>
        {renderContent()}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <TouchableOpacity style={styles.bottomNavItem} onPress={onHome}>
            <Image
              source={ Home }
              resizeMode={"stretch"}
              style={styles.bottomNavIcon}
            />
            <Text style={styles.text10}>{"Home"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem} onPress={() => {}}>
            <View style={styles.bottomNavCampaignActive}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/8spaaiqj_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.bottomNavIcon}
              />
              <Text style={styles.text10}>{"Campaigns"}</Text>
              <View style={styles.bottomNavCampaignIndicator} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
       {/* <View style={styles.column4}>
          
            <View style={styles.view7}>
              <View style={styles.row7}>
             
                <TouchableOpacity style={styles.row9} onPress={onHome}>
                  <Image
                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/xtbgtep9_expires_30_days.png" }}
                    resizeMode={"stretch"}
                    style={styles.image10}
                  />
                  <Text style={styles.text10}>{"Home"}</Text>
                </TouchableOpacity>
                <View style={styles.box3} />
                <View style={styles.row10} >
                <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/8spaaiqj_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.image10}
              />
                  <Text style={styles.text10}>{"Campaigns"}</Text>
                </View>
              </View>
            </View>
          </View> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view7: {
    alignItems: "center",
  },
  text10: {
    color: "#000000",
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  row10: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width * 0.005,
  },
  image10: {
    width: width * 0.08,
    height: height * 0.04,
    marginRight: width * 0.02,
  },
  row9: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width * 0.007,
    marginRight: width * 0.25,
  },
  row7: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box3: {
    width: width * 0.3,
    height: height * 0.006,
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    marginBottom: height * 0.02,
    marginLeft: width * 0.08,
  },
  column4: {
    backgroundColor: "#FFFFFF",
    paddingBottom: height * 0.06,
    shadowColor: "#00000008",
    shadowOpacity: 0.0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    elevation: 20,
  },
  noSubmissionsContainer: {
    flex: 1,
    justifyContent: "center", // vertically center
    alignItems: "center",     // horizontally center
  },
  
  noSubmissionsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  
  image5: {
		width: width * 0.07,
		height: height * 0.035,
		marginRight: width * 0.02,
	},
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header and Tab Bar Styles
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    // paddingTop: height * 0.02,
    // paddingBottom: height * 0.04,

  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: height * 0.04,
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.06,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: height * 0.02,
  },
  headerImage: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.03,
  },
  headerText: {
    color: "#000000",
    fontSize: width * 0.06,
    fontFamily: 'Poppins_700Bold',
  },
  headerImageRight: {
    width: width * 0.08,
    height: width * 0.08,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.1,
    // borderBottomWidth: 1,
    borderBottomColor: '#EDF1F3',
    position: 'relative',
  },
  tabItem: {
    paddingBottom: height * 0.03,
  },
  tabText: {
    color: '#989898',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    // paddingBottom: height * 0.05,
  },
  tabTextActive: {
    color: '#000',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#000',
  },
  // Scrollable Content
  contentScrollView: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: width * 0.05,
  },
  campaignListContainer: {
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
  },
  campaignTitle: {
    paddingLeft:height * 0.008,
    color: "#000000",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.002,
  },
  campaignDescription: {
    paddingLeft:height * 0.008,
    color: "#989898",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Meduim',
    marginBottom: height * 0.02,
  },
  campaignImageBackground: {
    width: '100%',
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  campaignContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.06,
  },
  campaignTextContainer: {
    flex: 1,
    marginRight: width * 0.07,
  },
  campaignHeaderText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_500Meduim',
    marginBottom: height * 0.02,
    width: width * 0.4,
  },
  campaignButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: height * 0.006,
    paddingHorizontal: width * 0.06,
  },
  campaignButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.03,
    fontFamily: 'Poppins_500Meduim',
  },
  campaignImageOverlay: {
    flex: 1,
  },
  campaignIcon: {
    height: height * 0.2,
  },
  campaignAbsoluteImage1: {
    position: "absolute",
    top: height * 0.005,
    left: -width * 0.01,
    width: width * 0.17,
    height: height * 0.08,
  },
  campaignAbsoluteImage2: {
    position: "absolute",
    bottom: height * 0.06,
    right: -width * 0.015,
    width: width * 0.1,
    height: height * 0.045,
  },
  campaignAbsoluteImage3: {
    position: "absolute",
    bottom: height * 0.06,
    left: -width * 0.02,
    width: width * 0.09,
    height: height * 0.035,
  },
  noCampaignsText: {
    textAlign: 'center',
    marginTop: height * 0.1,
    fontSize: width * 0.04,
    color: '#989898',
  },
  // My Campaigns Styles
  bgs :{
    //  borderRadius: 4,
    // paddingHorizontal:  0,
        // backgroundColor:"#DAE6FF"
  },
  statusButtonWrapper: {
    
    flex: 1,                // both buttons take equal space
    alignItems: 'center',   // centers text inside
    justifyContent: 'center',
  },
  
  // bgs1: {
  //   backgroundColor: "#fff",
  //   borderRadius: 8,
  // },
  bgs1:{
    // paddingHorizontal:  0,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    // paddingHorizontal: height * 0.03,
    paddingVertical:height*0.01,
  },
  myCampaignsStatus: {
    alignContent:"center",
    alignItems:"center",
    borderRadius: 4,
    // justifyContent:"center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
    marginHorizontal: height * 0.05,
    backgroundColor:"#DAE6FF",
    paddingVertical: height * 0.005,
    paddingHorizontal:  height * 0.005,
      // backgroundColor:"blue"
  },
  statusButton: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#989898',
  },
  activeStatus: {
    color: '#000',
  },
  statusUnderline: {
    // position: 'absolute',
    // bottom: -height * 0.005,
    // width: '100%',
    // height: 2,
    backgroundColor: '#000',
  },
  submissionCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#00000008",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.03,
    
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // increase from 0 to make visible
    shadowRadius: 6,
    
    // Android shadow
    elevation: 5,
  },
  
  submissionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.01,
  },
  submissionImage: {
    width: width * 0.12,
    height: width * 0.12,
    marginRight: width * 0.04,
  },
  submissionTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    width: '70%',
  },
  submissionDivider: {
    height: 1,
    backgroundColor: "#EDF1F3",
    marginVertical: height * 0.015,
    marginHorizontal: width * 0.05,
  },
  submissionStatus: {
    paddingHorizontal: width * 0.05,
  },
  submissionStatusText: {
    fontSize: width * 0.03,
    color: '#71727A',
  },
  // Bottom Navigation Bar Styles
  bottomNav: {
    paddingBottom: height * 0.02,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#EDF1F3',
    paddingVertical: height * 0.01,
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignSelf: 'center',
    // fontSize:10,
  },
  bottomNavItem: {
    // alignItems: 'center',
     flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  bottomNavCampaignActive: {
    flexDirection: "row",
    alignItems: "center",
    position: 'relative',
  },
  bottomNavIcon: {
    width: width * 0.07,
    height: width * 0.07,
    resizeMode: 'contain',
  },
  bottomNavText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    marginTop: height * 0.005,
    color: '#000',
  },
  bottomNavCampaignIndicator: {
    position: 'absolute',
    top: -height * 0.015,
    width: width * 0.25,
    height: 4,
    backgroundColor: '#2C5FDD',
    borderRadius: 2,
  },
});
