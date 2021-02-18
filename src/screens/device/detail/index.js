import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header, Button, InputValue} from '../../../components';
import {COLORS} from '../../../utils/theme';

const DeviceDetail = () => {
  const route = useRoute();
  const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Device ' + item.name} backBtn />
      <View style={styles.main}>
        <Text style={styles.title}>Change Name Device</Text>
        <View style={styles.potisionBtn}>
          <AntDesign name="edit" size={24} color={COLORS.lightGray} />
          <TextInput style={styles.input} />
          <TouchableOpacity style={styles.btn}>
            <AntDesign name="save" size={24} color={COLORS.lightGray} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default DeviceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  potisionBtn: {
    margin: 5,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d3d4d5',
    borderRadius: 3,
    alignItems: 'center',
    paddingLeft: 10,
  },
  input: {
    flex: 1,
  },
  title: {
    color: '#8a8b8c',
    fontWeight: '400',
    marginVertical: 8,
    fontSize: 16,
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});
