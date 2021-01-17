import React from 'react';
import {StyleSheet, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const ButtonLogout = ({gestureHandler}) => {
  return (
    <View style={{...styles.imageHeader}}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View>
          <SimpleLineIcons name="logout" size={25} color="#000" />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default ButtonLogout;

const styles = StyleSheet.create({
  imageHeader: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 10,
    top: 30,
  },
});
