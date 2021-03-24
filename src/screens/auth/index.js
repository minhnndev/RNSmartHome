import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import TextGradient from '../../components/TextGradient';

import Login from './login';
import Register from './register';

const ButtonIcon = ({nameIcon, color}) => {
  return (
    <View style={[styles.bottomIcon, {borderColor: color}]}>
      <AntDesign name={nameIcon} size={30} color={color} />
    </View>
  );
};

const Auth = () => {
  const [tab, setTab] = React.useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextGradient style={styles.txtLogo}>TM Platform</TextGradient>
        <TextGradient style={styles.txtSlogan}>
          Nền tảng nhà thông minh cho gia đình
        </TextGradient>
        <Image
          source={require('../../assets/img/logo-blue.png')}
          style={styles.tinyLogo}
        />
      </View>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        {tab ? <Register /> : <Login />}
      </Animated.View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            fadeIn();
            // setTab(!tab);
          }}
          style={styles.btnRegis}>
          <Text style={styles.btnText}>{tab ? 'Đăng nhập' : 'Đăng ký'}</Text>
        </TouchableOpacity>
      </View>
      {!tab && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>đăng nhập với</Text>
          <View style={styles.listButtonAccount}>
            <ButtonIcon nameIcon="twitter" color="#1DA1F2" />
            <ButtonIcon nameIcon="google" color="#DB4437" />
            <ButtonIcon nameIcon="facebook-square" color="#4267B2" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Auth;

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
    paddingTop: 25,
  },
  txtSlogan: {
    textAlign: 'center',
    paddingBottom: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  footer: {
    paddingTop: 20,
    paddingVertical: 5,
  },
  footerText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
    textAlign: 'center',
  },
});
