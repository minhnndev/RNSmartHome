import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const BANNER_H = 350;
export const TOPNAVI_H = 50;

export const COLORS = {
  // base colors
  primary: '#4bcafb',
  secondary: '#4507A0',

  // gradient
  gradientStart: '#4bcafb',
  gradientEnd: '#4507A0',

  background: '#212226', // gray

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',

  lightGray: '#939597', // ANTONE  17-5104 TCX Ultimate Gray
  lightGray2: '#F6F6F7',
  darkgray: '#898C95',

  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 36,
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 16,
  p: 12,
  body1: 28,
  body2: 24,
  body3: 20,
  body4: 16,
  body5: 12,

  // app dimensions
  width,
  height,
};

// font family global
export const FONTS = {
  black: 'Raleway-Black',
  bold: 'Raleway-Bold',
  regular: 'Raleway-Regular',
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
