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

import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/theme';
import {Styles} from '../../utils/Styles';

import {TextGradient} from '../../components';

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
    <View style={styles.container}>
      <View>
        <View style={styles.top}>
          <TextGradient style={styles.name}>Smart Home</TextGradient>
          <View style={styles.containerMember}>
            <Image
              source={require('../../assets/img/avatar_blank.png')}
              style={styles.imageMember}
            />
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.nameMember}>Fullname</Text>
              <Text style={styles.content}>SmartHome.Cloud</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <View style={styles.optionBar}>
            <Icon name="user" />
            <Text style={styles.content}>Account Manager</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <View style={styles.optionBar}>
            <Icon name="lock" />
            <Text style={styles.content}>Privacy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <View style={styles.optionBar}>
            <Icon name="customerservice" />
            <Text style={styles.content}>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <View style={styles.optionBar}>
            <Icon name="setting" />
            <Text style={styles.content}>Setting</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <View style={styles.optionBar}>
            <Icon name="info" />
            <Text style={styles.content}>Info</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Auth')}
        style={styles.btn}>
        <Text style={[Styles.textAlign, styles.content]}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    paddingVertical: 20,
  },
  top: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  imageMember: {
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.lightGray,
  },
  optionBar: {
    flexDirection: 'row',
    marginVertical: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nameMember: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  content: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.lightGray,
  },
  containerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
});
