
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axiosClient from '../api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text,TextInput } from "../../global";
const { width, height } = Dimensions.get('window');
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Banner1 from "./banner1.png"
interface HomeScreenProps {
  onLogout: () => void;
  onCampaigns: () => void;
  onNotifications: () => void;
  onProfile: () => void;
  onCampaignDetails: (campaignId: string) => void;
}

export default function HomeScreen({ onLogout, onCampaigns, onProfile, onCampaignDetails,onNotifications }: HomeScreenProps) {
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  // console.log(AsyncStorage.getItem('name'))
  useEffect(() => {
    AsyncStorage.getItem('name');
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get('/user/profile');
        if (response.data && response.data.name) {
          setUserName(response.data.name);
          setProfileImage(response.data.profileImage || '');
        }
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.msg || 'Failed to fetch user data.');
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      onLogout();
    } catch (error: any) {
      console.error('Failed to remove token from storage:', error);
    }
  };

  const handleReviewNow = () => {
    Alert.alert('Action', 'Navigating to the review page...');
    // You would implement navigation to the video review page here
  };
  
  const handleCategoryPress = (category: string) => {
    Alert.alert('Category', `You selected: ${category}`);
    // You would implement filtering logic based on the selected category here
  };

  return (
    <SafeAreaView style={styles.container}>
     
        
          <View style={styles.row}>
            <View style={styles.row2}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/s82mnlvr_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.image}
              />
              <Text style={styles.text}>{"SNAPSAGE"}</Text>
            </View>

            <View style={styles.row3}>
              <TouchableOpacity onPress={onNotifications}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/5sgg3hpi_expires_30_days.png" }}
                  resizeMode={"stretch"}
                  style={styles.image2}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onProfile}>
                {/* <View style={styles.view}> */}
                {/* <FontAwesome 
                  name="user-o"  
                  color="black"  
                  size={width * 0.07}  // icon fills nicely inside
                /> */}
                 {profileImage ? (
      <Image
        source={{ uri: profileImage }}
        style={{ width: width * 0.09, height: width * 0.09, borderRadius: (width * 0.15) / 2 }}  // circular image
      />
    ) : (
      <FontAwesome name="user-o" color="black" size={width * 0.09} />
    )}
              {/* </View> */}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
          <View style={styles.column}>
          <Text style={styles.text2}>
  {"Welcome back,\n"}
  <Text style={{ color: "#2D5FDE",fontFamily: 'Poppins_700Bold' }}>{userName}</Text>
