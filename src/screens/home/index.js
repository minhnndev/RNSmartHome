import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  not,
  Value,
  interpolate,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {State} from 'react-native-gesture-handler';
import {withTransition} from 'react-native-redash/lib/module/v1';

import Header from '../../components/Header';
import AnimatedBottomPopup from '../../components/AnimatedBottomPopup';
import Button from '../../components/Button';

import {_Styles} from '../../utils/Styles';

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
    inputRange: [0, 299, 300],
    outputRange: [1, 1, -1],
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [
    state,
    isOpen,
  ]);
  return (
    <SafeAreaView style={_Styles.container}>
      <Header title="Home" />
      <View style={styles.body}>
        <Button
          gestureHandler={{
            onHandlerStateChange: Animated.event([
              {
                nativeEvent: {state},
              },
            ]),
          }}
        />
        <BtnOpacity title="New Project" target="Manage" icon="plus" />
        <BtnOpacity title="My Apps" target="Manage" icon="calculator" />
        <BtnOpacity title="QR Code" target="Manage" icon="qrcode" />
      </View>
      <AnimatedBottomPopup
        zIndex={zIndex}
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: {state},
            },
          ]),
        }}
        translateY={translateY}
      />
    </SafeAreaView>
  );
};

export default home;

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
