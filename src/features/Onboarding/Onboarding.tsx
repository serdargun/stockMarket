import {SafeAreaView} from 'react-native';
import React from 'react';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function Onboarding() {
  const navigation = useNavigation();

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView>
      <Button label="Kaydol" onPress={onSignUpPress} />
      <Button label="Giriş yap" onPress={onSignInPress} />
    </SafeAreaView>
  );
}
