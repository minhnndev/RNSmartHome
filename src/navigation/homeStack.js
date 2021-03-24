import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProjectScreen from '../screens/project';
import DeviceScreen from '../screens/device/index';
import DeviceDetailScreen from '../screens/device/detail';
import AboutScreen from '../screens/about';
import SettingScreen from '../screens/extend/settingScreen';
import AccountScreen from '../screens/extend/account/accountScreen';
import PasswordScreen from '../screens/extend/account/changePassword';
import PrivacyScreen from '../screens/extend/privacyScreen';
import SupportScreen from '../screens/extend/supportScreen';
import HomeTabs from './tabsNavigator';

const homeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <homeStack.Navigator initialRouteName="Home">
      <homeStack.Screen
        name="Home"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Project"
        component={ProjectScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Device"
        component={DeviceScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="About"
        component={AboutScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Password"
        component={PasswordScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Support"
        component={SupportScreen}
        options={{headerShown: false}}
      />
      <homeStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </homeStack.Navigator>
  );
};

export default HomeStackScreen;
