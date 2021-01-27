import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';

const profile = () => {
  return (
    <View>
      <Header title="Profile" backBtn />
      <Text>His ae</Text>
      <Button title="Log Out" target="Auth" />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
