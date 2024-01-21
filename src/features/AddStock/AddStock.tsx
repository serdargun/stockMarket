import {SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../../helpers';
import {AddStockModal, SearchInput, StockItem} from './components';
import {Header} from '../../components';
import {styles} from './AddStock.styles';

const stocks = JSON.parse(storage.getString('stocks'));

export default function AddStock() {
  const [searchVal, setSearchVal] = useState('');
  const [foundedStocks, setFoundedStocks] = useState([]);
  const [addStockVisible, setAddStockVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    if (searchVal.length > 0) {
      const filteredStocks = stocks.filter(stock =>
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

  const onItemPress = item => {
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
