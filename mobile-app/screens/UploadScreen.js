import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Files</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pick File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
});