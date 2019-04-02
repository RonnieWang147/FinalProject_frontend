import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SwiperScreen from '../screens/SwiperScreen';
import MapScreen from '../screens/MapScreen';

// const SignUpStack = createStackNavigator({
//   SignUp: SignUpScreen,
// });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  AuthLoading: AuthLoadingScreen,
  Swiper: SwiperScreen,
  Main: MainTabNavigator,
  SignUp: SignUpScreen,
  Map: MapScreen,
},
{
  initialRouteName: 'Swiper',
}
));