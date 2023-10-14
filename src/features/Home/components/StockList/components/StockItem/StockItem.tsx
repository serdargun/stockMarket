import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../../../../../constants';

export default function StockItem({data, percentage}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.tertiary,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: data.color,
            borderRadius: 20,
            marginRight: 10,
          }}
        />
        <Text style={{fontWeight: '500'}}>{data.code}</Text>
      </View>
      <Text style={{fontSize: 18, fontWeight: '600'}}>
        {percentage.toFixed(1)}%
      </Text>
    </View>
  );
}
