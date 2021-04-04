import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

import {TextGradient, InputValue, Button} from '../../components';

import {COLORS, SIZES} from '../../utils/theme';

const Register = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
  });

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
  const handleConfirmPasswordChange = (val) => {
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

  return (
    <View style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>TM Platform</TextGradient>
        <TextGradient style={styles.txtSlogan}>
          Nền tảng nhà thông minh dành cho gia đình
        </TextGradient>
        <Image
          source={require('../../assets/img/logo-blue.png')}
          style={styles.tinyLogo}
        />
      </View>
      <View style={styles.formInput}>
        <View>
          <InputValue
            title="Tài khoản"
            icon="user"
            onChangeText={(username) => textInputChange(username)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Tài khoản phải có ít nhất 4 ký tự
              </Text>
            </Animatable.View>
          )}
        </View>
        <View>
          <InputValue
            title="Mật khẩu"
            icon="lock"
            onChangeText={(password) => handlePasswordChange(password)}
            isPassword
          />
        </View>
        <View>
          <InputValue
            title="Nhập lại mật khẩu"
            icon="lock"
            onChangeText={(confirm_password) =>
              handleConfirmPasswordChange(confirm_password)
            }
            isPassword
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Đăng ký" style={styles.btn} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.btnRegis}>
          <Text style={styles.btnText}>
            Bạn đã có tài khoản rồi ? Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 25,
  },
  txtSlogan: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 25,
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
    paddingTop: 20,
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
    width: SIZES.width - 60,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
