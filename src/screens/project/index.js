import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {SIZES} from '../../utils/theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import InputValue from '../../components/InputValue';

const Project = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Room" backBtn />
      <View style={styles.main}>
        <View style={styles.formCreate}>
          <InputValue icon="home" title="Room Name" />
          <InputValue icon="home" title="Choose Device" />
          <InputValue icon="home" title="Connected Type" />
        </View>
        <Button title="Create Project" />
      </View>
    </SafeAreaView>
  );
};

export default Project;

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
