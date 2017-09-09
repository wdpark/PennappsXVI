import React, { Component } from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Font,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImagePicker, Permissions, Camera } from 'expo';
import ActionButton from 'react-native-action-button';
import * as camera from './screens/CameraScreen.js'

import { Ionicons } from '@expo/vector-icons';

export default class Main extends Component {
  state = {
    image: null,
    hasCameraPermission: null,
  };
  static navigationOptions = {
    header: null,
  };

  async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    } else {
        return (
            <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
            }}>

            </View>
            </Camera>
            </View>
        );
    }

    let { image } = this.state;
    return (
      <View style={styles.container}>
      {image &&
        <Image source={{ uri: image }} style={{ width: 350, height: 520 }} />}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3498db' title="Manual" onPress={() => {}}>
              <Ionicons name="ios-brush" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Upload" onPress={this._pickImage}>
            <Ionicons name="md-cloud-upload" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Camera" onPress={() => {}}>
            <Ionicons name="ios-camera" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Translate" onPress={() => {}}>
            <Ionicons name="md-swap" size={32} color="white" />
          </ActionButton.Item>
          buttonColor="rgba(231,76,60,1)"
        </ActionButton>

      </View>

    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,

    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({

  actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: 'white',
  fontFamily: 'Ionicons'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
