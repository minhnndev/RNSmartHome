import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

import Video from 'react-native-video';

import axios from 'axios';

class AssistantScreen extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    answer: '',
    audioKey: 1,
    audioUrl: '',
    paused: false,
    grantedPermission: false,
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Cấp quyền âm thanh trợ lý ảo',
          message: 'Cho tao quyền ghi âm thanh đi :P',
          buttonNeutral: 'Để tao suy nghĩ lại',
          buttonNegative: 'Hong',
          buttonPositive: 'Oke nha',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    let message;
    switch (e.error.code) {
      case '9':
        message = 'Chưa được cấp quyền ghi âm thanh!';
        break;
      default:
        message = 'Có lỗi xảy ra!';
    }
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      150,
    );
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });

    if (e.value.length > 0) {
      axios
        .get('http://45.119.212.43:3001/api/nlp', {
          params: {
            q: e.value[0],
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.setState({
            answer: response.data.answer,
            audioUrl: response.data.voice,
            audioKey: this.state.audioKey + 1,
            paused: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    // console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    if (!this.state.grantedPermission) {
      let granted = await this.requestCameraPermission();
      this.setState({grantedPermission: granted});
    }

    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      answer: '',
    });

    this.setState({paused: true});

    try {
      await Voice.start('vi-VN');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    const audio =
      this.state.audioUrl === '' ? null : (
        <Video
          key={this.state.audioKey}
          source={{uri: this.state.audioUrl}}
          audioOnly={true}
          autoplay={true}
          controls={false}
          disableFocus={true}
          paused={this.state.paused}
        />
      );
    return (
      <View style={styles.container}>
        {audio}
        <Text
          style={{
            ...styles.stat,
            color: '#1765cf',
          }}>{`${
          this.state.results.length > 0 ? this.state.results[0] : ''
        }`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image
            style={styles.button}
            source={require('../../assets/img/record.png')}
          />
        </TouchableHighlight>
        <Text style={styles.stat}>{`${this.state.answer}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    fontSize: 30,
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
});

export default AssistantScreen;
