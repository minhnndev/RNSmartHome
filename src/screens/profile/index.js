import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../../components/Header';
import Button from '../../components/Button';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title="Profile" backBtn />
      <Text>His ae</Text>
      <Button title="Log Out" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
