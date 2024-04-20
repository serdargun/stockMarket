import React, {Fragment, useEffect, useState} from 'react';
import {firestore, storage} from './src/helpers';
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
  StockDetail,
} from './src/features';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
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
  const [authenticatedUser, setAuthenticatedUser] =
    useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setAuthenticatedUser(user);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    const getStockList = async () => {
      const stockList = await firestore.getStockList();
      storage.set('stocks', JSON.stringify(stockList));
    };
    getStockList();
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

  const getIconName = (route: string) => {
    if (route === 'Home') {
      return 'home';
    } else if (route === 'Profile') {
      return 'user';
    }
    return '';
  };

  const renderTabBarIcon = (route: string, focused: boolean) => {
    return (
      <Icon
        name={getIconName(route)}
        size={20}
        color={focused ? colors.primary : colors.grey}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => renderTabBarIcon(route.name, focused),
        tabBarActiveTintColor: colors.primary,
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
      <Stack.Screen name="StockDetail" component={StockDetail} />
    </Stack.Navigator>
  );
};
