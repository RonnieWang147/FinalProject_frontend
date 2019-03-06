import React from 'react';
import { 
  View, 
  StyleSheet,
  Text
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Sign up page</Text>
        </View>
      </View>
    );
  }
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