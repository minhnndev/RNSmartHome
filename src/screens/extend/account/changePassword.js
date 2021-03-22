import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Header, Button, InputValue} from '../../../components';
import {COLORS} from '../../../utils/theme';

const ChangePassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thay đổi mật khẩu" backBtn />
      <View style={styles.main}>
        <InputValue title="Mật khẩu cũ" icon="lock" isPassword />
        <InputValue title="Mật khẩu mới" icon="lock" isPassword />
        <InputValue title="Nhập lại mật khẩu" icon="lock" isPassword />
        <View style={styles.potisionBtn}>
          <View />
          <Button title="Lưu" style={styles.btn} />
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginHorizontal: 20,
  },
  potisionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
