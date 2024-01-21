import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {StockType} from '../features/AddStock/components/AddStockModal/AddStockModal.types';

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

const updateUserPortfolio = async (portfolioId: string, data: StockType) => {
  await firestore()
    .collection('portfolio')
    .doc(portfolioId)
    .update({
      list: firestore.FieldValue.arrayUnion(data),
    });
};

export default {
  handleWriteDefaultPortfolio,
  getUserPortfolios,
  updateUserPortfolio,
};
