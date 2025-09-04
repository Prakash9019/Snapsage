import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Text } from "../../global";
import QuestionComponent from "./QuestionComponent";
import { Stage, StageAnswer } from "../types/campaign";

const { width, height } = Dimensions.get("window");

interface DynamicStageScreenProps {
  stage: Stage;
  onContinue: (answers: StageAnswer) => void;
  onBack: () => void;
  progress: number;
}

const DynamicStageScreen = forwardRef(({ 
  stage, 
  onContinue, 
  onBack, 
  progress 
}: DynamicStageScreenProps, ref) => {
  const [answers, setAnswers] = useState<StageAnswer>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleContinue = () => {
    // Validate required questions
    const requiredQuestions = stage.questions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => !answers[q.id] || answers[q.id].trim() === '');

    if (missingAnswers.length > 0) {
      Alert.alert(
        "Required Fields", 
        `Please fill in the following required fields:\n${missingAnswers.map(q => `• ${q.label}`).join('\n')}`
      );
      return;
    }

    onContinue(answers);
  };

  useImperativeHandle(ref, () => ({
    handleContinue
  }));

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {/* Stage Title */}
      <Text style={styles.title}>{stage.title}</Text>
      
      {/* Stage Description */}
      {stage.description && (
        <Text style={styles.description}>{stage.description}</Text>
      )}

      {/* Questions */}
      {stage.questions.map((question) => (
        <QuestionComponent
          key={question.id}
          question={question}
          value={answers[question.id] || ""}
          onChange={(value) => handleAnswerChange(question.id, value)}
        />
      ))}
    </ScrollView>
  );
});

export default DynamicStageScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: width * 0.08,
  },
  title: {
    color: "#000",
    fontSize: width * 0.08,
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.02,
  },
  description: {
    color: "#666",
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    marginBottom: height * 0.04,
    lineHeight: height * 0.025,
  },
});
