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
import { ImagePicker, FileSystem } from 'expo';
import ActionButton from 'react-native-action-button';


import { Ionicons } from '@expo/vector-icons';

export default class Main extends Component {
  state = {
    image: null,
    base64: null,
  };
  static navigationOptions = {
    header: null,
  };

  render() {


    let { image } = this.state;
    return (
      <View style={styles.container}>

      <Image source={require('./assets/images/nitori.png')} resizeMode={'contain'} style={{width: 350, height: 500, flex: 1}}/>

      {image &&
        <Image source={{ uri: image }} style={{ width: 350, height: 520 }} />}
        <ActionButton buttonColor="rgba(50,187,231,1)">
          <ActionButton.Item buttonColor='#32D4E7' title="Manual" onPress={() => {}}>
              <Ionicons name="ios-brush" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#38CF7F' title="Upload" onPress={this._pickImage}>
            <Ionicons name="md-cloud-upload" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#32D4E7' title="Camera" onPress={() => {}}>
            <Ionicons name="ios-camera" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#38CF7F' title="Translate" onPress={() => this.handleSubmit()}>
            <Ionicons name="md-swap" size={32} color="white" />
          </ActionButton.Item>
          buttonColor="rgba(50,187,231,1)"
        </ActionButton>

      </View>

    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ data: result.base64 });
    }
  };



  handleSubmit() {
    fetch('https://646b3028.ngrok.io/pstimgmob', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: this.state.data,
        })
      })
      .then(response => {
        this.setState({ image: 'data:image/png;base64,'+response["_bodyText"] });
      });

    }
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
    backgroundColor: '#82C057',
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
