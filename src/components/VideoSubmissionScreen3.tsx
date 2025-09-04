import React, { useState, forwardRef, useImperativeHandle } from "react";
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { Text } from "../../global" 
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface VideoSubmissionScreen3Props {
  onContinue: (data: any) => void;
  onBack: () => void;
}

type Category =
  | 'soundQuality'
  | 'bassPerformance'
  | 'clarity'
  | 'comfort'
  | 'batteryLife'
  | 'buildQuality'
  | 'design';

const VideoSubmissionScreen3 = forwardRef(({ onContinue, onBack }: VideoSubmissionScreen3Props, ref) => {
  const [ratings, setRatings] = useState<Record<Category, number>>({
    soundQuality: 0,
    bassPerformance: 0,
    clarity: 0,
    comfort: 0,
    batteryLife: 0,
    buildQuality: 0,
    design: 0,
  });

  const [expandedCategory, setExpandedCategory] = useState<Category | null>('soundQuality');

  useImperativeHandle(ref, () => ({
    handleContinue: () => {
      const allRated = Object.values(ratings).every(rating => rating > 0);
      if (!allRated) {
        Alert.alert('Error', 'Please rate all categories to continue.');
        return;
      }
      onContinue(ratings);
    }
  }));

  const handleRatingChange = (category: Category, value: number) => {
    setRatings({ ...ratings, [category]: value });
  };

  const toggleCategory = (category: Category) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderRatingIcons = (category: Category) => {
    const icons = [];
    for (let i = 1; i <= 10; i++) {
      icons.push(
        <TouchableOpacity key={i} onPress={() => handleRatingChange(category, i)}  style={{ marginRight: 3 }}>
        <Ionicons
          name={i <= ratings[category] ? "star" : "star-outline"}
          size={24}
          color={i <= ratings[category] ? "#2C5FDD" : "#989898"}
        />
      </TouchableOpacity>
      );
    }
    return <View style={styles.ratingRow}>{icons}</View>;
  };

  const renderCategory = (title: string, category: Category) => (
    <View style={styles.card} key={category}> 
      <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.cardHeader}>
        <Text style={styles.text3}>{title}</Text>
        <Text style={{ fontSize: width * 0.05, color: "#666" }}>
          {expandedCategory === category ? <AntDesign name="up" size={16} color="black" /> : <AntDesign name="down" size={16} color="black" />}
        </Text>
      </TouchableOpacity>

      {expandedCategory === category && (
        <View style={styles.cardContent}>
          {renderRatingIcons(category)}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
          
            <Text style={styles.text2}>
              Rate the following{"\n"}on a scale of 1-10
            </Text>
          </View>

          {renderCategory("Sound quality", "soundQuality")}
          {renderCategory("Bass performance", "bassPerformance")}
          {renderCategory("Clarity/mic performance", "clarity")}
          {renderCategory("Comfort", "comfort")}
          {renderCategory("Battery life", "batteryLife")}
          {renderCategory("Build quality", "buildQuality")}
          {renderCategory("Design & Style", "design")}
        </View>
      </ScrollView>
    </View>
  );
});

export default VideoSubmissionScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  box: {
    width: width * 0.7,
    height: height * 0.01,
    backgroundColor: "#2C5FDD",
    borderRadius: 100,
  },
  ratingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: height * 0.01,
  },
  column: {
    backgroundColor: "#FFFFFF",
  },
  column2: {
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.04,
    paddingBottom: height * 0.02,
    marginBottom: height * 0.01,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: width * 0.04,
    marginHorizontal: width * 0.08,
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    marginTop: height * 0.005,
  },
  image: {
    width: width * 0.07,
    height: height * 0.035,
    marginRight: width * 0.035,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.05,
    marginLeft: width * 0.08,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
  },
  text2: {
    color: "#000000",
    fontSize: width * 0.08,
    fontFamily: 'Poppins_700Bold',
    marginLeft: width * 0.09,
    width: width * 0.8,
  },
  text3: {
    color: "#000000",
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
  },
  text10: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
  },
  view: {
    backgroundColor: "#DAE5FF",
    borderRadius: 100,
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.09,
  },
  view2: {
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
  },
  view3: {
    alignItems: "center",
    backgroundColor: "#2C5FDD",
    borderRadius: 10,
    paddingVertical: height * 0.018,
    marginHorizontal: width * 0.08,
    shadowColor: "#00000033",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
  },
});
