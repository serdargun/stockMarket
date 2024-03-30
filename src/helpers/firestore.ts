import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {PortfolioStock} from '../features/Home/Home.types';

const handleWriteDefaultPortfolio = async (userUid: string) => {
  const userPortfolios = await firestore()
    .collection('portfolio')
    .where('userUid', '==', userUid)
    .get();
  if (userPortfolios.size === 0) {
    writePortfolio(userUid, 'Portföyüm');
  }
};

const writePortfolio = async (userUid: string, portfolioName: string) => {
  const data = {
    list: [],
    userUid,
    name: portfolioName,
  };
  await firestore().collection('portfolio').add(data);
};

const getUserPortfolios = async () => {
  const userUid = auth().currentUser?.uid;
  const querySnapshot = await firestore()
    .collection('portfolio')
    .where('userUid', '==', userUid)
    .get();
  return querySnapshot;
};

const updateUserPortfolio = async (
  portfolioId: string,
  data: PortfolioStock,
) => {
  await firestore()
    .collection('portfolio')
    .doc(portfolioId)
    .update({
      list: firestore.FieldValue.arrayUnion(data),
    });
};

const removePortfolio = async (portfolioId: string) => {
  await firestore().collection('portfolio').doc(portfolioId).delete();
};

const getStockList = async () => {
  const querySnapshot = await firestore()
    .collection('stocks')
    .doc('stockList')
    .get();

  return querySnapshot.data()?.stockList;
};

export default {
  handleWriteDefaultPortfolio,
  writePortfolio,
  getUserPortfolios,
  updateUserPortfolio,
  removePortfolio,
  getStockList,
};
