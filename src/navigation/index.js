import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './homeStack';

import {COLORS} from '../utils/theme';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default AppContainer;