</Text>
          {/* <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#8FB2FF", "#2C5FDD"]}
            style={styles.row4}>
            <View style={styles.column2}>
              <Text style={styles.text3}>
                {"Get up to ₹100 for every audio product review you submit."}
              </Text>   
              <TouchableOpacity style={styles.button} onPress={handleReviewNow}>
                <Text style={styles.text4}>
                  {"Review now "}
                </Text>
              </TouchableOpacity>
              </View>
            <View style={styles.column3}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/lhxeh08i_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.image4}
              />
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9hh5qa5x_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.absoluteImage}
              />
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/60xuvn7p_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.absoluteImage2}
              />
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/i0iz690f_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={styles.absoluteImage3}
              />
            </View>
          </LinearGradient> */}
            <Image
                source={Banner1}
                resizeMode={"stretch"}
                style={styles.bannerImage}
              />

          <View style={styles.row5}>
            <View style={styles.box} />
            <Text style={styles.text5}>
              {"E X P L O R E"}
            </Text>
            <View style={styles.box2} />
          </View>
          <View style={styles.categoriesRow}>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/gyunjjmm_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>TWS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/dveb7e9i_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>Headset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/g6opb6m0_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>Speaker</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesRow}>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/6lt7gpiq_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>Neckband</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/hfg0qccn_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>Earphones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCampaigns}>
            <LinearGradient colors={["#FFFFFF", "#DAE5FF"]} style={styles.categoryCard}>
              <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/2pm04qrm_expires_30_days.png" }} style={styles.categoryImage} />
            </LinearGradient>
            <Text style={styles.categoryText}>Other</Text>
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
          <View style={styles.column4}>
            <View style={styles.box3} />
            <View style={styles.view7}>
              <View style={styles.row7}>
                <View style={styles.row9}>
                  <Image
                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/xtbgtep9_expires_30_days.png" }}
                    resizeMode={"stretch"}
                    style={styles.image10}
                  />
                  <Text style={styles.text10}>{"Home"}</Text>
                </View>
                <TouchableOpacity style={styles.row10} onPress={onCampaigns}>
                  <Image
                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/q9xzs7em_expires_30_days.png" }}
                    resizeMode={"stretch"}
                    style={styles.image10}
                  />
                  <Text style={styles.text10}>{"Campaigns"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: width * 0.88,       // same margin behavior as row4
    height: height * 0.22,     // adjust as per your design
    borderRadius: 15,          // keep rounded corners like row4
    marginHorizontal: width * 0.06,
    marginBottom: height * 0.04,
  },  
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  absoluteImage: {
    position: "absolute",
    top: height * 0.005,
    left: -width * 0.01,
    width: width * 0.17,
    height: height * 0.08,
  },
  absoluteImage2: {
    position: "absolute",
    bottom: height * 0.06,
    right: -width * 0.015,
    width: width * 0.1,
    height: height * 0.045,
  },
  absoluteImage3: {
    position: "absolute",
    top: height * 0.07,
    left: -width * 0.03,
    width: width * 0.08,
    height: height * 0.03,
  },
  box: {
    width: width * 0.35,
    height: height * 0.001,
    backgroundColor: "#EDF1F3",
    marginRight: width * 0.04,
  },
  box2: {
    height: height * 0.001,
    flex: 1,
    backgroundColor: "#EDF1F3",
  },
  box3: {
    width: width * 0.3,
    height: height * 0.006,
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    marginBottom: height * 0.01,
    marginLeft: width * 0.08,
  },
  button: {
    marginRight: width * 0.2,
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.04,
    // marginLeft: width * 0.002,
  },
  column: {
    backgroundColor: "#FFFFFF",
  },
  column2: {
    flex: 1,
    
  },
  column3: {
    alignItems: "center",
  },
  column4: {
    backgroundColor: "#FFFFFF",
    paddingBottom: height * 0.02,
    shadowColor: "#00000008",
    shadowOpacity: 0.0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    elevation: 20,
  },
  image: {
    width: width * 0.08,
    height: height * 0.04,
    marginRight: width * 0.03,
  },
  image2: {
    width: width * 0.08,
    height: height * 0.04,
    marginRight: width * 0.04,
  },
  image3: {
    width: width * 0.08,
    height: height * 0.04,
  },
  image4: {
    width: width * 0.3,
    height: height * 0.2,
  },
  image5: {
    height: height * 0.06,
    marginHorizontal: width * 0.06,
  },
  image6: {
    height: height * 0.09,
    marginHorizontal: width * 0.03,
  },
  image7: {
    height: height * 0.085,
    marginHorizontal: width * 0.035,
  },
  image8: {
    height: height * 0.06,
    marginHorizontal: width * 0.06,
  },
  image9: {
    height: height * 0.05,
    marginHorizontal: width * 0.04,
  },
  image10: {
    width: width * 0.08,
    height: height * 0.04,
    marginRight: width * 0.02,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.01,
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.02,
    shadowColor: "#00000008",
    shadowOpacity: 0.0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    elevation: 20,
  },
  row2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.06,
  },
  row5: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.06,
  },
  row6: {
    flexDirection: "row",
    marginBottom: height * 0.005,
    marginHorizontal: width * 0.06,
  },
  row7: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row8: {
    flexDirection: "row",
    marginBottom: height * 0.06,
    marginLeft: width * 0.12,
  },
  row9: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width * 0.007,
    marginRight: width * 0.25,
  },
  row10: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width * 0.005,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: width * 0.06,
   fontFamily: 'Poppins_700Bold',
    flex: 1,
  },
  text2: {
    color: "#000000",
    fontSize: width * 0.07,
    fontFamily: 'Poppins_500Medium',
    marginBottom: height * 0.035,
    marginLeft: width * 0.06,
    width: width * 0.6,
  },
  text3: {
    marginRight: width * 0.03,
    color: "#000000",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  text4: {
    color: "#FFFFFF",
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  text5: {
    color: "#6C7278",
    fontSize: width * 0.03,
    fontWeight: "bold",
    marginRight: width * 0.04,
  },
  text6: {
    color: "#989898",
    fontSize: width * 0.03,
    fontWeight: "bold",
    marginRight: width * 0.23,
  },
  text7: {
    color: "#989898",
    fontSize: width * 0.03,
    fontWeight: "bold",
    marginRight: width * 0.2,
  },
  text8: {
    color: "#989898",
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  text9: {
    color: "#989898",
    fontSize: width * 0.03,
    fontWeight: "bold",
    marginRight: width * 0.17,
  },
  text10: {
    color: "#000000",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  view: {
    flex: 1,
    borderColor: "#0000001A",
    borderRadius: 10,
    borderWidth: 1,
    // paddingVertical: height * 0.02,
    // marginRight: width * 0.06,
  },
  view2: {
    flex: 1,
    borderColor: "#0000001A",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.005,
    marginRight: width * 0.06,
  },
  view3: {
    flex: 1,
    borderColor: "#0000001A",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.007,
  },
  view4: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  view5: {
    flex: 1,
    borderColor: "#0000001A",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.02,
    marginRight: width * 0.06,
  },
  view6: {
    flex: 1,
    borderColor: "#0000001A",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: height * 0.025,
  },
  view7: {
    alignItems: "center",
  },
  categoriesRow: {
    paddingLeft:0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: height * 0.02,
  },
  categoryCard: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: width * 0.03,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categoryText: {
    textAlign: 'center',
    marginTop: height * 0.01,
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: height * 0.02,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavIcon: {
    width: width * 0.07,
    height: width * 0.07,
  },
  bottomNavText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    marginTop: height * 0.005,
  },
});
