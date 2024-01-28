import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LoadingIndicator, PieChart} from '../../components';
import {PortfoliosModal, StockList} from './components';
import {useIsFocused} from '@react-navigation/native';
import {firestore, storage} from '../../helpers';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './Home.styles';
import {useAtom} from 'jotai';
import {selectedPortfolioAtom} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';

export default function Home() {
  const [portfolios, setPortfolios] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [selectedPortfolio, setSelectedPortfolio] = useAtom(
    selectedPortfolioAtom,
  );
  const [portfoliosVisible, setPortfoliosVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserPortfolios();
    }
  }, [isFocused]);

  const getUserPortfolios = async () => {
    const querySnapshot = await firestore.getUserPortfolios();
    setSelectedPortfolio({
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    });
    setPortfolios(querySnapshot.docs);
  };

  const getPercentages = () => {
    const stocks = JSON.parse(storage.getString('stocks'));
    const portfolioStocksWithPrice = selectedPortfolio?.list.map(
      (item: FirebaseFirestoreTypes.DocumentData) => {
        const stock = stocks.find(stock => stock.code === item.code);
        return {...item, price: stock.lastprice};
      },
    );
    const percentages = portfolioStocksWithPrice.map((item, index) => {
      const total = portfolioStocksWithPrice.reduce((acc, item) => {
        return acc + item.price * item.lot;
      }, 0);
      const percentage = ((item.price * item.lot) / total) * 100;
      return {percent: percentage, id: index, ...item};
    });

    return percentages.sort((a, b) => b.percent - a.percent);
  };

  return selectedPortfolio ? (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => setPortfoliosVisible(true)}
          activeOpacity={0.8}
          style={styles.heading}>
          <Text style={styles.portfolioName}>{selectedPortfolio.name}</Text>
          <Icon name={'chevron-down-outline'} size={18} color={colors.black} />
        </TouchableOpacity>
      </SafeAreaView>
      <PieChart percentages={getPercentages()} />
      <StockList percentages={getPercentages()} />
      <PortfoliosModal
        visible={portfoliosVisible}
        setVisible={setPortfoliosVisible}
      />
    </View>
  ) : (
    <LoadingIndicator fullPage />
  );
}
