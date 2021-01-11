import React from 'react';
import {StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const Button = ({gestureHandler}) => {
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View>
        <SimpleLineIcons name="logout" size={30} color="#FFF" />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Button;

const styles = StyleSheet.create({});
