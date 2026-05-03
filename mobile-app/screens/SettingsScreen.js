import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { initTelegramClient, isConnected } from '../services/telegramService';

const sections = [
  {
    title: 'Account',
    items: ['Login', 'Logout'],
  },
  {
    title: 'Storage',
    items: ['Used space', 'Clear cache'],
  },
  {
    title: 'About',
    items: ['App version: 1.0.0'],
  },
];

export default function SettingsScreen() {
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    const client = await initTelegramClient();
    if (client) {
      setConnected(isConnected());
      Alert.alert('Telegram', 'Telegram integration initialized successfully.');
    } else {
      Alert.alert('Telegram', 'Telegram client not initialized. Check API credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <Text style={styles.connectText}>{connected ? 'Connected' : 'Connect Telegram'}</Text>
      </TouchableOpacity>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <TouchableOpacity key={item} style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  connectButton: {
    marginBottom: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  connectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFD',
    borderRadius: 12,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
