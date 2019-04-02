import React from 'react';
import { 
  View, 
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { LoginSubmit } from '../util/My_api';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      wariningMsg: ""
    }
  }
  static navigationOptions = {
    title: null,
  };

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
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
          <TouchableOpacity style={styles.btn} onPress={this._signInAsync}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Button title="Forget password?" onPress={this._forget} />
      </View>
    );
  }

  resetState(){
    this.setState({
      username: "",
      password: "",
    })
  }
  _forget =  () => {
    this.props.navigation.navigate('SignUp');
  }
  _signInAsync = async () => {
    
    this.props.navigation.navigate('Main');
    // const data = await LoginSubmit(this.state.username, this.state.password);
    // console.log(JSON.stringify(data));
    // if(data&&data.rc===1){
    //   await AsyncStorage.clear();
    //   await AsyncStorage.setItem('jwt', data.token);
    //   // await AsyncStorage.setItem('refreshtoken', data.reftkn);
    //   await AsyncStorage.setItem('username', data.username);
      
    //   this.props.navigation.navigate('Main');
    // }
    // else{
    //   this.resetState();
    //   this.setState({
    //     wariningMsg: data.msg
    //   });
    // }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '40%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: '#92BBD9',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
    height: 50, 
    width: '90%', 
    borderColor: 'gray', 
    borderBottomWidth: 1
  },
  btn: {
    backgroundColor: '#3a3ca1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '90%',
    padding: 10,
    borderRadius: 2
  },
  loginText: {
    fontSize: 15,
    color: '#FFFFFF'
  }
});