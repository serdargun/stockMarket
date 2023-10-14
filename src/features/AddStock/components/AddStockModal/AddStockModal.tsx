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
import {storage} from '../../../../helpers';

export default function AddStockModal({
  visible,
  setVisible,
  selectedStock,
}: AddStockModalProps) {
  const [stockCount, setStockCount] = useState('');

  const onAddPress = () => {
    const portfolio = JSON.parse(storage.getString('portfolio') || '[]');
    const color = pieChartColors[portfolio.length];
    const data = {
      code: selectedStock.code,
      lot: parseInt(stockCount, 10),
      color,
    };
    storage.set('portfolio', JSON.stringify([...portfolio, data]));
    setVisible(false);
  };

  return (
    <Modal visible={visible}>
      <KeyboardAvoidingView behavior="height" style={styles.keyboardContainer}>
        <SafeAreaView style={styles.container}>
          <Header type={'modal'} setVisible={setVisible} />
          <Text style={styles.stockCodeText}>{selectedStock.code}</Text>
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
