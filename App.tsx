import React, { useState, useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  Alert, 
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import axiosClient from './src/api/axiosClient';
import { Picker as RNPicker } from '@react-native-picker/picker';
import NotificationsScreen from 'screens/NotificationsScreen';
// 👇 Import Poppins fonts
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold , Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

import SplashScreen1 from './src/screens/SplashScreen1';
import AuthScreen from './src/screens/AuthScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CampaignsScreen from './src/components/CampaignsScreen';
import ProfileScreen from './src/components/ProfileScreen';
import VideoSubmissionFlow from './src/components/VideoSubmissionFlow';
import CampaignDetailsScreen from './src/components/CampaignDetailsScreen';
import WalletScreen from './src/components/WalletScreen';
import WithdrawScreen from './src/components/WithdrawScreen';
import WithdrawalSuccessScreen from './src/components/WithdrawalSuccessScreen';
import SubmissionCompleteScreen from 'components/SubmissionCompleteScreen';
import * as SplashScreen from 'expo-splash-screen';
import SCREENS from "./screenshare";
import { Text, TextInput, Picker } from "./global";
import ActiveCampaignsScreen from './src/components/ActiveCampaignsScreen';
import PrivacyPolicyScreen from './src/components/PrivacyPolicyScreen';
import TermsAndConditionsScreen from './src/components/TermsAndConditionsScreen';
// import MyCampaignsScreen from './src/components/MyCampaignsScreen';


// SplashScreen.preventAutoHideAsync();


        



export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState<number>(90);

  // 👇 Load Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  useEffect(() => {
    const backAction = () => {
      switch (currentScreen) {
        case SCREENS.HOME:
          BackHandler.exitApp();
          return true;
        case SCREENS.PROFILE:
        case SCREENS.CAMPAIGNS:
          setCurrentScreen(SCREENS.HOME);
          return true;
        case SCREENS.CAMPAIGN_DETAILS:
          setCurrentScreen(SCREENS.CAMPAIGNS);
          return true;
        case SCREENS.VIDEO_SUBMISSION:
          setCurrentScreen(SCREENS.CAMPAIGN_DETAILS);
          return true;
        case SCREENS.WALLET:
          setCurrentScreen(SCREENS.PROFILE);
          return true;
        case SCREENS.WITHDRAW:
          setCurrentScreen(SCREENS.WALLET);
          return true;
        case SCREENS.PRIVACY_POLICY:
        case SCREENS.TERMS_AND_CONDITIONS:
          setCurrentScreen(SCREENS.PROFILE);
          return true;
        default:
          return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentScreen]);

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          axiosClient.defaults.headers.common['x-auth-token'] = storedToken;
          setToken(storedToken);

          const profileResponse = await axiosClient.get('/user/profile');
          if (profileResponse.data && profileResponse.data.isProfileComplete) {
            setIsProfileComplete(true);
            setCurrentScreen(SCREENS.HOME);
          } else {
            setCurrentScreen(SCREENS.PROFILE_SETUP);
          }
        } else {
          setCurrentScreen(SCREENS.SPLASH);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load app state. Please log in again.');
        setToken(null);
        setCurrentScreen(SCREENS.AUTH);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppState();
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setCurrentScreen(SCREENS.PROFILE_SETUP);
  };

  const handleProfileComplete = () => {
    setIsProfileComplete(true);
    setCurrentScreen(SCREENS.HOME);
  };

  const handleLogout = () => {
    setToken(null);
    setIsProfileComplete(false);
    AsyncStorage.removeItem('token');
    setCurrentScreen(SCREENS.AUTH);
  };

  const handleStartCampaign = (campaign: any) => {
    setCampaignData(campaign);
    console.log("hiiiiiiii");
    console.log(campaign);
    setCurrentScreen(SCREENS.VIDEO_SUBMISSION);
  };

  const handleCampaignDetails = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setCurrentScreen(SCREENS.CAMPAIGN_DETAILS);
  };

  const handleVideoSubmissionComplete = () => {
    setCurrentScreen(SCREENS.CAMPAIGNS);
  };

  const handleWithdrawRequest = (amount: number) => {
    setCurrentScreen(SCREENS.WITHDRAWAL_SUCCESS);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
 



  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  switch (currentScreen) {
    case SCREENS.SPLASH:
      return <SplashScreen1 onContinue={() => setCurrentScreen(SCREENS.AUTH)} />;
    case SCREENS.AUTH:
      return <AuthScreen onLogin={handleLogin} />;
    case SCREENS.SUBMISSION_COMPLETE:
      return (
        <SubmissionCompleteScreen
          onHome={() => setCurrentScreen(SCREENS.CAMPAIGNS)}
          onCheckProgress={() => setCurrentScreen(SCREENS.CAMPAIGNS)}
        />
      );
    case SCREENS.PROFILE_SETUP:
      return <ProfileSetupScreen onProfileComplete={handleProfileComplete} />;
    case SCREENS.HOME:
      return (
        <HomeScreen
          onLogout={handleLogout}
          onCampaigns={() => setCurrentScreen(SCREENS.CAMPAIGNS)}
          onProfile={() => setCurrentScreen(SCREENS.PROFILE)}
          onCampaignDetails={handleCampaignDetails}
          onNotifications={() => setCurrentScreen(SCREENS.NOTIFICATIONS)}

        />
      );
    case SCREENS.NOTIFICATIONS:
  return <NotificationsScreen onBack={() => setCurrentScreen(SCREENS.HOME)} />;
  case SCREENS.ACTIVE_CAMPAIGNS:
    return (
      <ActiveCampaignsScreen
        onCampaignDetails={handleCampaignDetails}
      />
    );
  
  // case SCREENS.MY_CAMPAIGNS:
  //   return (
  //     <MyCampaignsScreen />
  //   );
  
    case SCREENS.CAMPAIGNS:
      return (
        <CampaignsScreen
          onWallet={() => setCurrentScreen(SCREENS.WALLET)}
          onHome={() => setCurrentScreen(SCREENS.HOME)}
          onCampaignDetails={handleCampaignDetails}
          onProfile={() => setCurrentScreen(SCREENS.PROFILE)}
        />
      );
    case SCREENS.PROFILE:
      return (
        <ProfileScreen
          onBack={() => setCurrentScreen(SCREENS.HOME)}
          onLogout={handleLogout}
          onHome={() => setCurrentScreen(SCREENS.HOME)}
          onCampaigns={() => setCurrentScreen(SCREENS.HOME)}
          onWallet={() => setCurrentScreen(SCREENS.WALLET)}
          onPrivacyPolicy={() => setCurrentScreen(SCREENS.PRIVACY_POLICY)}
          onTermsAndConditions={() => setCurrentScreen(SCREENS.TERMS_AND_CONDITIONS)}
        />
      );
    case SCREENS.CAMPAIGN_DETAILS:
      return (
        <CampaignDetailsScreen
          campaignId={selectedCampaignId!}
          onBack={() => setCurrentScreen(SCREENS.CAMPAIGNS)}
          onStartProcess={handleStartCampaign}
        />
      );
    case SCREENS.VIDEO_SUBMISSION:
      return (
        <VideoSubmissionFlow
          campaign={campaignData}
          onComplete={handleVideoSubmissionComplete}
          onBack={() => setCurrentScreen(SCREENS.CAMPAIGN_DETAILS)}
        />
      );
    case SCREENS.WALLET:
      return (
        <WalletScreen
          onBack={() => setCurrentScreen(SCREENS.PROFILE)}
          onWithdraw={() => setCurrentScreen(SCREENS.WITHDRAW)}
        />
      );
    case SCREENS.WITHDRAW:
      return (
        <WithdrawScreen
          onBack={() => setCurrentScreen(SCREENS.WALLET)}
          currentBalance={walletBalance}
          onWithdraw={handleWithdrawRequest}
        />
      );
    case SCREENS.WITHDRAWAL_SUCCESS:
      return <WithdrawalSuccessScreen onHome={() => setCurrentScreen(SCREENS.HOME)} />;
    case SCREENS.PRIVACY_POLICY:
      return <PrivacyPolicyScreen onBack={() => setCurrentScreen(SCREENS.PROFILE)} />;
    case SCREENS.TERMS_AND_CONDITIONS:
      return <TermsAndConditionsScreen onBack={() => setCurrentScreen(SCREENS.PROFILE)} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
