import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer,
} from 'react';
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

import {room} from './listData';
import API from '../../services/api';

const roomData = Object.keys(room).map((i) => ({
  key: i,
  title: room[i],
  ref: React.createRef(),
}));

const {width, height} = Dimensions.get('screen');

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={styles.txtTab}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({measures, scrollX}) => {
  const inputRange = roomData.map((_, i) => i * width);
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
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: COLORS.lightGray,
        bottom: -10,
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
  const [measures, setMeasures] = React.useState([]);
  const containerRef = useRef();
  React.useEffect(() => {
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
  });

  return (
    <View style={styles.posTab}>
      <View ref={containerRef} style={styles.spaceTab}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length >= 2 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [widgets, setWidgets] = useState([]);
  const [tabs, setTabs] = useState([]);

  const initialState = [];
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('Start fetching data from API ...');
    API.get('project')
      .then((res) => {
        let buttons = res.data.widgets.filter((w) => w.type === 'BUTTON');
        // let tabs = res.data.widgets.filter((w) => w.type === 'TABS').first.tabs;
        setWidgets(buttons);
        // setTabs(tabs);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
    return () => {};
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onItemPress = useCallback((itemIndex) => {
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

  const setSwitchValue = (value, index) => {
    let newValue = value ? '1' : '0';
    let widget = widgets[index];
    let URI = 'update/' + getPinShortCode(widget) + '?value=' + newValue;
    API.get(URI).catch((error) => console.error(error));
    const tempData = _.cloneDeep(widgets);
    tempData[index].value = newValue;
    setWidgets(tempData);
  };

  const listItem = ({item, index}) => (
    <View style={styles.bottomDevice}>
      <TouchableWithoutFeedback>
        <View style={styles.btnSmall}>
          <Text style={styles.nameDevice}>{item.label}</Text>
          <View style={styles.alignCenter}>
            <Switch
              trackColor={{
                false: '#767577',
                true: COLORS.primary,
              }}
              thumbColor={'#f4f3f4'}
              onValueChange={(value) => setSwitchValue(value, index)}
              value={item.value === '1'}
            />
            <Text>{item.value === '1' ? 'Bật' : 'Tắt'}</Text>
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
        <Tabs scrollX={scrollX} data={roomData} onItemPress={onItemPress} />
      </View>
      <View style={{marginTop: 30, height: '100%'}}>
        <Animated.FlatList
          ref={ref}
          data={roomData}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
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
                        <Text style={styles.txtPara}>27°C</Text>
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
                        <Text style={styles.txtPara}> 48.5%</Text>
                      </View>
                      <Text style={styles.subtext}>Độ ẩm</Text>
                    </View>
                  </View>
                  {/*-------------------------*/}
                  <View style={styles.vControl}>
                    <View>
                      <TextGradient style={styles.nameRoom}>
                        {item.title}
                      </TextGradient>
                      <Text style={styles.desc}>
                        Có tổng cộng{' '}
                        <Text style={{color: COLORS.secondary}}>
                          {widgets.length}
                        </Text>{' '}
                        thiết bị trong phòng này
                      </Text>
                    </View>
                    <View style={styles.viewDevice}>
                      <FlatList
                        numColumns={2}
                        data={widgets}
                        keyExtractor={(item) => item.id}
                        renderItem={listItem}
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
    fontSize: 28,
    fontWeight: '700',
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
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.lightGray,
  },
  alignCenter: {
    alignItems: 'center',
  },
  nameRoom: {
    fontSize: 18,
    fontWeight: '700',
    padding: 10,
  },
  desc: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
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
    textTransform: 'uppercase',
    fontSize: 16,
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
    elevation: 8,
  },
  bottomDevice: {
    paddingBottom: 10,
  },
  //----------------------------------------------------------------
  txtTab: {
    color: COLORS.lightGray,
    fontSize:
      roomData.length <= 3
        ? 17
        : roomData.length === 4
        ? 15
        : 60 / roomData.length,
    fontWeight: '700',
    textTransform: 'uppercase',
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
