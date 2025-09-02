import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  focused?: boolean;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Digite o nome do seu perfume...",
  focused = false 
}: SearchBarProps) {
  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Ionicons 
        name="search" 
        size={22} 
        color={focused ? "#667eea" : "#999"} 
        style={styles.icon} 
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Ionicons 
          name="close-circle" 
          size={20} 
          color="#999" 
          onPress={() => onChangeText('')}
          style={styles.clearIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  focused: {
    borderColor: '#667eea',
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.1,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  clearIcon: {
    marginLeft: 8,
  },
});