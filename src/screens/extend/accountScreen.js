import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Header} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/theme';

const Icon = ({name}) => {
  return (
    <AntDesign
      name={name}
      size={28}
      color={COLORS.lightGray}
      style={{marginHorizontal: 10}}
    />
  );
};

const Profile = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header title="Account Manager" backBtn />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.containerMember}>
            <Image
              source={require('../../assets/img/avatar_blank.png')}
              style={styles.imageMember}
            />
            <Text style={[styles.nameMember]}>Fullname</Text>
          </View>
          <View style={styles.infoBar}>
            <Text style={styles.title}>Account:</Text>
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
          <TouchableOpacity>
            <View style={styles.infoBar}>
              <Text style={styles.title}>Password:</Text>
              <AntDesign name="right" size={22} color={COLORS.lightGray} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  top: {
    padding: 20,
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
