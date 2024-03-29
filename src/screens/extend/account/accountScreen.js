import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../../common/redux/context';

import {Header} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../utils/theme';
import {Styles} from '../../../utils/Styles';

const Profile = () => {
  const {signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <>
      <Header title="Quản lí tài khoản" backBtn />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.containerMember}>
            <Image
              source={require('../../../assets/img/avatar_blank.png')}
              style={styles.imageMember}
            />
            <Text style={[styles.nameMember]}>TM Platform</Text>
          </View>
          <View style={styles.infoBar}>
            <Text style={styles.title}>Tài khoản:</Text>
            <Text style={styles.content}>smarthome@gmail.com</Text>
          </View>
          <View style={styles.infoBar}>
            <Text style={styles.title}>IP:</Text>
            <Text style={styles.content}>45.118.312.111</Text>
          </View>
          <View style={styles.infoBar}>
            <Text style={styles.title}>Server:</Text>
            <Text style={styles.content}>SmartHome.Cloud</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Password')}>
            <View style={styles.infoBar}>
              <Text style={styles.title}>Mật khẩu</Text>
              <AntDesign name="right" size={22} color={COLORS.lightGray} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={styles.btn}>
          <Text style={[Styles.textAlign, styles.content]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  imageMember: {
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.lightGray,
  },
  nameMember: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.black,
  },
  content: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.lightGray,
  },
  containerMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
});
