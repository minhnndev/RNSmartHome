import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackScreen from '../navigation/homeStack';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};

export default AppContainer;