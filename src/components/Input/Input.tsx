import {View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {styles} from './Input.styles';
import {InputProps} from './Input.types';

export default function Input({
  value,
  setValue,
  placeholder,
  keyboardType,
  secureTextEntry,
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
