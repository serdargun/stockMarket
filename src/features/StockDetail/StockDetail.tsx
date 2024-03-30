import {Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import {styles} from './StockDetail.styles';
import {InfoBoxProps} from './StockDetail.types';
import {Header} from '../../components';

export default function StockDetail() {
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.row}>
        <InfoBox label="Portföy dağılımı" value="%19.2" />
        <InfoBox label="Toplam değer" value="9.338.60₺" />
      </View>
      <View style={styles.row}>
        <InfoBox label="Ort. maliyet" value="142.3₺" />
        <InfoBox label="Top. maliyet" value="16.500.00₺" />
      </View>
      <View style={styles.row}>
        <InfoBox label="Adet" value="108" />
        <InfoBox label="Günlük getiri" value="4₺(%3.7)" positive />
      </View>
      <View style={styles.row}>
        <InfoBox label="Toplam getiri" value="883₺(%34)" positive />
      </View>
    </SafeAreaView>
  );
}

const InfoBox = ({label, value, positive}: InfoBoxProps) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoBoxTitle}>{label}</Text>
      <Text style={[styles.infoBoxValue, positive && styles.positiveValue]}>
        {value}
      </Text>
    </View>
  );
};
