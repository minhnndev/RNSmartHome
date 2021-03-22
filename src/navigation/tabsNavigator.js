import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/home';
import SettingScreen from '../screens/intro';
import VoiceScreen from '../screens/intro/voice';
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
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Service':
              iconName = focused ? 'rocket' : 'rocket';
              break;
            case 'User':
              iconName = focused ? 'user' : 'user';
              break;
            case 'Voice':
              iconName = focused ? 'microphone' : 'microphone';
              return <FontAwesome name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Voice" component={VoiceScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
