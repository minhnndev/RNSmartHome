import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const AnimatedBottomPopup = ({translateY, gestureHandler, zIndex}) => {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: zIndex,
          }}
        />
      </TapGestureHandler>
      <Animated.View
        style={{
          ...styles.bottomSheet,
          transform: [{translateY: translateY}],
          zIndex: 100,
        }}>
        <View style={styles.topPopup}>
          <View style={styles.questionConfirm}>
            <Text style={styles.titleQuestion}>
              Are you sure you want to log out ?
            </Text>
          </View>
          <View style={styles.logOutConfirm}>
            <Text style={styles.titleTopPopup}>Log out</Text>
          </View>
        </View>
        <View style={styles.underPopup}>
          <Text style={styles.titleUnderPopup}>Cancel</Text>
        </View>
      </Animated.View>
    </>
  );
};
export default AnimatedBottomPopup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width - 20,
    height: 165,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  titleQuestion: {
    color: '#808080',
    fontSize: 13,
  },
  topPopup: {
    width: width - 20,
    height: 100,
    backgroundColor: '#C6C7C9',
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  titleTopPopup: {
    color: '#FA3C31',
    fontSize: 18,
  },
  underPopup: {
    width: width - 20,
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleUnderPopup: {
    color: '#137EFF',
    fontSize: 18,
  },
  questionConfirm: {
    width: width - 20,
    height: 45,
    borderBottomWidth: 0.2,
    borderBottomColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutConfirm: {
    width: width - 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
