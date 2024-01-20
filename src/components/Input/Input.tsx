import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {styles} from './Input.styles';

export default function Input({
  value,
  setValue,
  placeholder,
  keyboardType,
  secureTextEntry,
}) {
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
