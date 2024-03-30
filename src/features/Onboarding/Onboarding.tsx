import {Image, SafeAreaView, View} from 'react-native';
import React from 'react';
import {Button, Spacer} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Onboarding.styles';
import {images} from '../../constants';

export default function Onboarding() {
  const navigation = useNavigation();

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={images.auth}
          style={styles.headingImage}
          resizeMode="contain"
        />
        <View>
          <Button label="Giriş yap" onPress={onSignInPress} />
          <Spacer size={15} />
          <Button label="Kaydol" onPress={onSignUpPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}
