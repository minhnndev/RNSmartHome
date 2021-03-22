import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

const Intro = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Màn hình dịch vụ</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Intro;
