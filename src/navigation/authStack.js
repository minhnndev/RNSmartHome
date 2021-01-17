import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthScreen from '../screens/auth/index';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const authStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <authStack.Navigator initialRouteName="Home">
      <authStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <authStack.Screen
        name="Refister"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </authStack.Navigator>
  );
};

export default AuthStackScreen;
