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

const OptionBar = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.optionBar}>
        <Icon name={props.icon} />
        <Text style={styles.content}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
        <OptionBar
          onPress={() => navigation.navigate('Account')}
          icon="user"
          title="Account Manager"
        />
        <OptionBar
          onPress={() => navigation.navigate('Privacy')}
          icon="lock"
          title="Privacy"
        />
        <OptionBar
          onPress={() => navigation.navigate('Support')}
          icon="customerservice"
          title="Support"
        />
        <OptionBar
          onPress={() => navigation.navigate('Setting')}
          icon="setting"
          title="Setting"
        />
        <OptionBar
          onPress={() => navigation.navigate('About')}
          icon="info"
          title="Info"
        />
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
