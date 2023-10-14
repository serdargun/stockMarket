import axios from 'axios';
import React, {useEffect} from 'react';
import {storage} from './src/helpers';
import Home from './src/features/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddStock from './src/features/AddStock';

function App(): JSX.Element {
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
    //const founded = stocks.find(stock => stock.code === 'FROTO');
    //console.log(founded);
    //getStocks();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddStock" component={AddStock} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
