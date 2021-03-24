import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const authStack = createStackNavigator();

const authStackScreen = () => {
  return (
    <authStack.Navigator initialRouteName="Login">
      <authStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <authStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </authStack.Navigator>
  );
};

export default authStackScreen;
