import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/theme';

const Button = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btn}>
      <View>
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    width: 200,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
