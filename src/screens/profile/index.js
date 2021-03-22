import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../utils/theme';
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
  const showToastGoogleAssistants = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Google Assistants đã được tích hợp sẵn',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150,
    );
  };
  const showToastDefaults = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Dịch vụ chưa được hỗ trợ',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150,
    );
  };

  const images = {
    Alexa: require('../../assets/img/AmazonAlexa.png'),
    Google: require('../../assets/img/GoogleAssistant.png'),
    Siri: require('../../assets/img/AppleSiri.png'),
  };
  const DATA = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef(),
  }));

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <TextGradient style={styles.name}>Smart Home</TextGradient>
        <View style={styles.containerMember}>
          <Image
            source={require('../../assets/img/avatar_blank.png')}
            style={styles.imageMember}
          />
          <View style={{marginHorizontal: 20}}>
            <Text style={styles.nameMember}>TM Platform</Text>
            <Text style={styles.content}>SmartHome.Cloud</Text>
          </View>
        </View>
      </View>
      <View style={[styles.assistant, styles.block]}>
        <Text style={styles.content}>Trợ lí ảo</Text>
        <FlatList
          data={DATA}
          horizontal
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.assistantTab}>
                <View style={styles.imgTit}>
                  {item.key === 'Google' ? (
                    <TouchableOpacity
                      onPress={() => showToastGoogleAssistants()}>
                      <Image source={item.image} style={styles.imageMember} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => showToastDefaults()}>
                      <Image source={item.image} style={styles.imageMember} />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.content}>{item.title}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.block}>
        <OptionBar
          onPress={() => navigation.navigate('Account')}
          icon="user"
          title="Quản lí tài khoản"
        />
        <OptionBar
          onPress={() => navigation.navigate('Privacy')}
          icon="lock"
          title="Privacy"
        />
        <OptionBar
          onPress={() => navigation.navigate('Support')}
          icon="customerservice"
          title="Hỗ trợ & FAQ"
        />
        <OptionBar
          onPress={() => navigation.navigate('Setting')}
          icon="setting"
          title="Cài đặt"
        />
        <OptionBar
          onPress={() => navigation.navigate('About')}
          icon="info"
          title="Thông tin"
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
    paddingVertical: 20,
  },
  block: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  imageMember: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  optionBar: {
    flexDirection: 'row',
    marginVertical: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nameMember: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.black,
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.lightGray,
  },
  containerMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  assistant: {
    marginVertical: 10,
  },
  btn: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
  imgTit: {
    width: (SIZES.width - 45) / 3,
    padding: 10,
    alignItems: 'center',
  },
});
