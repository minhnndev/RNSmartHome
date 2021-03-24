import React, {useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {InputValue, Button} from '../../components';
import {COLORS} from '../../utils/theme';

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
    <View>
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
    </View>
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
