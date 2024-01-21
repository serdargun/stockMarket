import {SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LoadingIndicator, PieChart} from '../../components';
import {StockList} from './components';
import {useIsFocused} from '@react-navigation/native';
import {firestore, storage} from '../../helpers';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './Home.styles';

export default function Home() {
  const [portfolios, setPortfolios] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<FirebaseFirestoreTypes.DocumentData | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserPortfolios();
    }
  }, [isFocused]);

  const getUserPortfolios = async () => {
    const querySnapshot = await firestore.getUserPortfolios();
    setSelectedPortfolio(querySnapshot.docs[0].data());
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
        <Text style={styles.portfolioName}>{selectedPortfolio.name}</Text>
      </SafeAreaView>
      <PieChart percentages={getPercentages()} />
      <StockList percentages={getPercentages()} />
    </View>
  ) : (
    <LoadingIndicator fullPage />
  );
}
