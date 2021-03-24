import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {TextGradient, InputValue, Button} from '../../components';

import {COLORS} from '../../utils/theme';

const ButtonIcon = ({nameIcon, color}) => {
  return (
    <View style={[styles.bottomIcon, {borderColor: color}]}>
      <AntDesign name={nameIcon} size={30} color={color} />
    </View>
  );
};

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    isValidUser: true,
    isValidPassword: true,
  });

  const textHandleInput = (val) => {
    if (val.trim().lenght >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const navigation = useNavigation();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const credentials = {
    username: 'admin',
    password: '123456',
  };

  const onPressLogin = () => {
    if (
      username !== credentials.username ||
      password !== credentials.password
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Tài khoản hoặc mật khẩu không chính xác !',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        150,
      );
      return;
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>SmartHome</TextGradient>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.tinyLogo}
        />
      </View>
      <View style={styles.formInput}>
        <InputValue
          title="Tài khoản"
          placeholder={'Tài khoản'}
          icon="user"
          onChangeText={setUsername}
          value={username}
        />
        <InputValue
          title="Mật khẩu"
          icon="lock"
          isPassword
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View style={styles.button}>
        <Button title="Đăng nhập" onPress={onPressLogin} style={styles.btn} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.btnRegis}>
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
    </View>
  );
};

export default Login;

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
    fontSize: 32,
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
