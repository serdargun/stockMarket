import {SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AddStockModal, SearchInput, StockItem} from './components';
import {Header} from '../../components';
import {styles} from './AddStock.styles';
import {useMMKVString} from 'react-native-mmkv';
import {LiveStock} from '../Home/Home.types';

export default function AddStock() {
  const [searchVal, setSearchVal] = useState('');
  const [foundedStocks, setFoundedStocks] = useState([]);
  const [addStockVisible, setAddStockVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState<LiveStock | null>(null);
  const [stocks = '[]', setStocks] = useMMKVString('stocks');

  useEffect(() => {
    if (searchVal.length > 0) {
      const liveStocks = JSON.parse(stocks);
      const filteredStocks = liveStocks.filter((stock: LiveStock) =>
        stock.code.includes(searchVal.toUpperCase()),
      );
      setFoundedStocks(filteredStocks);
    } else {
      setFoundedStocks([]);
    }
  }, [searchVal]);

  useEffect(() => {
    if (selectedStock) {
      setAddStockVisible(true);
    }
  }, [selectedStock]);

  const onItemPress = (item: LiveStock) => {
    setSelectedStock(item);
  };

  const hasSelectedStock = !!selectedStock;

  return (
    <SafeAreaView style={styles.container}>
      <Header type="screen" />
      <SearchInput value={searchVal} setValue={setSearchVal} />
      <FlatList
        data={foundedStocks}
        renderItem={({item}) => (
          <StockItem data={item} onItemPress={() => onItemPress(item)} />
        )}
      />
      {hasSelectedStock && (
        <AddStockModal
          visible={addStockVisible}
          setVisible={setAddStockVisible}
          selectedStock={selectedStock}
        />
      )}
    </SafeAreaView>
  );
}
