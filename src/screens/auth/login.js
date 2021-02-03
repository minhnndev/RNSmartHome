import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import InputValue from '../../components/InputValue';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.formInput}>
        <InputValue title="Username" icon="user" />
        <InputValue title="Password" icon="lock" isPassword />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={() => navigation.navigate('Home')} />
      </View>
    </>
  );
};

export default Login;

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
