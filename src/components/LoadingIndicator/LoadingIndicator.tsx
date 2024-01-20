import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../../constants';
import {styles} from './LoadingIndicator.styles';

export default function LoadingIndicator({fullPage}) {
  return (
    <View style={fullPage && styles.fullPageContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
