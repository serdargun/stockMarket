import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PieChart} from '../../components';
import {StockList} from './components';
import {useIsFocused} from '@react-navigation/native';
import {storage} from '../../helpers';

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);

  const isFocused = useIsFocused();

  const getPercentages = () => {
    const stocks = JSON.parse(storage.getString('stocks'));
    const portfolioStocksWithPrice = portfolio.map(item => {
      const stock = stocks.find(stock => stock.code === item.code);
      return {...item, price: stock.lastprice};
    });
    const percentages = portfolioStocksWithPrice.map((item, index) => {
      const total = portfolioStocksWithPrice.reduce((acc, item) => {
        return acc + item.price * item.lot;
      }, 0);
      const percentage = ((item.price * item.lot) / total) * 100;
      return {percent: percentage, id: index, ...item};
    });

    return percentages.sort((a, b) => b.percent - a.percent);
  };

  useEffect(() => {
    if (isFocused) {
      const data = JSON.parse(storage.getString('portfolio') || '[]');
      setPortfolio(data);
    }
  }, [isFocused]);

  console.log(getPercentages());

  return (
    <View style={{flex: 1}}>
      <PieChart percentages={getPercentages()} />
      <StockList percentages={getPercentages()} />
    </View>
  );
}
