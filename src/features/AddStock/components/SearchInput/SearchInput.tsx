import {View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../constants';
import {styles} from './SearchInput.styles';
import {SearchInputProps} from './SearchInput.types';

export default function SearchInput({value, setValue}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={24} color={colors.primary} />
      <TextInput
        placeholder="Aramak için bir şey yaz"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        autoFocus
      />
    </View>
  );
}
