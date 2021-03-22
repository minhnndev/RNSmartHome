import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/theme';

const Button = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View>
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});
