import React from 'react';
import {SafeAreaView, StyleSheet, View, TextInput} from 'react-native';

import {Header, Button, InputValue} from '../../components';
import {COLORS} from '../../utils/theme';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Setting" backBtn />
      <View style={styles.main}>
        <View style={styles.potisionBtn}>
          <TextInput />
          <Button title="Save" style={styles.btn} />
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
  btn: {
    marginTop: 30,
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
