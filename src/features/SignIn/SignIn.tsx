import {SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {styles} from './SignIn.styles';
import {Button, Header, Input, Spacer} from '../../components';
import {auth} from '../../helpers';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    setLoading(true);
    await auth.signInWithEmailAndPassword(email, password);
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
        <Button label="Giriş yap" onPress={onSignInPress} loading={loading} />
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
