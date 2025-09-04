// src/components/NotificationsScreen.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Notification {
  id: string;
  text: string;
}

interface Props {
  onBack: () => void;
}

const NotificationsScreen: React.FC<Props> = ({ onBack }) => {
  const notifications: Notification[] = [
    // { id: "1", text: "Notification about and description follows." },
    // { id: "2", text: "Notification about and description follows." },
    // { id: "3", text: "Notification about and description follows." },
    // { id: "4", text: "Notification about and description follows." },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <View style={styles.iconPlaceholder} />
            <Text style={styles.notificationText}>{item.text}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 16,
  },
});

export default NotificationsScreen;
