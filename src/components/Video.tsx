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
  handleSubmitReview: () => void;
}

export default function VideoSubmissionFlow({ campaign, onComplete, onBack }: VideoSubmissionFlowProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageAnswers, setStageAnswers] = useState<StageAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finalVideoData, setFinalVideoData] = useState<{ videoUri?: string; stageImageUri?: string }>({});

  const dynamicStageRef = useRef<DynamicStageRef>(null);
  const videoScreenRef = useRef<VideoScreenRef>(null);

  const stages = campaign.stages || [];
  const totalStages = stages.length + 1; // +1 for VideoSubmissionScreen6

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

  const isFinalVideoStage = currentStageIndex === stages.length;
  const currentStage = isFinalVideoStage ? null : stages[currentStageIndex];

  const handleNext = async (stageAnswer: StageAnswer) => {
    setLoading(true);
    try {
      const newStageAnswers = [...stageAnswers];
      newStageAnswers[currentStageIndex] = stageAnswer;
      setStageAnswers(newStageAnswers);
      console.log("Updated stage answers:", newStageAnswers);

      if (currentStageIndex < totalStages - 1) {
        setCurrentStageIndex(currentStageIndex + 1);
      } else {
        try {
          const submissionData = {
            campaignId: campaign._id,
            stageAnswers: newStageAnswers,
            ...finalVideoData,
          };
          console.log("Final submission data:", submissionData);
          // await axiosClient.post(`/campaigns/${campaign._id}/submit`, submissionData);
          setIsSubmitted(true);
        } catch (err: any) {
          console.error("Submit error:", err);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinalVideoSubmit = async (videoData: { videoUri?: string; stageImageUri?: string }) => {
    setLoading(true);
    try {
      setFinalVideoData(videoData);
      
      const submissionData = {
        campaignId: campaign._id,
        stageAnswers: stageAnswers,
        ...videoData,
      };
      
      console.log("Final submission data (from video screen):", submissionData);
      await axiosClient.post(`/campaigns/${campaign._id}/submit`, submissionData);
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
    if (isFinalVideoStage) {
      videoScreenRef.current?.handleSubmitReview();
    } else {
      dynamicStageRef.current?.handleContinue();
    }
  };

  if (isSubmitted) {
    return <SubmissionCompleteScreen onHome={onBack} onCheckProgress={onComplete} />;
  }

  const progressWidth: DimensionValue = `${((currentStageIndex + 1) / totalStages) * 100}%`;

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
        {isFinalVideoStage ? (
          <VideoSubmissionScreen6
            ref={videoScreenRef}
            onContinue={handleFinalVideoSubmit}
            onBack={handleBack}
            progress={(currentStageIndex + 1) / totalStages}
          />
        ) : (
          <DynamicStageScreen
            ref={dynamicStageRef}
            stage={currentStage!}
            onContinue={handleNext}
            onBack={handleBack}
            progress={(currentStageIndex + 1) / totalStages}
          />
        )}
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
