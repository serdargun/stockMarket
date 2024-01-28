import {View} from 'react-native';
import React from 'react';
import {SpacerProps} from './Spacer.types';

export default function Spacer({size, horizontal}: SpacerProps) {
  return <View style={horizontal ? {width: size} : {height: size}} />;
}
