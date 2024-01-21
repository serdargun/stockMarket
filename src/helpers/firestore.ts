import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const handleWriteDefaultPortfolio = async (userUid: string) => {
  const userPortfolios = await firestore()
    .collection('portfolio')
    .where('userUid', '==', userUid)
    .get();
  if (userPortfolios.size === 0) {
    writeDefaultPortfolio(userUid);
  }
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

const getUserPortfolios = async () => {
  const userUid = auth().currentUser?.uid;
  const querySnapshot = await firestore()
    .collection('portfolio')
    .where('userUid', '==', userUid)
    .get();
  return querySnapshot;
};

export default {handleWriteDefaultPortfolio, getUserPortfolios};
