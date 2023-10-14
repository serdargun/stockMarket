import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Button.styles';
import {ButtonProps} from './Button.types';

export default function Button({label, onPress}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
