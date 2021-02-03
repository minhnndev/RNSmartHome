import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';

import HomeStackScreen from '../navigation/homeStack';
import HomeScreen from '../screens/home';
import SettingScreen from '../screens/intro';
import UserScreen from '../screens/profile';

import {COLORS} from '../utils/theme';

const Tab = createBottomTabNavigator();

const Base = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Service') {
            iconName = focused ? 'rocket' : 'rocket';
          } else if (route.name === 'User') {
            iconName = focused ? 'user' : 'user';
          }
          return <IconEntypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.secondary,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Service" component={SettingScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Base />
    </NavigationContainer>
  );
};

export default AppContainer;
