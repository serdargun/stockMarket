import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Header.styles';
import {HeaderProps} from './Header.types';

export default function Header({type = 'screen', setVisible}: HeaderProps) {
  const navigation = useNavigation();

  const leftButtonIcon = type === 'modal' ? 'close' : 'chevron-back';
  const leftButtonLabel = type === 'modal' ? 'Kapat' : 'Geri';

  const onLeftButtonPress = () => {
    if (type === 'modal') {
      setVisible!(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onLeftButtonPress}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        style={styles.leftButton}>
        <Icon name={leftButtonIcon} size={24} color={colors.primary} />
        <Text style={styles.leftButtonLabel}>{leftButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
