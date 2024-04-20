import {Text, Modal, SafeAreaView, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Header,
  Input,
  LoadingIndicator,
  Spacer,
  TextButton,
} from '../../../../components';
import {styles} from './PortfoliosModal.styles';
import {
  AddPortfolioProps,
  PortfolioItemProps,
  PortfoliosModalProps,
} from './PortfoliosModal.types';
import {auth, firestore, storage} from '../../../../helpers';
import {colors} from '../../../../constants';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useAtom} from 'jotai';
import {selectedPortfolioAtom} from '../../../../../App';

export default function PortfoliosModal({
  visible,
  setVisible,
}: PortfoliosModalProps) {
  const [portfolios, setPortfolios] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    if (visible) {
      getUserPortfolios();
    }
  }, [visible]);

  const getUserPortfolios = async () => {
    const querySnapshot = await firestore.getUserPortfolios();
    setPortfolios(querySnapshot.docs);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Header type={'modal'} setVisible={setVisible} />
        {portfolios.length === 0 ? (
          <LoadingIndicator fullPage />
        ) : (
          <View style={styles.container}>
            <FlatList
              data={portfolios}
              renderItem={({item}) => (
                <PortfolioItem
                  portfolio={item}
                  setVisible={setVisible}
                  getUserPortfolios={getUserPortfolios}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={
                <AddPortfolio getUserPortfolios={getUserPortfolios} />
              }
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const PortfolioItem = ({
  portfolio,
  setVisible,
  getUserPortfolios,
}: PortfolioItemProps) => {
  const [loading, setLoading] = useState(false);
  const [_, setSelectedPortfolio] = useAtom(selectedPortfolioAtom);

  const onSelectPress = () => {
    setSelectedPortfolio({
      id: portfolio.id,
      ...portfolio.data(),
    });
    storage.set('selectedPortfolioId', portfolio.id);
    setVisible(false);
  };

  const onRemovePress = async () => {
    setLoading(true);
    await firestore.removePortfolio(portfolio.id);
    getUserPortfolios();
    setLoading(false);
  };

  return (
    <View style={styles.portfolioItem}>
      <Text style={styles.portfolioName}>{portfolio.data().name}</Text>
      <View style={styles.optionsContainer}>
        <TextButton
          label={'Seç'}
          onPress={onSelectPress}
          color={colors.secondary}
        />
        <Spacer size={10} horizontal />
        <TextButton
          label={'Kaldır'}
          onPress={onRemovePress}
          color={colors.error}
          loading={loading}
        />
      </View>
    </View>
  );
};

const AddPortfolio = ({getUserPortfolios}: AddPortfolioProps) => {
  const [portfolioName, setPortfolioName] = useState('');
  const [loading, setLoading] = useState(false);

  const onAddPress = async () => {
    setLoading(true);
    const userUid = auth.getUserId();
    if (portfolioName && userUid) {
      await firestore.writePortfolio(userUid, portfolioName);
      getUserPortfolios();
    }
    setLoading(false);
  };

  return (
    <View style={styles.addPortfolioContainer}>
      <Input
        placeholder={'Portföy Adı'}
        value={portfolioName}
        setValue={setPortfolioName}
      />
      <Spacer size={10} horizontal />
      <TextButton
        label={'Ekle'}
        onPress={onAddPress}
        color={colors.primary}
        loading={loading}
      />
    </View>
  );
};
