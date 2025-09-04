import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.paragraph}>
          This is the privacy policy. We respect your privacy and are committed to protecting it.
        </Text>
        {/* Add more content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;
