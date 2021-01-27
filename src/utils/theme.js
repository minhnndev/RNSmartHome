import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const BANNER_H = 350;
export const TOPNAVI_H = 50;

export const COLORS = {
  // base colors
  // color 2021
  primary: '#F5DF4D', // PANTONE  13-0647 TCX Illuminating
  secondary: '#939597', // ANTONE  17-5104 TCX Ultimate Gray

  background: '#212226', // gray

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',

  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  darkgray: '#898C95',

  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
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

export const FONTS = {
  robotoBlack: {fontFamily: 'Roboto-Black'},
  robotoBold: {fontFamily: 'Roboto-Bold'},
  robotoRegular: {fontFamily: 'Roboto-Regular'},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
