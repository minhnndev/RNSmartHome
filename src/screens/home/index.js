import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Header from '../../components/Header';
import BtnOpacity from '../../components/BtnOpacity';

import {SIZES} from '../../utils/theme';

const home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View>
        <Header title="Home" />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.topPopup}>
              <View style={styles.questionConfirm}>
                <Text style={styles.titleQuestion}>
                  Are you sure you want to log out ?
                </Text>
              </View>
              <TouchableOpacity style={styles.logOutConfirm}>
                <Text style={styles.titleTopPopup}>Log out</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.underPopup}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.titleUnderPopup}>Cancel</Text>
            </TouchableOpacity>
          </Modal>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <SimpleLineIcons name="logout" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <View>
          <BtnOpacity title="New Project" target="Project" icon="plus" />
          <BtnOpacity title="My Apps" target="Project" icon="calculator" />
          <BtnOpacity title="QR Code" target="Project" icon="qrcode" />
        </View>
      </View>
    </>
  );
};

export default home;

const styles = StyleSheet.create({
  titleQuestion: {
    color: '#808080',
    fontSize: 13,
  },
  topPopup: {
    width: SIZES.width - 20,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  titleTopPopup: {
    color: '#FA3C31',
    fontSize: 18,
  },
  underPopup: {
    width: SIZES.width - 20,
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleUnderPopup: {
    color: '#137EFF',
    fontSize: 18,
  },
  questionConfirm: {
    width: SIZES.width - 20,
    height: 45,
    borderBottomWidth: 0.8,
    borderBottomColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutConfirm: {
    width: SIZES.width - 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //--------------------------------------//
});
