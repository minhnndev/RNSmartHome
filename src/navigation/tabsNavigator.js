import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/home';
import SettingScreen from '../screens/intro';
import AssistantScreen from '../screens/assistant';
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
            case 'Trang chủ':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Dịch vụ':
              iconName = focused ? 'rocket' : 'rocket';
              break;
            case 'Cài đặt':
              iconName = focused ? 'cog' : 'cog';
              break;
            case 'Trợ lý':
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
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Dịch vụ" component={SettingScreen} />
      <Tab.Screen name="Trợ lý" component={AssistantScreen} />
      <Tab.Screen name="Cài đặt" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
