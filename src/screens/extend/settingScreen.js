import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {COLORS, SIZES} from '../../utils/theme';
import {Header, Button, InputValue} from '../../components';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Setting" backBtn />
      <View style={styles.main}>
        <InputValue title="Address IP" />
        <Button title="Save" style={styles.btn} />
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginHorizontal: 20,
  },
});
