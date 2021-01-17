import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  not,
  Value,
  interpolate,
} from 'react-native-reanimated';

import {State} from 'react-native-gesture-handler';
import {withTransition} from 'react-native-redash/lib/module/v1';

import Header from '../../components/Header';
import BtnOpacity from '../../components/BtnOpacity';
import AnimatedBottomPopup from '../../components/AnimatedBottomPopup';
import ButtonLogout from '../../components/ButtonLogout';

const home = () => {
  //const translateY = new Value(300);
  const state = new Value(State.UNDETERMINED);
  const isOpen = new Value(0);
  const transition = withTransition(isOpen);

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const zIndex = interpolate(translateY, {
    inputRange: [0, 300, 300],
    outputRange: [1, 1, -1],
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [
    state,
    isOpen,
  ]);
  return (
    <>
      <View>
        <Header title="Home" />
        <View>
          <BtnOpacity title="New Project" target="Project" icon="plus" />
          <BtnOpacity title="My Apps" target="Project" icon="calculator" />
          <BtnOpacity title="QR Code" target="Project" icon="qrcode" />
        </View>

        <ButtonLogout
          gestureHandler={{
            onHandlerStateChange: Animated.event([
              {
                nativeEvent: {state},
              },
            ]),
          }}
        />
      </View>
      <AnimatedBottomPopup
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: {state},
            },
          ]),
        }}
        zIndex={zIndex}
        translateY={translateY}
      />
    </>
  );
};

export default home;

const styles = StyleSheet.create({});
