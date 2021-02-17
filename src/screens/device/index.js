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

const Device = () => {
  const [tabs, setTabs] = React.useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add a new device" backBtn />
      <View style={styles.listTab}>
        <TouchableOpacity
          onPress={() => setTabs(0)}
          style={[
            styles.button,
            tabs === 0 && {borderBottomColor: COLORS.secondary},
          ]}>
          <Text
            style={[
              styles.buttonText,
              tabs === 0 && {color: COLORS.secondary},
            ]}>
            Create Device
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabs(1)}
          style={[
            styles.button,
            tabs === 1 && {borderBottomColor: COLORS.secondary},
          ]}>
          <Text
            style={[
              styles.buttonText,
              tabs === 1 && {color: COLORS.secondary},
            ]}>
            QR Code
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.wrapper}>
          {tabs === 0 && (
            <View style={styles.main}>
              <View style={styles.formCreate}>
                <InputValue icon="home" title="Device Name" />
                <InputValue icon="home" title="Choose Device" />
                <InputValue icon="home" title="Connected Type" />
              </View>
              <Button title="Add Device" />
            </View>
          )}
          {tabs === 1 && (
            <View>
              <Text>QR CODE</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Device;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTab: {
    flexDirection: 'row',
  },
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.lightGray,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  main: {
    alignItems: 'center',
  },
  formCreate: {
    width: SIZES.width - 40,
    marginHorizontal: 20,
  },
});
