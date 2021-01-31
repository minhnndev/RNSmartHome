import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {COLORS, SIZES} from '../../utils/theme';

const {width, height} = Dimensions.get('screen');

const images = {
  Livingroom: require('../../assets/img/livingRoom'),
  Bedroom: require('../../assets/img/bedRoom'),
  Kitchen: require('../../assets/img/kitchen'),
  Bathroom: require('../../assets/img/bathRoom'),
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
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

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
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
    </View>
  );
};

const home = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  const [status, setStatus] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView styles={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Smart Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/minhdev.jpg')}
            style={styles.imageMember}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <Image
          source={require('../../assets/img/livingRoom.jpg')}
          style={styles.imgRoom}
        />
        <Text style={styles.txtRoom}>Home</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.createTabs}>
          <TouchableOpacity onPress={() => navigation.navigate('Project')}>
            <View style={styles.btnTop}>
              <AntDesign name="plus" size={40} color={COLORS.white} />
              <Text style={styles.subtext}>Create</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.btnTop}>
              <AntDesign name="qrcode" size={40} color={COLORS.white} />
              <Text style={styles.subtext}>QR Code</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <View style={styles.btnSmall}>
            <SimpleLineIcons name="home" size={30} color={COLORS.primary} />
            <View style={styles.top}>
              <Switch
                trackColor={{false: '#767577', true: '#fff021'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
            </View>
          </View>
          <View style={styles.btnSmall}>
            <Entypo
              name={isEnabled ? 'light-up' : 'light-down'}
              size={30}
              color={COLORS.primary}
            />
            <View style={styles.top}>
              <Switch
                trackColor={{false: '#767577', true: '#fff021'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnRow}>
          <View style={styles.btnSmall}>
            <SimpleLineIcons
              name={isEnabled ? 'control-play' : 'control-pause'}
              size={30}
              color={COLORS.primary}
            />
            <View style={styles.top}>
              <Switch
                trackColor={{false: '#767577', true: '#fff021'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
            </View>
          </View>
          <View style={styles.btnSmall}>
            <SimpleLineIcons
              name={isEnabled ? 'volume-2' : 'volume-off'}
              size={30}
              color={COLORS.primary}
            />
            <View style={styles.top}>
              <Switch
                trackColor={{false: '#767577', true: '#fff021'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  top: {
    alignItems: 'center',
  },
  createTabs: {
    backgroundColor: COLORS.primary,
    height: (SIZES.height * 15) / 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  imgRoom: {
    width: (SIZES.width * 100) / 100,
    height: (SIZES.height * 25) / 100,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  txtRoom: {
    marginTop: -25,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    paddingVertical: 10,
    width: 300,
    backgroundColor: COLORS.white,
    textAlign: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 8,
  },
  subtext: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  bodyContainer: {
    marginHorizontal: 10,
  },

  imageMember: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  btnTop: {
    alignItems: 'center',
  },
  btnSmall: {
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
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
});
