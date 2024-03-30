import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LoadingIndicator, PieChart} from '../../components';
import {PortfoliosModal, StockList} from './components';
import {useIsFocused} from '@react-navigation/native';
import {common, firestore} from '../../helpers';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './Home.styles';
import {useAtom} from 'jotai';
import {selectedPortfolioAtom} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';
import {useMMKVString} from 'react-native-mmkv';
import {
  LiveStock,
  PortfolioStockWithPrice,
  PortfolioStockWithPriceAndPercent,
} from './Home.types';

export default function Home() {
  const [portfolios, setPortfolios] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [selectedPortfolio, setSelectedPortfolio] = useAtom(
    selectedPortfolioAtom,
  );
  const [portfoliosVisible, setPortfoliosVisible] = useState(false);
  const [stocks = '[]', setStocks] = useMMKVString('stocks');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserPortfolios = async () => {
      const querySnapshot = await firestore.getUserPortfolios();
      setSelectedPortfolio({
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      });
      setPortfolios(querySnapshot.docs);
    };

    if (isFocused) {
      getUserPortfolios();
    }
  }, [isFocused]);

  const getPercentages = () => {
    const liveStocks = JSON.parse(stocks);
    const portfolioStocksWithPrice = selectedPortfolio?.list.map(
      (item: FirebaseFirestoreTypes.DocumentData) => {
        const stock = liveStocks.find(
          (liveStock: LiveStock) => liveStock.code === item.code,
        );
        return {
          ...item,
          price: common.convertFormattedCurrencyToBare(stock.price),
        };
      },
    );
    const percentages = portfolioStocksWithPrice.map(
      (stock: PortfolioStockWithPrice, index: number) => {
        const total = portfolioStocksWithPrice.reduce(
          (acc: number, item: PortfolioStockWithPrice) => {
            return acc + item.price * item.lot;
          },
          0,
        );
        const percentage = ((stock.price * stock.lot) / total) * 100;
        return {percent: percentage, id: index, ...stock};
      },
    );

    return percentages.sort(
      (
        a: PortfolioStockWithPriceAndPercent,
        b: PortfolioStockWithPriceAndPercent,
      ) => b.percent - a.percent,
    );
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
