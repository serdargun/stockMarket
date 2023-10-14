import {FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../../../../constants';
import {styles} from './StockList.styles';
import {StockItem} from './components';

export default function StockList({percentages}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={percentages}
        renderItem={({item, index}) => (
          <StockItem data={item} percentage={percentages[index].percent} />
        )}
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
