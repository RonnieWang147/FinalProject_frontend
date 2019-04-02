import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperScreen extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} loop={false}>
        <View style={styles.slide1}>
            <ImageBackground source={require('../assets/images/city.jpg')} style={styles.background}>
                <Text style={styles.text}>Discover amazing things</Text>
            </ImageBackground>
        </View>
        <View style={styles.slide2}>
            <ImageBackground source={require('../assets/images/food.jpg')} style={styles.background}>
                <Text style={styles.text}>Taste delicious food</Text>
            </ImageBackground>
        </View>
        <View style={styles.slide3}>
            <ImageBackground source={require('../assets/images/art.jpg')} style={styles.background}>
                <Text style={styles.text}>Enjoy pure art</Text>
                <TouchableOpacity style={styles.btn1} onPress={this._toLogin}>
                <Text style={styles.text2}>Get start</Text>
                </TouchableOpacity>
            </ImageBackground>
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
  background: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#92BBD9'
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
    color: 'rgb(60, 91, 112)',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
