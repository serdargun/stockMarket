import axios from 'axios';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {storage} from './src/helpers';

function App(): JSX.Element {
  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const getStocks = async () => {
      const collectApi = axios.create({
        baseURL: 'https://api.collectapi.com/economy',
        headers: {
          Authorization: 'apikey 0LL5TLxf2M8TlBFcCF7nae:6weRak1s9r8LJBexJx0054',
          'Content-Type': 'application/json',
        },
      });

      collectApi.get('/hisseSenedi').then(response => {
        console.log(response.data.result);
        storage.set('stocks', JSON.stringify(response.data.result));
      });
    };
    const stocks = JSON.parse(storage.getString('stocks'));
    //console.log(JSON.stringify(stocks, null, 2));
    const founded = stocks.find(stock => stock.code === 'FROTO');
    console.log(founded);
    //getStocks();
  }, []);

  return (
    <SafeAreaView>
      <PieChart
        data={data}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 50]}
        absolute
      />
    </SafeAreaView>
  );
}

export default App;
