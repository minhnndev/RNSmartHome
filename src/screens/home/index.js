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
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import {TextGradient} from '../../components/index';
import {COLORS, SIZES} from '../../utils/theme';

import API from '../../services/api';

const {width, height} = Dimensions.get('screen');

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={styles.txtTab}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({measures, scrollX, data}) => {
  const inputRange = data.map((r, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 2,
        width: indicatorWidth,
        left: 0,
        backgroundColor: COLORS.lightGray,
        bottom: -7,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = React.useRef();
  useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.posTab}>
      <View ref={containerRef} style={styles.spaceTab}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.id}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length >= 2 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [rooms, setRoom] = useState([]);
  const [labels, setLables] = useState([]);

  useEffect(() => {
    console.log('Start fetching data from API ...');
    API.get('project')
      .then((res) => {
        let listRooms = [];
        let i = 0;
        res.data.devices.forEach((device) => {
          let widgets = res.data.widgets.filter(
            (w) => w.type === 'BUTTON' && w.tabId === i,
          );
          let room = {
            id: i,
            name: device.name,
            boardType: device.boardType,
            connectionType: device.connectionType,
            widgets: widgets,
            ref: React.createRef(),
          };
          listRooms.push(room);
          i++;
        });
        setRoom(listRooms);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
    const _interval = setInterval(() => {
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

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

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

  const setSwitchValue = (value, roomId, index) => {
    let newValue = value ? '1' : '0';
    let widget = rooms[roomId].widgets[index];
    let URI = 'update/' + getPinShortCode(widget) + '?value=' + newValue;
    API.get(URI).catch((error) => console.error(error));
    let roomsVIP = _.clone(rooms);
    roomsVIP[roomId].widgets[index].value = newValue;
    setRoom(roomsVIP);
  };

  const listItem = (roomId, item, index) => (
    <View style={styles.bottomDevice}>
      <TouchableWithoutFeedback>
        <View style={styles.btnSmall}>
          <Text style={styles.nameDevice}>{item.label}</Text>
          <View style={styles.alignCenter}>
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              trackColor={{
                false: 'rgba(118, 117, 119, 0.4)',
                true: COLORS.primary,
              }}
              thumbColor={'#f4f3f4'}
              onValueChange={(value) => setSwitchValue(value, roomId, index)}
              value={item.value === '1'}
            />
            {/*<Text style={{fontFamily: 'Raleway-Regular'}}>*/}
            {/*  {item.value === '1' ? 'Bật' : 'Tắt'}*/}
            {/*</Text>*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text>Đang tải dữ liệu, đợi xíu nhé !</Text>
    </View>
  ) : (
    <SafeAreaView styles={styles.container}>
      <View>
        <View style={styles.header}>
          <TextGradient style={styles.name}>TM Platform</TextGradient>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Ionicons name="notifications" size={30} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <Tabs scrollX={scrollX} data={rooms} onItemPress={onItemPress} />
      </View>
      <View style={{marginTop: 30, height: '100%'}}>
        <Animated.FlatList
          ref={ref}
          data={rooms}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item: room}) => {
            return (
              <View>
                <View style={styles.bodyContainer}>
                  <View style={styles.vParameter}>
                    <View style={styles.paraBox}>
                      <View style={styles.paraIcon}>
                        <Entypo
                          name="thermometer"
                          size={30}
                          color={COLORS.secondary}
                        />
                        <Text style={styles.txtPara}>
                          {' '}
                          {labels[1]
                            ? parseFloat(labels[1].value).toFixed(1)
                            : '--'}
                          °C
                        </Text>
                      </View>
                      <Text style={styles.subtext}>Nhiệt độ</Text>
                    </View>
                    <View style={styles.paraBox}>
                      <View style={styles.paraIcon}>
                        <Entypo
                          name="cloud"
                          size={30}
                          color={COLORS.secondary}
                        />
                        <Text style={styles.txtPara}>
                          {' '}
                          {labels[0]
                            ? parseFloat(labels[0].value).toFixed(1)
                            : '--'}
                          %
                        </Text>
                      </View>
                      <Text style={styles.subtext}>Độ ẩm</Text>
                    </View>
                  </View>
                  {/*-------------------------*/}
                  <View style={styles.vControl}>
                    <View>
                      <TextGradient style={styles.nameRoom}>
                        {room.name}
                      </TextGradient>
                      {room.widgets.length === 0 ? (
                        <Text style={styles.desc}>Chưa có thiết bị nào.</Text>
                      ) : (
                        <Text style={styles.desc}>
                          Có{' '}
                          <Text
                            style={{
                              color: COLORS.secondary,
                              fontFamily: 'Raleway-Regular',
                            }}>
                            {room.widgets.length}
                          </Text>{' '}
                          thiết bị trong phòng.
                        </Text>
                      )}
                    </View>
                    <View style={styles.viewDevice}>
                      <FlatList
                        numColumns={2}
                        data={room.widgets}
                        keyExtractor={(widget) => widget.id.toString()}
                        renderItem={({item: widget, index}) => {
                          return listItem(room.id, widget, index);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.btnAddDevice}
                      onPress={() => navigation.navigate('Device')}>
                      <Entypo name="plus" size={25} color={COLORS.lightGray} />
                      <Text style={styles.subtext}> Thêm thiết bị mới</Text>
                    </TouchableOpacity>
                  </View>
                  {/*-------------------------*/}
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontFamily: 'Raleway-Regular',
    fontSize: 28,
    //fontWeight: '700',
    color: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  bodyContainer: {
    marginHorizontal: 10,
  },

  vParameter: {
    width: SIZES.width - 40,
    height: (SIZES.height * 10) / 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  paraBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  paraIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtPara: {
    fontSize: 18,
    color: COLORS.lightGray,
  },
  subtext: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    // fontWeight: '400',
    color: COLORS.lightGray,
  },
  alignCenter: {
    alignItems: 'center',
  },
  nameRoom: {
    fontFamily: 'Raleway-Regular',
    fontSize: 22,
    // fontWeight: '700',
    padding: 10,
  },
  desc: {
    fontFamily: 'Raleway-Regular',
    marginLeft: 10,
    fontSize: 15,
    // fontWeight: '600',
    color: COLORS.lightGray,
  },
  vControl: {
    width: SIZES.width - 40,
    height: (SIZES.height * 67) / 100,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    shadowColor: COLORS.lightGray,
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  viewDevice: {
    width: SIZES.width - 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 10,
    alignItems: 'center',
  },
  btnAddDevice: {
    marginTop: 20,
    height: 50,
    marginHorizontal: 20,
    borderColor: COLORS.lightGray,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameDevice: {
    fontFamily: 'Raleway-Regular',
    // textTransform: 'uppercase',
    fontSize: 16,
    // fontWeight: 'bold',
    color: COLORS.secondary,
  },
  btnSmall: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    width: 150,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  bottomDevice: {
    paddingBottom: 10,
  },
  //----------------------------------------------------------------
  txtTab: {
    fontFamily: 'Raleway-Regular',
    color: COLORS.lightGray,
    fontSize: 17,
    // fontWeight: '700',
    // textTransform: 'uppercase',
  },
  posTab: {
    position: 'absolute',
    width: width,
    top: 75,
  },
  spaceTab: {
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
  },
});
