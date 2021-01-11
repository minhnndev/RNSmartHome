import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {_Styles} from '../../utils/Styles';
import Header from '../../components/Header';

const manage = ({navigation}) => {
  return (
    <SafeAreaView style={_Styles.container}>
      <Header title="Manage" backBtn goBack={() => navigation.goBack()} />
      <View>
        <Text>Haha</Text>
      </View>
      <TouchableOpacity>
        <View>
          <Text>Create Project</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default manage;

const styles = StyleSheet.create({});
