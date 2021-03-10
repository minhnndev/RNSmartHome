import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../utils';

const addDevice = (navigation) => {
  return (
    <View>
      <View style={styles.createTabs}>
        <TouchableOpacity onPress={() => navigation.navigate('Project')}>
          <View style={styles.alignCenter}>
            <AntDesign name="plus" size={35} color={COLORS.secondary} />
            <Text style={styles.subtext}>Create</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.alignCenter}>
            <AntDesign name="qrcode" size={35} color={COLORS.secondary} />
            <Text style={styles.subtext}>QR Code</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addDevice;

const styles = StyleSheet.create({
  createTabs: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 40,
    height: (SIZES.height * 15) / 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtext: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
