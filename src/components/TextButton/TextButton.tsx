import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './TextButton.styles';
import LoadingIndicator from '../LoadingIndicator';
import {TextButtonProps} from './TextButton.types';

export default function TextButton({
  label,
  onPress,
  color,
  loading,
}: TextButtonProps) {
  return (
    <View style={styles.container}>
      {!loading ? (
        <Text style={[styles.text, {color}]} onPress={onPress}>
          {label}
        </Text>
      ) : (
        <LoadingIndicator size={'small'} />
      )}
    </View>
  );
}
