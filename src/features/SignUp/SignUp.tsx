import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {Button, Header, Input} from '../../components';
import {styles} from './SignUp.styles';
import {auth} from '../../helpers';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    setLoading(true);
    await auth.signUpWithEmailAndPassword(email, password);
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <Header />
      <Input
        value={email}
        setValue={setEmail}
        placeholder={'Email'}
        keyboardType={'email-address'}
      />
      <Input
        value={password}
        setValue={setPassword}
        placeholder={'Şifre'}
        secureTextEntry
      />
      <Button label="Kaydol" onPress={onSignUpPress} loading={loading} />
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={auth.signInWithGoogle}
        disabled={false}
      />
    </SafeAreaView>
  );
}
