import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {styles} from './StockItem.styles';
import {StockItemProps} from './StockItem.types';

export default function StockItem({data, onItemPress}: StockItemProps) {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={onItemPress}
        activeOpacity={0.8}
        style={styles.container}>
        <Text style={styles.stockCodeText}>{data.code}</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </Fragment>
  );
}
