import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Image,  TouchableOpacity, StyleSheet, Alert, Dimensions, Linking } from "react-native";
import axiosClient from '../api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text,TextInput } from "../../global" 
const { width, height } = Dimensions.get('window');
import * as ImagePicker from "expo-image-picker";
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
interface ProfileScreenProps {
    onLogout: () => void;
    onHome: () => void;
    onCampaigns: () => void;
    onWallet: () => void; // New prop for navigation
    onBack: () => void; 
    onPrivacyPolicy: () => void;
    onTermsAndConditions: () => void;
}

export default function ProfileScreen({ onLogout, onHome, onCampaigns, onWallet,onBack, onPrivacyPolicy, onTermsAndConditions }: ProfileScreenProps) {
    const [userName, setUserName] = useState<string>(''); // Placeholder
    const [walletBalance, setWalletBalance] = useState<number>(0.00); // Placeholder

    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const userResponse = await axiosClient.get("/user/profile");
          if (userResponse.data) {
            console.log("User Profile Data:", userResponse.data);
            // AsyncStorage.setItem('userName', userResponse.data.name);
            AsyncStorage.setItem('profileImage', userResponse.data.profileImage || null);
            setUserName(userResponse.data.name);
            setProfileImage(userResponse.data.profileImage || null);
          }
          const walletResponse = await axiosClient.get("/wallet");
          if (walletResponse.data && walletResponse.data.totalEarnings) {
            setWalletBalance(walletResponse.data.totalEarnings);
          }
        } catch (error: any) {
          Alert.alert("Error", error.response?.data?.msg || "Failed to fetch profile data.");
        }
      };
      fetchProfileData();
    }, []);
    

    const handlePickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const formData = new FormData();
        formData.append("profileImage", {
          uri: asset.uri,
          type: asset.mimeType || "image/jpeg", // Fallback to jpeg
          name: asset.fileName || "profile.jpg", // Fallback name
        } as any);
    
        try {
          const res = await axiosClient.post("/user/profile-image", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          Alert.alert("Success", "Profile image updated successfully!");
          setProfileImage(res.data.profileImage);
        } catch (err: any) {
          Alert.alert("Upload Failed", err.response?.data?.msg || "Something went wrong");
        }
      }
    };
    const handleWalletPress = () => {
        onWallet(); // Navigate to the new WalletScreen
    };

    const handleHelpSupportPress = () => {
        Linking.openURL('mailto:official@snapsageresearch.com?subject=Help and Support');
    };

    const handleReferAndEarnPress = () => {
        Alert.alert('Action', 'Navigating to Refer and Earn page...');
    };

    const handleRateSnapSagePress = () => {
        Alert.alert('Action', 'Opening app store for rating...');
    };

    const handleRequestFeaturePress = () => {
          Linking.openURL('mailto:official@snapsageresearch.com?subject=Help and Support');
    };

    const handleFeedbackPress = () => {
          Linking.openURL('mailto:official@snapsageresearch.com?subject=Help and Support');
    };

    const handleReportBugPress = () => {
        Linking.openURL('mailto:official@snapsageresearch.com?subject=Bug Report&body=Please describe the bug you encountered:');
    };
    
    const handlePrivacyPolicyPress = () => {
        onPrivacyPolicy();
    };

    const handleTermsAndConditionsPress = () => {
        onTermsAndConditions();
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            onLogout();
        } catch (error: any) {
            console.error('Failed to remove token from storage:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.column}>
                <TouchableOpacity onPress={onBack}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/qv2hhzbj_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <View style={styles.container1}>
  <TouchableOpacity style={styles.view} onPress={handlePickImage}>
    {profileImage ? (
      <Image
        source={{ uri: profileImage }}
        style={{ width: "100%", height: "100%", borderRadius: (width * 0.29) / 2 }}
      />
    ) : (
      <FontAwesome name="user-o" color="black" size={width * 0.15} />
    )}
    <View style={styles.editBadge}>
      <FontAwesome name="pencil" size={14} color="#fff" />
    </View>
  </TouchableOpacity>
</View>


                    <View style={styles.view2}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{userName}</Text>
                            
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <TouchableOpacity style={styles.buttonColumn} onPress={handleWalletPress}>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/1ao5o78y_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image4}
                            />
                            <Text style={styles.text2}>{"₹" + walletBalance}</Text>
                            <Text style={styles.text3}>{"Wallet"}</Text>
                        </TouchableOpacity>
                        <View style={styles.column2}>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/ppt1wfsm_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image5}
                            />
                            <Text style={styles.text4}>{"-"}</Text>
                            <Text style={styles.text5}>{"Leaderboard"}</Text>
                        </View>
                    </View>
                    <View style={styles.column3}>
                        <TouchableOpacity style={styles.row3} onPress={handleHelpSupportPress}>
                            <View style={styles.row4}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/29t0pmok_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Help and Support"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/v8nmbg1m_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0tq59fas_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image8}
                        />
                        {/* <TouchableOpacity style={styles.row5} onPress={handleLogout}>
                            <View style={styles.row4}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/ozyvhhza_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Refer and Earn Logout "}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/99zi048v_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity> */}
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/l2obeapv_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image9}
                        />
                        <TouchableOpacity style={styles.row6} onPress={handleRateSnapSagePress}>
                            <View style={styles.row4}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/fe5z1jfs_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Rate SnapSage"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/67kj7rxe_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/jhsvdiga_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image10}
                        />
                        <TouchableOpacity style={styles.row7} onPress={handleRequestFeaturePress}>
                            <View style={styles.row8}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/mnijwzhr_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Request a Feature"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0vyrmhag_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/cgqfhw7a_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image8}
                        />
                        <TouchableOpacity style={styles.row9} onPress={handleFeedbackPress}>
                            <View style={styles.row10}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/2x8f5nqs_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Leave a Feedback"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/6r9v21nd_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/epboo2t4_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image10}
                        />
                        <TouchableOpacity style={styles.row11} onPress={handleReportBugPress}>
                            <View style={styles.row8}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/etkar8cz_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Report Bug"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/mhxjen28_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/kexsoupc_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image11}
                        />
                        <TouchableOpacity style={styles.row12} onPress={handlePrivacyPolicyPress}>
                            <View style={styles.row8}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/zwswszi9_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text6}>{"Privacy Policy"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9cf3dp5n_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/l3l19dbj_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.image10}
                        />
                        <TouchableOpacity style={styles.row13} onPress={handleTermsAndConditionsPress}>
                            <View style={styles.row14}>
                                <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/f18qe4yk_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                />
                                <Text style={styles.text7}>{"Terms and Conditions"}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/4zp74b9i_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.row15} onPress={handleLogout}>
                            <View style={styles.row14}>
                                {/* <Image
                                    source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/ozyvhhza_expires_30_days.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.image6}
                                /> */}
                                <MaterialIcons name="logout" size={18} color="black" style={{marginRight: width * 0.035}} />
                                <Text style={styles.text6}>{"Logout "}</Text>
                            </View>
                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/99zi048v_expires_30_days.png" }}
                                resizeMode={"stretch"}
                                style={styles.image7}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    editBadge: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#007bff",
        borderRadius: 12,
        padding: 5,
      },      
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    buttonColumn: {
        width: width * 0.4,
        backgroundColor: "#FFFFFF",
        borderColor: "#0000001A",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.01,
        marginRight: width * 0.04,
        shadowColor: "#00000008",
        shadowOpacity: 0.0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        elevation: 10,
    },
    column: {
        backgroundColor: "#FFFFFF",
        // paddingTop: height * 0.04,
        paddingBottom: height * 0.07,
    },
    column2: {
        width: width * 0.4,
        backgroundColor: "#FFFFFF",
        borderColor: "#0000001A",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.01,
        shadowColor: "#00000008",
        shadowOpacity: 0.0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        elevation: 10,
    },
    column3: {
        backgroundColor: "#FFFFFF",
        borderColor: "#0000001A",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: height * 0.03,
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
    image: {
        width: width * 0.07,
        height: height * 0.035,
        marginBottom: height * 0.04,
        marginLeft: width * 0.08,
    },
    image2: {
        width: width * 0.29,
        height: height * 0.15,
    },
    image3: {
        width: width * 0.06,
        height: height * 0.03,
    },
    image4: {
        width: width * 0.07,
        height: height * 0.035,
        marginBottom: height * 0.015,
        marginLeft: width * 0.03,
    },
    image5: {
        width: width * 0.07,
        height: height * 0.035,
        marginBottom: height * 0.015,
        marginLeft: width * 0.05,
    },
    image6: {
        width: width * 0.05,
        height: height * 0.02,
        marginRight: width * 0.035,
    },
    image7: {
        width: width * 0.03,
        height: height * 0.015,
    },
    image8: {
        height: height * 0.001,
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    image9: {
        height: height * 0.001,
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    image10: {
        height: height * 0.001,
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    image11: {
        height: height * 0.001,
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap:0
    },
    row2: {
        flexDirection: "row",
        marginBottom: height * 0.005,
        marginHorizontal: width * 0.08,
    },
    row3: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    row4: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: width * 0.007,
    },
    row5: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.01,
        marginHorizontal: width * 0.06,
    },
    row6: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.01,
        marginHorizontal: width * 0.06,
    },
    row7: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    row8: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: width * 0.005,
    },
    row9: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.01,
        marginHorizontal: width * 0.06,
    },
    row10: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: width * 0.002,
    },
    row11: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.015,
        marginHorizontal: width * 0.06,
    },
    row12: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.01,
        marginHorizontal: width * 0.06,
    },
    row13: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: width * 0.06,
    },
    row15: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: width * 0.06,
        marginTop: height * 0.02,
    },
    row14: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: width * 0.03,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        color: "#000000",
        fontSize: width * 0.06,
        fontWeight: "bold",
        marginRight: width * 0.03,
    },
    text2: {
        color: "#000000",
        fontSize: width * 0.04,
        fontWeight: "bold",
        marginBottom: height * 0.005,
        marginLeft: width * 0.04,
    },
    text3: {
        color: "#989898",
        fontSize: width * 0.025,
        fontWeight: "bold",
        marginLeft: width * 0.04,
    },
    text4: {
        color: "#000000",
        fontSize: width * 0.04,
        fontWeight: "bold",
        marginBottom: height * 0.005,
        marginLeft: width * 0.05,
    },
    text5: {
        color: "#989898",
        fontSize: width * 0.025,
        fontWeight: "bold",
        marginLeft: width * 0.05,
    },
    text6: {
        color: "#000000",
        fontSize: width * 0.03,
        fontWeight: "bold",
    },
    text7: {
        color: "#000000",
        fontSize: width * 0.03,
        fontWeight: "bold",
        flex: 1,
    },
    container1: {
        flex: 1,                     // takes full screen
        justifyContent: "center",    // centers vertically
        alignItems: "center",        // centers horizontally
      },
    view: {
        alignItems: "center",
        justifyContent: "center", // center icon vertically
        marginBottom: height * 0.025,
        width: width * 0.29,
        height: width * 0.29,       // make it a square for circle
        borderRadius: (width * 0.29) / 2, // half of width = circle
        backgroundColor: "#f0f0f0", // optional (for visibility)
      },
      
    view2: {
        alignItems: "center",
        marginBottom: height * 0.05,
    },
});
