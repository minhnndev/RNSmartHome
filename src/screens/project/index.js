import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {SIZES} from '../../utils/theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import InputValue from '../../components/InputValue';

const project = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Project" backBtn />
      <View style={styles.main}>
        <View style={styles.formCreate}>
          <InputValue icon="home" title="Project Name" />
          <InputValue icon="home" title="Choose Device" />
          <InputValue icon="home" title="Connected Type" />
        </View>
        <Button title="Create Project" target="" />
      </View>
    </SafeAreaView>
  );
};

export default project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    alignItems: 'center',
  },
  formCreate: {
    width: SIZES.width - 40,
    marginHorizontal: 20,
  },
});
