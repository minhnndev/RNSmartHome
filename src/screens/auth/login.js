import React, {useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';

import InputValue from '../../components/InputValue';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../utils/theme';

const Login = () => {
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
    <>
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
