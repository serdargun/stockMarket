import {Alert, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Button, Header, Input, Spacer} from '../../components';
import {styles} from './SignUp.styles';
import {auth} from '../../helpers';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    setLoading(true);
    try {
      await auth.signUpWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Hata', 'Bu email adresi zaten kullanımda!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Hata', 'Geçersiz email adresi!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Hata', 'Şifre yeterince güçlü değil!');
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert('Hata', 'Bu email/şifre kullanılamaz!');
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Input
          value={email}
          setValue={setEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Spacer size={15} />
        <Input
          value={password}
          setValue={setPassword}
          placeholder={'Şifre'}
          secureTextEntry
        />
        <Spacer size={15} />
        <Button label="Kaydol" onPress={onSignUpPress} loading={loading} />
        <Spacer size={15} />
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={auth.signInWithGoogle}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
