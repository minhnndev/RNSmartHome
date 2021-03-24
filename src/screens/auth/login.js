import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {AuthContext} from '../../common/redux/context';
import {Users} from '../../common/database/models/users';

import {TextGradient, InputValue, Button} from '../../components';

import {COLORS} from '../../utils/theme';

const ButtonIcon = ({nameIcon, color}) => {
  return (
    <View style={[styles.bottomIcon, {borderColor: color}]}>
      <AntDesign name={nameIcon} size={30} color={color} />
    </View>
  );
};

const Login = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>TM Platform</TextGradient>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.tinyLogo}
        />
      </View>
      <View style={styles.formInput}>
        <View>
          <InputValue
            title="MSSV"
            icon="user"
            keyboardType="numeric"
            onChangeText={(username) => textInputChange(username)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Tên người dùng phải dài 4 ký tự.
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
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Mật khẩu phải dài 8 ký tự.</Text>
            </Animatable.View>
          )}
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Đăng nhập"
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
          style={styles.btn}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.btnRegis}>
          <Text style={styles.btnText}>Đăng kí</Text>
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
