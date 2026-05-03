import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mockFiles = [
  { id: "1", name: "Work Folder", type: "folder" },
  { id: "2", name: "Movies", type: "folder" },
  { id: "3", name: "photo.jpg", type: "file" },
  { id: "4", name: "document.pdf", type: "file" },
];

export default function FilesScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons
        name={item.type === "folder" ? "folder" : "document"}
        size={24}
        color="#4A90E2"
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  text: { marginLeft: 10, fontSize: 16 },
});