import React, { Component } from 'react';

import {
  StackNavigator,
} from 'react-navigation';

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
import { WebBrowser, Camera, Permissions } from 'expo';
import { MonoText } from './components/StyledText';
import { ImagePicker, FileSystem } from 'expo';

import ActionButton from 'react-native-action-button';

import { Ionicons } from '@expo/vector-icons';

class Kero extends Component {
  state = {
    image: null,
    base64: null,
  };
  static navigationOptions = {
    title: 'Kero'
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
          <ActionButton.Item buttonColor='#32D4E7' title="Camera" onPress={this._openCamera}>
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

  _openCamera = () => {
    this.props.navigation.navigate('Camera');
  }



  handleSubmit() {
    fetch('https://b5e7152f.ngrok.io/pstimgmob', {
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


class CameraScreen extends React.Component {
    static navigationOptions = {
        title: 'Camera'
    };
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    takePicture = () => {
        if (this.camera) {
            let result = this.camera.takePictureAsync({
              allowsEditing: false,
              base64: true
            })
            .then(data => {
              this.setState({image: data});
            })
            .catch(err => console.error(err));
        }
        else {
          console.log("rip");
        }

        // console.log(result)

        // if (!result.cancelled) {
        //   this.setState({ image: result.uri });
        //   this.setState({ data: result.base64 });
        // }
    }

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
                <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                }}
                onPress={() => {
                    this.setState({
                        type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                }}>
                <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Flip{' '}
                </Text>
                </TouchableOpacity>
                </View>
                </Camera>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}/>
                </View>

                </View>


            );
        }
    }

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
      padding: 25,
      backgroundColor: 'white',
      borderRadius: 45,
    },
});


export default StackNavigator({
  Kero: {
    screen: Kero,
  },
  Camera: {
    screen: CameraScreen,
  },
});