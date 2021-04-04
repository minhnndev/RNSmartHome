/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useMemo} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from './common/redux/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {fcmService} from './services/notification/FCMservice';
import {localNotificationService} from './services/notification/LocalNotificationService';

import AuthStack from './navigation/authStack';
import HomeStack from './navigation/homeStack';

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    tokenAccount: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          tokenAccount: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          tokenAccount: action.token,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          tokenAccount: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          tokenAccount: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser) => {
        const tokenAccount = String(foundUser[0].tokenAccount);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem('tokenAccount', tokenAccount);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: tokenAccount});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('tokenAccount');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let tokenAccount;
      tokenAccount = null;
      try {
        tokenAccount = await AsyncStorage.getItem('tokenAccount');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', tokenAccount);
      dispatch({type: 'RETRIEVE_TOKEN', token: tokenAccount});
    }, 1000);
    //=========React-Native_Firebase_FCM==============/
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      // eslint-disable-next-line no-alert
      alert(notify.body);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.tokenAccount !== null ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
