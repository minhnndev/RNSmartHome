import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/home';
import SettingScreen from '../screens/intro';
import ProfileScreen from '../screens/profile';

import {COLORS} from '../utils/theme';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      lazy
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
        activeTintColor: COLORS.secondary,
        inactiveTintColor: COLORS.lightGray,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Service" component={SettingScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
