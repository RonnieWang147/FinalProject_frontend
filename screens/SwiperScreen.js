import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperScreen extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
          <TouchableOpacity style={styles.btn1} onPress={this._toLogin}>
          <Text style={styles.text2}>Get start</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
  _toLogin = () => {
    this.props.navigation.navigate("Login");
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  btn1: {
    marginTop: 10,
//   borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text2: {
    color: '#92BBD9',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
