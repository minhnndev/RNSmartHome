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

  const {signIn} = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
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

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, passWord) => {
    const foundUser = Users.filter((item) => {
      return userName === item.username && passWord === item.password;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Nhập thông tin sai',
        'Tài khoản hoặc mật khẩu không được để trống!',
        [{text: 'Ok'}],
      );
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert(
        'Người dùng không tồn tại',
        'Tài khoản hoặc mật khẩu không chính xác!',
        [{text: 'Ok'}],
      );
      return;
    }
    signIn(foundUser);
  };

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
