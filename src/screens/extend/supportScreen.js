import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {COLORS, SIZES} from '../../utils/theme';
import {Header} from '../../components';

const Support = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Support" backBtn />
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={[styles.content, styles.txtColor, styles.txtAlign]}>
            Support Center
          </Text>
          <Text style={[styles.title, styles.txtAlign]}>
            Hi, how can we help?
          </Text>
        </View>
        <View>
          <Text style={[styles.title, styles.txtAlign]}>Popular articles</Text>
          <Text style={styles.block}>Creating an account</Text>
          <Text style={styles.block}>Reset password</Text>
          <Text style={styles.block}>Connect Device</Text>
          <Text style={styles.block}>Connect Server Private</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.description}>
            Troubleshooting other, you can send to Email
          </Text>
          <Text style={styles.email}>Email: support@smarthome.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    backgroundColor: COLORS.white,
    padding: 30,
  },
  block: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
    color: COLORS.lightGray,
    fontWeight: '700',
    fontSize: 18,
  },
  txtAlign: {
    textAlign: 'center',
  },
  txtColor: {
    color: COLORS.secondary,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
  },
  content: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  email: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
