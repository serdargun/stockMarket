import {
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Header} from '../../../../components';
import {colors, pieChartColors} from '../../../../constants';
import {styles} from './AddStockModal.styles';
import {AddStockModalProps} from './AddStockModal.types';
import firestore from '@react-native-firebase/firestore';

export default function AddStockModal({
  visible,
  setVisible,
  selectedStock,
}: AddStockModalProps) {
  const [stockCount, setStockCount] = useState('');

  const onAddPress = () => {
    const color =
      pieChartColors[Math.round(Math.random() * pieChartColors.length)];
    const data = {
      code: selectedStock.code,
      lot: parseInt(stockCount, 10),
      cost: selectedStock.lastprice,
      color,
    };
    firestore()
      .collection('portfolio')
      .doc('zYPpvqRw6Q5b7JnO1IHy')
      .update({
        list: firestore.FieldValue.arrayUnion(data),
      })
      .then(() => console.log('updated'));
    setVisible(false);
  };

  return (
    <Modal visible={visible}>
      <KeyboardAvoidingView behavior="height" style={styles.keyboardContainer}>
        <SafeAreaView style={styles.container}>
          <Header type={'modal'} setVisible={setVisible} />
          <View style={styles.container}>
            <View>
              <Text style={styles.stockCodeText}>{selectedStock.code}</Text>
              <Text style={styles.stockPriceText}>
                {selectedStock.lastprice.toFixed(2)}₺
              </Text>
            </View>
            <View>
              <TextInput
                value={stockCount}
                onChangeText={setStockCount}
                placeholder="0"
                placeholderTextColor={colors.quaternary}
                style={styles.stockInput}
                autoFocus
              />
              <Text style={styles.stockUnitText}>lot</Text>
            </View>
            <Button label="Hisseyi Ekle" onPress={onAddPress} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
