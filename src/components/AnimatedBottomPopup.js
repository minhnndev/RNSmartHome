import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const AnimatedBottomPopup = ({translateY, gestureHandler, zIndex}) => {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View style={[{zIndex: zIndex}]} />
      </TapGestureHandler>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
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
          <TouchableOpacity style={styles.logOutConfirm}>
            <Text style={styles.titleTopPopup}>Log out</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.underPopup}>
          <Text style={styles.titleUnderPopup}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
export default AnimatedBottomPopup;
const styles = StyleSheet.create({
  bottomSheet: {
    bottom: -1,
    width: width - 20,
    height: 300,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  hihi: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
