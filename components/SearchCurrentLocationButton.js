import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default SearchCurrentLocationButton = (props) => {
    const cb = props.cb? props.cb: () => console.log('no callback passed in SearchCurrentLocationButton!');
    return (
        <View style = {styles.container}>
            <MaterialIcons 
                name='search' 
                color='#000000' 
                size={25}
                onPress={() => { cb() }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        left: 20,
        bottom: HEIGHT/4,
        marginBottom: 15,
        borderRadius: 50,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})