import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const BackgroundHeader = (props) => {
  return (
    <View style={props.style}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#c4e0e5', '#4ca1af']}>
        <View style={{height: props.height, width: props.width}} />
        <View style={styles.line} />
        <View style={[styles.line, styles.linePos1]} />
        <View style={[styles.line, styles.linePos2]} />
      </LinearGradient>
    </View>
  );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    height: height,
    width: 45,
    top: -300,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [
      {
        rotate: '45deg',
      },
    ],
    borderRadius: 3,
  },
  linePos1: {
    top: -80,
    left: 30,
  },
  linePos2: {
    top: -110,
    left: 40,
  },
});
