import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Header, Button, InputValue} from '../../components';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Setting" backBtn />
      <View style={styles.main}>
        <InputValue title="Address IP" />
        <View style={styles.potisionBtn}>
          <View />
          <Button title="Save" />
        </View>
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
  potisionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
