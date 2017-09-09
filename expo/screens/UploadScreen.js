import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImagePicker } from 'expo';

import { MonoText } from '../components/StyledText';

export default class UploadScreen extends React.Component {
  state = {
    image: null,
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image &&
        <Image source={{ uri: image }} style={{ width: 350, height: 520 }} />}
        <Button
          title="Pick a page to translate"
          onPress={this._pickImage}
        />
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
