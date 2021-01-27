import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthScreen from '../screens/auth';
import HomeScreen from '../screens/home';
import ProjectScreen from '../screens/project';
import ProfileScreen from '../screens/profile';

const homeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <homeStack.Navigator initialRouteName="Auth">
      <homeStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Project"
        component={ProjectScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </homeStack.Navigator>
  );
};

export default HomeStackScreen;
