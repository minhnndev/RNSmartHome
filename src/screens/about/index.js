import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../utils/theme';
import {Styles} from '../../utils/Styles';
import {TextGradient, Header} from '../../components';

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.flex}>
      <Header title="About" backBtn />
      <View style={styles.container}>
        <View>
          <View style={styles.top}>
            <TextGradient style={styles.name}>Smart Home</TextGradient>
            <Image
              source={require('../../assets/img/logo.png')}
              style={styles.tinyLogo}
            />
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
          <View style={styles.infoBar}>
            <Text style={styles.title}>Version:</Text>
            <Text style={styles.content}>1.2.5</Text>
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={Styles.textAlign}>All Rights reserved.</Text>
          <Text style={Styles.textAlign}>Copyright © 2021 SmartHome Inc.</Text>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  top: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  tinyLogo: {
    width: 80,
    height: 70,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7f7b7b',
  },
  copyright: {
    paddingBottom: 20,
  },
});
