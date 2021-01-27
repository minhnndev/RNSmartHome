import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import InputValue from '../../components/InputValue';
import Button from '../../components/Button';

const login = () => {
  return (
    <>
      <View style={styles.formInput}>
        <InputValue title="Username" icon="user" />
        <InputValue title="Password" icon="lock" isPassword />
      </View>
      <View style={styles.button}>
        <Button title="Login" target="Home" />
      </View>
    </>
  );
};

export default login;

const styles = StyleSheet.create({
  formInput: {
    marginHorizontal: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRegis: {
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
