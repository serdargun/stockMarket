import {
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Header} from '../../../../components';
import {colors, pieChartColors} from '../../../../constants';
import {styles} from './AddStockModal.styles';
import {AddStockModalProps} from './AddStockModal.types';
import {useAtom} from 'jotai';
import {selectedPortfolioAtom} from '../../../../../App';
import {firestore} from '../../../../helpers';
import {useNavigation} from '@react-navigation/native';

export default function AddStockModal({
  visible,
  setVisible,
  selectedStock,
}: AddStockModalProps) {
  const [stockCount, setStockCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPortfolio] = useAtom(selectedPortfolioAtom);

  const navigation = useNavigation();

  const onAddPress = async () => {
    const color =
      pieChartColors[Math.round(Math.random() * pieChartColors.length)];
    const data = {
      code: selectedStock.code,
      lot: parseInt(stockCount, 10),
      cost: selectedStock.lastprice,
      color,
    };
    setLoading(true);
    try {
      await firestore.updateUserPortfolio(selectedPortfolio?.id, data);
    } catch (error) {
      Alert.alert('Oops daha sonra tekrar deneyiniz.');
    }
    setLoading(false);
    setVisible(false);
    navigation.navigate('Home');
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
            <Button
              label="Hisseyi Ekle"
              onPress={onAddPress}
              loading={loading}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
