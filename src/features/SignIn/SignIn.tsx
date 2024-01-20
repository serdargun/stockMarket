import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {styles} from './SignIn.styles';
import {Button, Header, Input} from '../../components';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(result => {
        writeDefaultPortfolio(result.user.uid);
      });
  };

  const writeDefaultPortfolio = (userUid: string) => {
    const data = {
      list: [],
      userUid,
      name: 'Portföyüm',
    };
    firestore()
      .collection('portfolio')
      .add(data)
      .then(() => console.log('added'));
  };

  const onSignUpPress = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
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
      <Button label="Kaydol" onPress={onSignUpPress} />
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={onGoogleButtonPress}
        disabled={false}
      />
    </SafeAreaView>
  );
}
