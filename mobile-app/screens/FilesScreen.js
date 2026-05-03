import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFiles } from "../services/telegramService";

export default function FilesScreen() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    // Fetch from "me" which acts as "Saved Messages" in Telegram
    const messages = await getFiles("me", 50);
    
    // Map Telegram messages to our file format
    const formattedFiles = messages
      .filter(m => m.media) // Only keep messages with files/media
      .map(m => {
        let name = "Unknown File";
        let type = "file";

        if (m.media.document) {
          const attr = m.media.document.attributes.find(a => a.className === "DocumentAttributeFilename");
          if (attr) name = attr.fileName;
          else name = "document_" + m.id;
          type = "document";
        } else if (m.media.photo) {
          name = "photo_" + m.id + ".jpg";
          type = "image";
        }

        return {
          id: String(m.id),
          name: name,
          type: type,
        };
      });

    setFiles(formattedFiles);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons
        name={item.type === "folder" ? "folder" : item.type === "image" ? "image" : "document"}
        size={24}
        color="#4A90E2"
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={{ marginTop: 10, color: "#666" }}>Loading Drive...</Text>
        </View>
      ) : files.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="folder-open-outline" size={50} color="#ccc" />
          <Text style={{ marginTop: 10, color: "#999" }}>No files found in Saved Messages</Text>
        </View>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={loadFiles}
        />
      )}
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" }
});