import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilesScreen from './screens/FilesScreen';
import UploadScreen from './screens/UploadScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';

const tabs = [
  { key: 'files', label: 'Files', icon: 'folder' },
  { key: 'upload', label: 'Upload', icon: 'cloud-upload' },
  { key: 'search', label: 'Search', icon: 'search' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('files');

  const renderScreen = () => {
    switch (activeTab) {
      case 'upload':
        return <UploadScreen />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <FilesScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.title}>Telegram Drive</Text>
        <Ionicons name="search" size={24} color="#4A90E2" />
      </View>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.navbar}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const TabButton = ({ icon, label, active, onPress }) => (
  <View style={styles.tabItem}>
    <Ionicons
      name={icon}
      size={24}
      color={active ? '#4A90E2' : '#888'}
      onPress={onPress}
    />
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#4A90E2',
  },
});
