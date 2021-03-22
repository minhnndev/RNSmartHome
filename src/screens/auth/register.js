import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ToastAndroid} from 'react-native';

import {InputValue, Button} from '../../components';
import {COLORS} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressRegister = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Chức năng đăng ký tài khoản tạm thời đóng !',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      150,
    );
    // navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.formInput}>
        <InputValue
          title="Tài khoản"
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
        <InputValue
          title="Nhập lại mật khẩu"
          icon="lock"
          isPassword
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Đăng ký"
          target="Home"
          style={styles.btn}
          onPress={onPressRegister}
        />
      </View>
    </>
  );
};

export default Register;

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
