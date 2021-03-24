import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';

import {COLORS, SIZES} from '../../utils/theme';
import {Styles} from '../../utils/Styles';
import {TextGradient, Header, Accordian} from '../../components';

const About = () => {
  const menu = [
    {title: 'Developer', data: 'Fontend: MinhNNdev \n\nBackend: Trungkenbi'},
  ];
  const renderAccordians = () => {
    const items = [];
    for (const item of menu) {
      items.push(<Accordian title={item.title} data={item.data} />);
    }
    return items;
  };
  return (
    <View style={styles.flex}>
      <Header title="Thông tin ứng dụng" backBtn />
      <View style={styles.container}>
        <View>
          <View style={styles.marginHorizontal}>
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
          <View style={styles.paddingTop}>{renderAccordians()}</View>
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
    justifyContent: 'space-between',
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  top: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 30,
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
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    fontSize: 17,
    fontWeight: '700',
    color: '#7f7b7b',
  },
  copyright: {
    paddingBottom: 20,
  },
});
