import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import InputValue from '../../components/InputValue';
import TextGradient from '../../components/TextGradient';
import Button from '../../components/Button';

const ButtonIcon = ({nameIcon, color}) => {
  return (
    <View style={[styles.bottomIcon, {borderColor: color}]}>
      <AntDesign name={nameIcon} size={30} color={color} />
    </View>
  );
};

const auth = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>SmartHome</TextGradient>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.tinyLogo}
        />
      </View>
      <View style={styles.formInput}>
        <InputValue title="Username" icon="user" />
        <InputValue title="Password" icon="lock" isPassword />
      </View>
      <View style={styles.button}>
        <Button title="Login" target="Home" />
        <TouchableOpacity style={styles.btnRegis}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>OR LOGIN WITH</Text>
        <View style={styles.listButtonAccount}>
          <ButtonIcon nameIcon="twitter" color="#1DA1F2" />
          <ButtonIcon nameIcon="google" color="#DB4437" />
          <ButtonIcon nameIcon="facebook-square" color="#4267B2" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 80,
    height: 70,
    marginHorizontal: 160,
  },
  txtLogo: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    padding: 25,
  },
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
  bottomIcon: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listButtonAccount: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  footer: {
    paddingTop: 50,
    paddingVertical: 5,
  },
  footerText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
    textAlign: 'center',
  },
});
