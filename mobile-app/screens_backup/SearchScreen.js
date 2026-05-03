import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search files..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Text style={styles.text}>Searching: {query}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
  },
  text: { marginTop: 20 },
});