import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const actions = [
  { label: 'Upload File', icon: 'document', action: 'pick_file' },
  { label: 'Camera', icon: 'camera', action: 'open_camera' },
  { label: 'Gallery', icon: 'image', action: 'open_gallery' },
  { label: 'Document', icon: 'folder', action: 'pick_document' },
];

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload</Text>
      <Text style={styles.description}>Choose how you want to add files to Telegram Drive.</Text>
      {actions.map((item) => (
        <TouchableOpacity key={item.label} style={styles.card}>
          <View style={styles.cardLeft}>
            <Ionicons name={item.icon} size={24} color="#4A90E2" />
            <Text style={styles.cardText}>{item.label}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: '#666',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
