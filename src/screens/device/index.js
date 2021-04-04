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
import Slider from 'react-native-slider';
import _, {floor} from 'lodash';

import {TextGradient} from '../../components/index';
import {COLORS, SIZES, FONTS} from '../../utils/theme';

import API from '../../services/api';

const {width, height} = Dimensions.get('screen');

const Home = ({navigation, route}) => {
  const {room, labels} = route.params;
  // console.log(room.widgets);
  const [rooms, setRoom] = useState([]);
  const [slider, setSlider] = useState(16);

  const getPinShortCode = (widget) => {
    if (!widget.pin === -1) {
      return new Error();
    }
    switch (widget.pinType) {
      case 'DIGITAL':
        return `D${widget.pin}`;
      case 'VIRTUAL':
        return `V${widget.pin}`;
    }
    return `${widget.pin}`;
  };

  const setSwitchValue = (value, index) => {
    let roomWidgets = room.widgets;
    let newValue = value ? '1' : '0';
    let widget = roomWidgets[index];
    let URI = 'update/' + getPinShortCode(widget) + '?value=' + newValue;
    API.get(URI).catch((error) => console.error(error));

    let roomWidgetsUpdated = _.clone(roomWidgets);
    roomWidgetsUpdated[index].value = newValue;
    setRoom(roomWidgetsUpdated);
  };
  const listItem = (item, index) => (
    <View style={styles.bottomDevice}>
      {item.type === 'SLIDER' && (
        <View style={styles.slideControl}>
          <View style={styles.viewNameSlider}>
            <Text style={styles.nameDevice}>{item.label}</Text>
            <Ionicons name="ios-options" size={28} color={COLORS.lightGray} />
          </View>
          <Slider
            minimumValue={item.min}
            maximumValue={item.max}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor={COLORS.primary}
            thumbTouchSize={{width: 50, height: 40}}
            value={slider}
            onValueChange={(value) => setSlider(value)}
          />
          <Text>Độ mở: {floor(slider)}°</Text>
        </View>
      )}
      {item.type === 'BUTTON' && (
        <View style={styles.switchControl}>
          <Text style={styles.nameDevice}>{item.label}</Text>
          <View style={styles.alignCenter}>
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              trackColor={{
                false: 'rgba(118, 117, 119, 0.4)',
                true: COLORS.primary,
              }}
              thumbColor={'#f4f3f4'}
              onValueChange={(value) => setSwitchValue(value, index)}
              value={item.value === '1'}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <TextGradient style={styles.name}>{room.name}</TextGradient>
          <View style={styles.viewParameter}>
            <View style={styles.paraIcon}>
              <Feather name="thermometer" size={26} color={COLORS.lightGray} />
              <Text style={styles.txtPara}>
                {labels[1] ? parseFloat(labels[1].value).toFixed(1) : '--'}
                °C
              </Text>
            </View>

            <View style={styles.paraIcon}>
              <Feather name="cloud" size={26} color={COLORS.lightGray} />
              <Text style={styles.txtPara}>
                {' '}
                {labels[0] ? parseFloat(labels[0].value).toFixed(1) : '--'}%
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Assistant')}>
          <Ionicons
            name="ios-mic-circle-outline"
            size={50}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 30, height: '100%'}}>
        <View style={styles.viewDevice}>
          <FlatList
            numColumns={2}
            data={room.widgets}
            keyExtractor={(widget, index) => index.toString()}
            renderItem={({item: widget, index}) => {
              return listItem(widget, index);
            }}
          />
        </View>
      </View>
      {/*-------------------------*/}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  viewParameter: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  paraIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  txtPara: {
    fontSize: 18,
    color: COLORS.lightGray,
  },
  alignCenter: {
    alignItems: 'center',
  },
  viewDevice: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    alignItems: 'center',
  },
  nameDevice: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
  },
  switchControl: {
    marginTop: 5,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    width: 180,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  viewNameSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slideControl: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    width: 180,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  bottomDevice: {
    paddingBottom: 10,
  },
  track: {
    height: 6,
    borderRadius: 2,
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});
