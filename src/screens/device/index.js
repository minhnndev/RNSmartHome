import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  Switch,
  TouchableOpacity,
  FlatList,
  processColor,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from 'react-native-slider';
import {LineChart} from 'react-native-charts-wrapper';
import _, {floor, map} from 'lodash';

import {TextGradient, Background} from '../../components/index';
import {COLORS, SIZES, FONTS} from '../../utils/theme';

import API from '../../services/api';
const greenBlue = 'rgba(146, 141, 171, 0.8)';
const petrel = 'rgba(0, 210, 255, 0.8)';
const thermFillA = 'rgba(255, 0, 0, 0.8)';
const thermFillB = 'rgba(255, 255, 0, 0.8)';
const {width, height} = Dimensions.get('screen');

const Home = ({navigation, route}) => {
  const {room, labels} = route.params;
  // console.log(room.widgets);
  const [rooms, setRoom] = useState([]);

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

  const setSwitchValue = (type, value, index) => {
    let roomWidgets = room.widgets;
    let newValue;
    switch (type) {
      case 'SLIDER':
        newValue = value.toString();
        break;
      case 'BUTTON':
      default:
        newValue = value ? '1' : '0';
        break;
    }
    let widget = roomWidgets[index];
    let URI = 'update/' + getPinShortCode(widget) + '?value=' + newValue;
    API.get(URI).catch((error) => console.error(error));

    let roomWidgetsUpdated = _.clone(roomWidgets);
    roomWidgetsUpdated[index].value = newValue;
    setRoom(roomWidgetsUpdated);

    console.log('Switch change ....');
  };

  const listItem = (item, index) => (
    <View style={styles.bottomDevice}>
      {item.type === 'BUTTON' && (
        <View style={styles.switchControl}>
          <Entypo
            name={item.value === 1 ? 'light-down' : 'light-up'}
            size={25}
            color={COLORS.secondary}
          />
          <Text style={styles.nameDevice}>{item.label}</Text>
          <View style={styles.alignCenter}>
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              trackColor={{
                false: 'rgba(118, 117, 119, 0.4)',
                true: COLORS.primary,
              }}
              thumbColor={'#f4f3f4'}
              onValueChange={(value) => setSwitchValue(item.type, value, index)}
              value={item.value === '1'}
            />
          </View>
        </View>
      )}
    </View>
  );

  const listSlide = (item, index) => (
    <View>
      {item.type === 'SLIDER' && (
        <View style={styles.slideControl}>
          <View style={styles.viewNameSlider}>
            <Text style={styles.nameDevice}>{item.label}</Text>
            <Ionicons name="ios-options" size={28} color={COLORS.lightGray} />
          </View>
          <Slider
            minimumValue={parseInt(item.min, 10)}
            maximumValue={parseInt(item.max, 10)}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor={COLORS.primary}
            thumbTouchSize={{width: 50, height: 40}}
            value={parseInt(item.value, 10)}
            onValueChange={(value) => setSwitchValue(item.type, value, index)}
          />
          <Text>Độ mở: {parseInt(item.value, 10)}°</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Background
        height={(height / 100) * 16}
        width={width}
        style={styles.bgHead}
      />
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
      <View style={styles.chart}>
        <LineChart
          style={styles.chartAnalytics}
          data={{
            dataSets: [
              {
                values: [
                  {
                    y: 68.2,
                    x: 0,
                    marker: '68.2%',
                  },
                  {
                    y: 77.3,
                    x: 1,
                    marker: '77.3%',
                  },
                  {
                    y: 71.9,
                    x: 2,
                    marker: '71.9%',
                  },
                  {
                    y: 78.7,
                    x: 3,
                    marker: '78.7%',
                  },
                  {
                    y: 69.5,
                    x: 4,
                    marker: '69.5%',
                  },
                  {
                    y: 73.3,
                    x: 5,
                    marker: '73.3%',
                  },
                ],
                label: 'Độ ẩm',
                config: {
                  mode: 'CUBIC_BEZIER',
                  drawValues: false,
                  lineWidth: 2,
                  drawCircles: true,
                  circleColor: processColor(COLORS.primary),
                  drawCircleHole: false,
                  circleRadius: 5,
                  highlightColor: processColor('transparent'),
                  color: processColor(petrel),
                  drawFilled: true,
                  fillGradient: {
                    colors: [processColor(petrel), processColor(greenBlue)],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: 'TOP_BOTTOM',
                  },
                  fillAlpha: 1000,
                  valueTextSize: 15,
                },
              },

              {
                values: [
                  {
                    y: 30.3,
                    x: 0,
                    marker: '30.3°C',
                  },
                  {
                    y: 34.6,
                    x: 1,
                    marker: '29.6°C',
                  },
                  {
                    y: 33.2,
                    x: 2,
                    marker: '33.2°C',
                  },
                  {
                    y: 32.4,
                    x: 3,
                    marker: '32.4°C',
                  },
                  {
                    y: 33.5,
                    x: 4,
                    marker: '33.5°C',
                  },
                  {
                    y: 31.1,
                    x: 5,
                    marker: '31.1°C',
                  },
                ],
                label: 'Nhiệt độ',
                config: {
                  mode: 'CUBIC_BEZIER',
                  drawValues: false,
                  lineWidth: 2,
                  drawCircles: true,
                  circleColor: processColor('#ff7e5f'),
                  drawCircleHole: false,
                  circleRadius: 5,
                  highlightColor: processColor('transparent'),
                  color: processColor('#feb47b'),
                  drawFilled: true,
                  fillGradient: {
                    colors: [
                      processColor(thermFillA),
                      processColor(thermFillB),
                    ],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: 'TOP_BOTTOM',
                  },
                  fillAlpha: 1000,
                  valueTextSize: 15,
                },
              },
            ],
          }}
          chartDescription={{text: ''}}
          legend={{
            enabled: true,
          }}
          marker={{
            enabled: true,
            markerColor: processColor('white'),
            textColor: processColor('black'),
          }}
          xAxis={{
            enabled: true,
            granularity: 1,
            drawLabels: true,
            position: 'BOTTOM',
            drawAxisLine: true,
            drawGridLines: false,
            fontFamily: 'HelveticaNeue-Medium',
            fontWeight: 'bold',
            textSize: 12,
            textColor: processColor('gray'),
            valueFormatter: ['0h', '4h', '8h', '12h', '16h', '20h'],
          }}
          yAxis={{
            left: {
              enabled: false,
            },
            right: {
              enabled: false,
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: 'EaseInOutQuart',
          }}
          drawGridBackground={false}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={false}
          scaleEnabled={false}
          scaleXEnabled={false}
          scaleYEnabled={false}
          pinchZoom={false}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
        />
      </View>
      <View style={{marginTop: 30, height: '100%'}}>
        {room.widgets.map((widget, item) => {
          return listSlide(widget, item);
        })}
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
  bgHead: {
    position: 'absolute',
    zIndex: -99,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: COLORS.black,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  chartAnalytics: {
    width: width - 20,
    height: 120,
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
    color: COLORS.darkgray,
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
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 3,
  },
  viewNameSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slideControl: {
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: width - 40,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
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
