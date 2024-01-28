import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../../constants';
import {styles} from './LoadingIndicator.styles';
import {LoadingIndicatorProps} from './LoadingIndicator.types';

export default function LoadingIndicator({
  fullPage,
  size = 'small',
}: LoadingIndicatorProps) {
  return (
    <View style={fullPage && styles.fullPageContainer}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}
