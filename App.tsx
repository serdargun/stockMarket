import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {storage} from './src/helpers';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddStock,
  Home,
  Onboarding,
  Profile,
  SignIn,
  SignUp,
} from './src/features';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoadingIndicator} from './src/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from './src/constants';
import {Provider, atom} from 'jotai';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '777834468989-21hjes32jevmjre4to3nb92tpmb2ioj9.apps.googleusercontent.com',
});

export const selectedPortfolioAtom =
  atom<FirebaseFirestoreTypes.DocumentData | null>(null);

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  function onAuthStateChanged(user) {
    setAuthenticatedUser(user);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

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
    //const stocks = JSON.parse(storage.getString('stocks'));
    //console.log(JSON.stringify(stocks, null, 2));
    //const founded = stocks.find(stock => stock.code === 'FROTO');
    //console.log(founded);
    //getStocks();
  }, []);

  const Stack = createNativeStackNavigator();

  return !loading ? (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!authenticatedUser ? (
            <Fragment>
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Fragment>
          ) : (
            <Stack.Screen name="app" component={AppStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <LoadingIndicator fullPage />
  );
}

export default App;

const TabStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="AddStock" component={AddStock} />
    </Stack.Navigator>
  );
};
