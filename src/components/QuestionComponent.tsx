import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Text, TextInput, Picker } from "../../global";
import { Question } from "../types/campaign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface QuestionComponentProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}
// interface Question {
//   placeholder?: string;
//   label :string;
//   type: "textarea" | "dropdown" | "mcq" | "text" | "rating";
//   question: string;
//   options?: string[];
// }


export default function QuestionComponent({ question, value, onChange }: QuestionComponentProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // toggle checkbox selection
  const handleOptionToggle = (option: string) => {
    if (!Array.isArray(value)) {
      onChange([option]);
      return;
    }
    if (value.includes(option)) {
      onChange(value.filter((item: string) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  // toggle rating expand
  const toggleCategory = (category: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // set rating value for a category
  const handleRatingChange = (category: string, rating: number) => {
    onChange({ ...(value || {}), [category]: rating });
  };

  const renderRatingIcons = (category: string) => {
    const currentRatings = value || {};
    const icons = [];
    for (let i = 1; i <= 10; i++) {
      icons.push(
        <TouchableOpacity key={i} onPress={() => handleRatingChange(category, i)} style={{ marginRight: 3 }}>
          <Ionicons
            name={i <= (currentRatings[category] || 0) ? "star" : "star-outline"}
            size={24}
            color={i <= (currentRatings[category] || 0) ? "#2C5FDD" : "#989898"}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingRow}>{icons}</View>;
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "dropdown":
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={[
                styles.picker,
                value === "" ? styles.placeholderText : styles.selectedText,
              ]}
            >
              <Picker.Item label={`Select ${question.label}`} value="" />
              {question.options?.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>
        );

      case "mcq": // ✅ Multi-select checkboxes
        return (
          <View style={styles.mcqContainer}>
            {question.options?.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => handleOptionToggle(option)}>
                <View style={styles.mcqOptionRow}>
                  <Ionicons
                    name={Array.isArray(value) && value.includes(option) ? "checkbox-outline" : "square-outline"}
                    size={24}
                    color={Array.isArray(value) && value.includes(option) ? "#2C5FDD" : "#989898"}
                    style={{ marginRight: width * 0.02 }}
                  />
                  <Text
                    style={[
                      styles.textOption,
                      Array.isArray(value) && value.includes(option) && { color: "#2C5FDD" },
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case "rating": // ✅ Rating system (expandable cards)
        return (
          <View style={{ gap: height * 0.015 }}>
            {question.options?.map((opt, idx) => (
              <View style={styles.card} key={idx}>
                <TouchableOpacity onPress={() => toggleCategory(opt)} style={styles.cardHeader}>
                  <Text style={styles.textOption}>{opt}</Text>
                  {expandedCategory === opt ? (
                    <AntDesign name="up" size={16} color="black" />
                  ) : (
                    <AntDesign name="down" size={16} color="black" />
                  )}
                </TouchableOpacity>

                {expandedCategory === opt && (
                  <View style={styles.cardContent}>{renderRatingIcons(opt)}</View>
                )}
              </View>
            ))}
          </View>
        );

      case "text":
        return (
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
            placeholder={question.placeholder || `Enter ${question.label}`}
            placeholderTextColor="#666"
          />
        );

      case "textarea":
        return (
          <TextInput
            style={[styles.textInput, styles.textarea]}
            value={value}
            onChangeText={onChange}
            placeholder={question.placeholder || `Enter ${question.label}`}
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {question.label}
        {/* {question.required && <Text style={styles.required}> *</Text>} */}
      </Text>
      {renderQuestionInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  
  inputGroup: {
    marginBottom: height * 0.03,
  },
  label: {
    color: "#000",
    fontSize: width * 0.04,
    fontFamily: "Poppins_500Medium",
    marginBottom: height * 0.015,
  },
  required: {
    color: "#FF0000",
  },
  pickerContainer: {
    borderColor: "#00000026",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  picker: {
    height: 49,
    width: "100%",
    margin: 0,
    paddingVertical: 0,
    fontSize: width * 0.005,
    lineHeight: 45,
  },
  placeholderText: {
    fontSize: width * 0.005,
    color: "gray",
  },
  selectedText: {
    fontSize: width * 0.005,
    color: "black",
  },
  mcqContainer: {
    gap: height * 0.015,
  },
  mcqOptionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textOption: {
    fontSize: width * 0.04,
    color: "#000000",
    fontFamily: "Poppins_500Medium",
  },
  textInput: {
    borderColor: "#00000026",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    fontSize: width * 0.04,
    fontFamily: "Poppins_400Regular",
    elevation: 2,
  },
  textarea: {
    height: height * 0.12,
    textAlignVertical: "top",
  },
  // Rating
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    marginTop: height * 0.01,
  },
  ratingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: height * 0.01,
  },
});
