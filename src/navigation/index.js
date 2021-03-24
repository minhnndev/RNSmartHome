import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './homeStack';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default AppContainer;
