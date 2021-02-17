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

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Account" backBtn />
      <View style={styles.main}>
        <InputValue title="Address IP" />
        <Button title="Save" />
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginHorizontal: 20,
  },
});
