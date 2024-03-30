import {View} from 'react-native';
import React, {useState} from 'react';
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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}
