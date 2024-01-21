import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Button.styles';
import {ButtonProps} from './Button.types';

export default function Button({label, onPress, loading}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
