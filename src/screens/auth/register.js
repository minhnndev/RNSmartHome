import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {InputValue, Button} from '../../components';
import {COLORS} from '../../utils/theme';

const register = () => {
  return (
    <>
      <View style={styles.formInput}>
        <InputValue title="Username" icon="user" />
        <InputValue title="Password" icon="lock" isPassword />
        <InputValue title="Confirm Password" icon="lock" isPassword />
      </View>
      <View style={styles.button}>
        <Button title="Register" target="Home" style={styles.btn} />
      </View>
    </>
  );
};

export default register;

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
  btn: {
    marginTop: 30,
    width: 200,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
