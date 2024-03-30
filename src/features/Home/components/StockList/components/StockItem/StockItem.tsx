import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './StockItem.styles';
import {useNavigation} from '@react-navigation/native';
import {StockItemProps} from './StockItem.types';

export default function StockItem({data}: StockItemProps) {
  const navigation = useNavigation();

  const onItemPress = () => {
    navigation.navigate('StockDetail');
  };

  const getStockIncome = () => {
    const income = (data.price - data.cost) * data.lot;
    return income.toFixed(2);
  };

  const getStockIncomePercentage = () => {
    const percentage = ((data.price - data.cost) / data.cost) * 100;
    //console.log(data.price, data.cost);
    return percentage.toFixed(2);
  };

  const isNegative = data.price - data.cost < 0;
  const isEqual = data.price - data.cost === 0;

  return (
    <TouchableOpacity onPress={onItemPress} style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={[styles.coloredBullet, {backgroundColor: data.color}]} />
        <View>
          <Text style={styles.stockCode}>{data.code}</Text>
          <Text style={styles.currentPrice}>{data.price}₺</Text>
        </View>
      </View>
      <Text
        style={[
          styles.rightColumnInfoText,
          isNegative && styles.negativeTextStyle,
          isEqual && styles.equalTextStyle,
        ]}>
        {getStockIncome()}₺(%{getStockIncomePercentage()})
      </Text>
    </TouchableOpacity>
  );
}
