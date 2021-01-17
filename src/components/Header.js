import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '../utils/theme';

const Header = ({title, backBtn}) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLORS.primary, COLORS.primary]}>
        <View style={[styles.headerView, backBtn && styles.alignItems]}>
          {backBtn && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.postisionBack}>
              <AntDesign name="arrowleft" size={23} color="#001f45" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: 15,
    paddingTop: 25,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  postisionBack: {
    position: 'absolute',
    left: 16,
    top: 30,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
});
