import React, {useState, useRef} from 'react';
import {
  StatusBar,
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

import {TextGradient} from '../../components/index';
import {COLORS, SIZES} from '../../utils/theme';

import {room, device} from './listData';

const {width, height} = Dimensions.get('screen');

const data = Object.keys(room).map((i) => ({
  key: i,
  title: room[i],
  ref: React.createRef(),
}));

const deviceData = Object.keys(device).map((i) => ({
  index: i,
  name: device[i],
}));

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
  const inputRange = data.map((_, i) => i * width);
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
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const Home = ({navigation}) => {
  const [states, setStates] = React.useState({
    listRoom: room,
    enabled: false,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <SafeAreaView styles={styles.container}>
      <View>
        <View style={styles.header}>
          <TextGradient style={styles.name}>Smart Home</TextGradient>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Ionicons name="notifications" size={30} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
      </View>
      <View style={{marginTop: 30}}>
        <Animated.FlatList
          ref={ref}
          data={data}
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
                      <Text style={styles.subtext}>Celsius</Text>
                    </View>
                    <View style={styles.paraBox}>
                      <View style={styles.paraIcon}>
                        <Entypo
                          name="cloud"
                          size={30}
                          color={COLORS.secondary}
                        />
                        <Text style={styles.txtPara}> 48.5 %</Text>
                      </View>
                      <Text style={styles.subtext}>Humidity</Text>
                    </View>
                  </View>
                  {/*-------------------------*/}
                  <View style={styles.vControl}>
                    <View>
                      <TextGradient style={styles.nameRoom}>
                        {item.title}
                      </TextGradient>
                      <Text style={styles.desc}>
                        Total have{' '}
                        <Text style={{color: COLORS.secondary}}>
                          {data.length}
                        </Text>{' '}
                        device in your Room
                      </Text>
                    </View>
                    <View style={styles.viewDevice}>
                      <FlatList
                        numColumns={2}
                        data={deviceData}
                        keyExtractor={(item) => item.index}
                        renderItem={({item}) => {
                          return (
                            <View style={styles.bottomDevice}>
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  navigation.navigate('DeviceDetail', {item})
                                }>
                                <View style={styles.btnSmall}>
                                  <Text style={styles.nameDevice}>
                                    {item.name}
                                  </Text>
                                  <View style={styles.alignCenter}>
                                    <Switch
                                      trackColor={{
                                        false: '#767577',
                                        true: '#fff021',
                                      }}
                                      thumbColor={
                                        states.isEnabled ? '#f5dd4b' : '#f4f3f4'
                                      }
                                      onValueChange={toggleSwitch}
                                      value={states.isEnabled}
                                    />
                                    <Text>
                                      {states.isEnabled ? 'ON' : 'OFF'}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                          );
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.btnAddDevice}
                      onPress={() => navigation.navigate('Device')}>
                      <Entypo name="plus" size={25} color={COLORS.lightGray} />
                      <Text style={styles.subtext}> Add new device</Text>
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
    height: (SIZES.height * 72) / 100,
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
    flexDirection: 'row',
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
    fontSize: data.length <= 3 ? 17 : data.length === 4 ? 15 : 60 / data.length,
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
