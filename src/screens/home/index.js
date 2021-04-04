import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  Switch,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {TextGradient} from '../../components/index';
import {COLORS, SIZES, FONTS} from '../../utils/theme';

import API from '../../services/api';
import {material} from 'react-native-typography';
import AssistantScreen from '../assistant';

const {width, height} = Dimensions.get('screen');

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [rooms, setRoom] = useState([]);

  // store data from sensors
  const [labels, setLables] = useState([]);
  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    console.log('Start fetching data from API ...');
    const _interval = setInterval(() => {
      API.get('project')
        .then((res) => {
          let listRooms = [];
          let i = 0;
          res.data.devices.forEach((device) => {
            let widgets = res.data.widgets.filter(
              (w) =>
                (w.type === 'BUTTON' || w.type === 'SLIDER') && w.tabId === i,
            );
            let room = {
              id: i,
              name: device.name,
              boardType: device.boardType,
              connectionType: device.connectionType,
              widgets: widgets,
            };
            listRooms.push(room);
            i++;
          });
          setRoom(listRooms);
        })
        .then(() => setLoading(false))
        .catch((error) => console.error(error));

      API.get('project')
        .then((res) => {
          let _lables = res.data.widgets.filter(
            (w) => w.type === 'LABELED_VALUE_DISPLAY',
          );
          setLables(_lables);
        })
        .catch((error) => console.error(error));
    }, 2000);
    return () => {
      clearInterval(_interval);
    };
  }, []);
  return (
    <View style={styles.container}>
      <TextGradient style={styles.name}>TM Smart Home</TextGradient>
      <View style={styles.listTab}>
        <TouchableOpacity
          onPress={() => setTabs(0)}
          style={[styles.button, tabs === 0 && styles.btnEnable]}>
          <Text
            style={[styles.buttonText, tabs === 0 && {color: COLORS.white}]}>
            TẦNG 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabs(1)}
          style={[styles.button, tabs === 1 && styles.btnEnable]}>
          <Text
            style={[styles.buttonText, tabs === 1 && {color: COLORS.white}]}>
            TẦNG 2
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        data={rooms}
        keyExtractor={(item) => item.widgets.toString()}
        renderItem={({item: room}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Device', {room, labels})}>
              <View style={styles.viewRoom}>
                <View>
                  <Text style={styles.nameRoom}>{room.name}</Text>
                  <Text style={styles.countDevice}>
                    {room.widgets.length} thiết bị
                  </Text>
                </View>
                <View style={styles.viewParameter}>
                  <View style={styles.paraIcon}>
                    <Feather
                      name="thermometer"
                      size={26}
                      color={COLORS.lightGray}
                    />
                    <Text style={styles.txtPara}>
                      {labels[1]
                        ? parseFloat(labels[1].value).toFixed(1)
                        : '--'}
                      °C
                    </Text>
                  </View>

                  <View style={styles.paraIcon}>
                    <Feather name="cloud" size={26} color={COLORS.lightGray} />
                    <Text style={styles.txtPara}>
                      {' '}
                      {labels[0]
                        ? parseFloat(labels[0].value).toFixed(1)
                        : '--'}
                      %
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        ListFooterComponent={
          <View>
            <TouchableOpacity style={styles.btnAddDevice}>
              <Feather name="plus" size={25} color={COLORS.lightGray} />
              <Text style={styles.subtext}> Thêm phòng mới</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 27,
    color: COLORS.primary,
    paddingVertical: 10,
  },
  nameRoom: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  countDevice: {
    color: COLORS.lightGray,
    fontSize: 12,
  },
  listTab: {
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#E1EEFC',
  },
  btnEnable: {
    backgroundColor: '#0175ea',
    borderRadius: 10,
    margin: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'gray',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 10,
  },
  viewRoom: {
    justifyContent: 'space-between',
    padding: 10,
    width: SIZES.width / 2 - 30,
    height: (SIZES.height * 16) / 100,
    flexDirection: 'column',
    borderRadius: 4,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 3,
  },
  viewParameter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  paraIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtPara: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  btnAddDevice: {
    marginTop: 20,
    height: 50,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
