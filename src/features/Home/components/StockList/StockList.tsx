import {FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../../../../constants';
import {styles} from './StockList.styles';
import {StockItem} from './components';
import {StockListProps} from './StockList.types';

export default function StockList({percentages}: StockListProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={percentages}
        renderItem={({item}) => <StockItem data={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addButton}
        onPress={() => navigation.navigate('AddStock')}>
        <Icon name={'plus'} size={36} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
