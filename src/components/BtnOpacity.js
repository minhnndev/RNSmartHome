import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BtnOpacity = ({title, target, icon}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(target)}
        style={styles.btnOpacity}>
        <AntDesign name={icon} size={40} color="#000" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnOpacity;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btnOpacity: {
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 120,
  },
  icon: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
});
