import {Text, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import {TextButton} from '../../components';
import auth from '@react-native-firebase/auth';
import {colors} from '../../constants';

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const userEmail = auth().currentUser?.email;

  const onRemovePress = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => setLoading(false));
  };

  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 20}}>
        <Text>{userEmail}</Text>
        <TextButton
          label={'Hesaptan çık'}
          onPress={onRemovePress}
          color={colors.error}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
