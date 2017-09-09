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
import { ImagePicker } from 'expo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class UploadScreen extends Component {
  state = {
    image: null,
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
      {image &&
        <Image source={{ uri: image }} style={{ width: 350, height: 520 }} />}
        <Button
          title="Pick a page to translate"
          color="#61b3e2"
          onPress={this._pickImage}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => {}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
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
