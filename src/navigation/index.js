import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconEntypo from 'react-native-vector-icons/Entypo';

import HomeStackScreen from '../navigation/homeStack';
import AuthStackScreen from './settingStack';

import {COLORS} from '../utils/theme';

// const Tab = createBottomTabNavigator();

// const Base = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home';
//           } else if (route.name === 'Service') {
//             iconName = focused ? 'rocket' : 'rocket';
//           }
//           return <IconEntypo name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: COLORS.primary,
//         inactiveTintColor: COLORS.secondary,
//         keyboardHidesTabBar: true,
//       }}>
//       <Tab.Screen name="Home" component={HomeStackScreen} />
//       <Tab.Screen name="Service" component={AuthStackScreen} />
//     </Tab.Navigator>
//   );
// };

const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};

export default AppContainer;
