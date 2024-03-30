import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from './firestore';

const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  auth()
    .signInWithCredential(googleCredential)
    .then(result => {
      firestore.handleWriteDefaultPortfolio(result.user.uid);
    });
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
  }
};

const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    firestore.handleWriteDefaultPortfolio(user.uid);
  } catch (error) {
    throw error;
  }
};

const getUserId = () => {
  return auth().currentUser?.uid;
};

export default {
  signInWithGoogle,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  getUserId,
};
