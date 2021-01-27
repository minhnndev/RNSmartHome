import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingScreen from '../screens/intro/index';

const settingStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <settingStack.Navigator>
      <settingStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </settingStack.Navigator>
  );
};

export default AuthStackScreen;
