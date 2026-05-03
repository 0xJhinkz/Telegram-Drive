import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockFiles = [
  { id: '1', name: 'Work', type: 'folder', size: '1.2 GB' },
  { id: '2', name: 'Movies', type: 'folder', size: '4.5 GB' },
  { id: '3', name: 'photo1.jpg', type: 'image', size: '3.4 MB' },
  { id: '4', name: 'document.pdf', type: 'document', size: '420 KB' },
];

export default function FilesScreen() {
  const [viewMode, setViewMode] = useState('list');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemLeft}>
        <Ionicons
          name={item.type === 'folder' ? 'folder' : item.type === 'image' ? 'image' : 'document-text'}
          size={26}
          color="#4A90E2"
        />
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>{item.size}</Text>
        </View>
      </View>
      <Ionicons name="ellipsis-vertical" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My Drive</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
            <Ionicons name={viewMode === 'list' ? 'albums' : 'list'} size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  list: {
    paddingBottom: 100,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemMeta: {
    color: '#888',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
