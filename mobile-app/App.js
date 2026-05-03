// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FilesScreen from "./screens/FilesScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UploadScreen from "./screens/UploadScreen";
import AuthScreen from "./screens/AuthScreen";
import { restoreSession } from "./services/telegramService";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("Files");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    restoreSession()
      .then(user => { if (user) setIsAuthenticated(true); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fa" }}>
        <Text style={{ color: "#4A90E2", fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }


  const renderScreen = () => {
    switch (activeScreen) {
      case "Files":
        return <FilesScreen />;
      case "Upload":
        return <UploadScreen />;
      case "Search":
        return <SearchScreen />;
      case "Settings":
        return <SettingsScreen />;
      default:
        return <FilesScreen />;
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Drive</Text>
        <Ionicons name="search" size={24} color="#000" />
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Floating Upload Button (Only on Files Screen) */}
      {activeScreen === "Files" && (
        <TouchableOpacity style={styles.fab} onPress={() => setActiveScreen("Upload")}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.nav}>
        <NavItem 
          icon="folder" 
          label="Files" 
          isActive={activeScreen === "Files"}
          onPress={() => setActiveScreen("Files")} 
        />
        <NavItem 
          icon="cloud-upload" 
          label="Upload" 
          isActive={activeScreen === "Upload"}
          onPress={() => setActiveScreen("Upload")} 
        />
        <NavItem 
          icon="search" 
          label="Search" 
          isActive={activeScreen === "Search"}
          onPress={() => setActiveScreen("Search")} 
        />
        <NavItem 
          icon="settings" 
          label="Settings" 
          isActive={activeScreen === "Settings"}
          onPress={() => setActiveScreen("Settings")} 
        />
      </View>
    </SafeAreaView>
  );
}

const NavItem = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color={isActive ? "#4A90E2" : "#888"} />
    <Text style={[styles.navText, { color: isActive ? "#4A90E2" : "#888", fontWeight: isActive ? "bold" : "normal" }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },

  content: {
    flex: 1,
  },

  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#4A90E2",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  navItem: {
    alignItems: "center",
    flex: 1,
  },

  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});