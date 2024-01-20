import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Button} from '../../components';
import auth from '@react-native-firebase/auth';

export default function Profile() {
  const userEmail = auth().currentUser?.email;
  return (
    <SafeAreaView>
      <Text>{userEmail}</Text>
      <Button
        label="Sign out"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('signed out'))
        }
      />
    </SafeAreaView>
  );
}
