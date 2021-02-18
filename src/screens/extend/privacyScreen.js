import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';

import {COLORS, SIZES} from '../../utils/theme';
import {Header} from '../../components';

import PrivacyPolicy from '../../common/database/legal/PrivacyPolicy';

const Privacy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Privacy" backBtn />
      <ScrollView>
        <View style={styles.main}>
          <PrivacyPolicy />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    margin: 20,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
});
