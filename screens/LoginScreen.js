import React from 'react';
import { 
  View, 
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { LoginSubmit } from '../util/My_api';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: null,
      username: "",
      password: "",
    }
  }
  static navigationOptions = {
    title: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text>Welcome!</Text>
          <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          />
          <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />
          <Button title="Forget password?" onPress={this._forget} />
          <TouchableOpacity style={styles.btn} onPress={this._signInAsync}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _forget =  () => {
    this.props.navigation.navigate('SignUp');
  }
  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', );
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  container1: {
    // flex: 1,
    // paddingTop: '10%',
    height: 200,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    height: 40, 
    width: '80%', 
    borderColor: 'gray', 
    borderBottomWidth: 1
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#9DD6EB',
    borderRadius: 3
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#AAAAAA'
  }
});