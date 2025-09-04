import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axiosClient from "../api/axiosClient";
import { Text } from "../../global"
import DynamicStageScreen from "./DynamicStageScreen";
import VideoSubmissionScreen3 from "./VideoSubmissionScreen3";
import VideoSubmissionScreen5 from "./VideoSubmissionScreen5";
import VideoSubmissionScreen6 from "./VideoSubmissionScreen6";
import SubmissionCompleteScreen from "./SubmissionCompleteScreen";
import { Campaign, StageAnswer } from "../types/campaign";

const { width, height } = Dimensions.get("window");
import { DimensionValue } from "react-native";

interface VideoSubmissionFlowProps {
  campaign: Campaign;
  onComplete: () => void;
  onBack: () => void;
}

// Define the shape of the refs
interface DynamicStageRef {
  handleContinue: () => void;
}

interface VideoScreenRef {
  handleContinue?: () => void;
  handleSubmitReview?: () => void;
}

export default function VideoSubmissionFlow({ campaign, onComplete, onBack }: VideoSubmissionFlowProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageAnswers, setStageAnswers] = useState<StageAnswer[]>([]);
  const [videoAnswers, setVideoAnswers] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalVideoData, setFinalVideoData] = useState<{ videoUri?: string; stageImageUri?: string }>({});

  const dynamicStageRef = useRef<DynamicStageRef>(null);
  const video3Ref = useRef<VideoScreenRef>(null);
  const video5Ref = useRef<VideoScreenRef>(null);
  const video6Ref = useRef<VideoScreenRef>(null);

  const stages = campaign.stages || [];
  const totalStages = stages.length + 3; // +3 for the video screens

  if (stages.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0a08u294_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Process</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.noStagesText}>No stages defined for this campaign.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleNext = async (stageAnswer: StageAnswer) => {
    setLoading(true);
    try {
      const newStageAnswers = [...stageAnswers];
      newStageAnswers[currentStageIndex] = stageAnswer;
      setStageAnswers(newStageAnswers);
      console.log("Updated stage answers:", newStageAnswers);
      setCurrentStageIndex(currentStageIndex + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoContinue = (data: any) => {
    const videoStageIndex = currentStageIndex - stages.length;
    const newVideoAnswers = [...videoAnswers];
    newVideoAnswers[videoStageIndex] = data;
    setVideoAnswers(newVideoAnswers);
    setCurrentStageIndex(currentStageIndex + 1);
  };

  const handleFinalVideoSubmit = async (videoData: { videoUri?: string; stageImageUri?: string }) => {
    setLoading(true);
    try {
      setFinalVideoData(videoData);
      
      const submissionData = {
        campaignId: campaign._id,
        stageAnswers: stageAnswers,
        videoAnswers: videoAnswers,
        ...videoData,
      };
      
      // console.log("Final submission data:", submissionData);
      // await axiosClient.post(`/campaigns/${campaign._id}/submit`, submissionData);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    } else {
      onBack();
    }
  };

  const handleFooterPress = () => {
    if (currentStageIndex < stages.length) {
      dynamicStageRef.current?.handleContinue();
    } else {
      const videoStageIndex = currentStageIndex - stages.length;
      if (videoStageIndex === 0) {
        video3Ref.current?.handleContinue?.();
      } else if (videoStageIndex === 1) {
        video5Ref.current?.handleContinue?.();
      } else if (videoStageIndex === 2) {
        video6Ref.current?.handleSubmitReview?.();
      }
    }
  };

  if (isSubmitted) {
    return <SubmissionCompleteScreen onHome={onBack} onCheckProgress={onComplete} />;
  }

  const progressWidth: DimensionValue = `${((currentStageIndex + 1) / totalStages) * 100}%`;

  const renderContent = () => {
    if (currentStageIndex < stages.length) {
      return (
        <DynamicStageScreen
          ref={dynamicStageRef}
          stage={stages[currentStageIndex]!}
          onContinue={handleNext}
          onBack={handleBack}
          progress={(currentStageIndex + 1) / totalStages}
        />
      );
    } else {
      const videoStageIndex = currentStageIndex - stages.length;
      switch (videoStageIndex) {
        case 0:
          return (
            <VideoSubmissionScreen3
              ref={video3Ref}
              onContinue={handleVideoContinue}
              onBack={handleBack}
            />
          );
        case 1:
          return (
            <VideoSubmissionScreen5
              ref={video5Ref}
              onContinue={handleVideoContinue}
              onBack={handleBack}
            />
          );
        case 2:
          return (
            <VideoSubmissionScreen6
              ref={video6Ref}
              onContinue={handleFinalVideoSubmit}
              onBack={handleBack}
              progress={(currentStageIndex + 1) / totalStages}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0a08u294_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Process</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {renderContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, loading && { opacity: 0.7 }]}
          onPress={handleFooterPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.continueText}>
              {currentStageIndex === totalStages - 1 ? "Submit" : "Continue"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  backIcon: { width: width * 0.07, height: height * 0.035, marginRight: width * 0.03 },
  headerText: { fontSize: width * 0.05, fontFamily: 'Poppins_700Bold', },

  progressBarBg: {
    height: height * 0.01,
    backgroundColor: "#DAE5FF",
    borderRadius: 100,
    marginHorizontal: width * 0.09,
    marginVertical: height * 0.02,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2C5FDD",
    borderRadius: 100,
  },

  content: { flexGrow: 1 },

  footer: {
    padding: height * 0.02,
    borderTopWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#FFF",
  },
  continueBtn: {
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    paddingVertical: height * 0.018,
    alignItems: "center",
  },
  continueText: { color: "#FFF", fontSize: width * 0.045, fontFamily: 'Poppins_500Medium', },
  noStagesText: {
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: 'Poppins_500Medium',
    color: "#666",
    marginTop: height * 0.2,
  },
});
