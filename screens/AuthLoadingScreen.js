import React from 'react';
import { 
  View, 
  StyleSheet,
  Text,
  Button
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
            <Text>AuthLoading page</Text>
            <Button title="Show Login page" onPress={this._showMoreApp} />
            <Button title="Actually, show signup page" onPress={this._signOutAsync} />
            <Button title="Actually, show main page" onPress={this._main} />
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Swiper');
  };

  _signOutAsync = async () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate('SignUp');
  };
  _main = async () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});