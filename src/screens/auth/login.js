import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  AlertIOS,
  ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {AuthContext} from '../../common/redux/context';
import {Users} from '../../common/database/models/users';

import {TextGradient, InputValue, Button} from '../../components';

import {COLORS, SIZES} from '../../utils/theme';
import {notifyMessage} from '../../utils/helpers';

const ButtonIcon = ({nameIcon, color}) => {
  return (
    <View style={[styles.bottomIcon, {borderColor: color}]}>
      <AntDesign name={nameIcon} size={35} color={color} />
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
    if (val.trim().length >= 6) {
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

  const loginHandle = (username, password) => {
    const foundUser = Users.filter((item) => {
      return (
        username.toLowerCase() === item.username &&
        password.toLowerCase() === item.password
      );
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Thông tin không chính xác',
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

  const onPressSocialButton = () => {
    notifyMessage('Coming Soon');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>TM Platform</TextGradient>
        <TextGradient style={styles.txtSlogan}>
          Nền tảng nhà thông minh dành cho gia đình
        </TextGradient>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/img/logo-blue.png')}
            style={styles.tinyLogo}
          />
        </View>
      </View>
      <View style={{...styles.formInput, paddingTop: 50}}>
        <View>
          <InputValue
            title="Tài khoản"
            icon="user"
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
                Tên người dùng phải dài có ít nhất 4 ký tự.
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
              <Text style={styles.errorMsg}>
                Mật khẩu phải có ít nhất 6 ký tự.
              </Text>
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
          <Text style={styles.btnText}>
            Bạn chưa có tài khoản? Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Đăng nhập với</Text>
        <View style={styles.listButtonAccount}>
          <TouchableOpacity onPress={onPressSocialButton}>
            <ButtonIcon nameIcon="twitter" color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSocialButton}>
            <ButtonIcon nameIcon="google" color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSocialButton}>
            <ButtonIcon nameIcon="facebook-square" color="#4267B2" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 55,
    height: 55,
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
