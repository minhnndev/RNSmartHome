import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackScreen from '../navigation/homeStack';
//import AuthStackScreen from '../navigation/authStack';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};

export default AppContainer;
