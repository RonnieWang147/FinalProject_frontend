import React from 'react';
import { 
    View, 
    StyleSheet,
    Text, 
    Image,
    Modal,
    TouchableHighlight
 } from 'react-native';
 import { AntDesign } from '@expo/vector-icons';
 import StarRating from 'react-native-star-rating';
 import { Constants, WebBrowser } from 'expo';

const Images = [
    { uri: "https://cdn.vox-cdn.com/thumbor/qI3R0shcA0ycV2ghLmpbkNtNf4s=/0x0:1100x733/1200x800/filters:focal(0x0:1100x733)/cdn.vox-cdn.com/assets/884081/Yelp_Logo_No_Outline_Color-01.jpg" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Facebook.svg/1280px-Facebook.svg.png" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]
export default BusinessModal = (props) => {
    const marker = props.marker;
    const pics = marker.type === 0? [
        {uri: marker.photos[0]},
        {uri: marker.photos[1]},
        {uri: marker.photos[2]},
    ]: '';
    return (
        <Modal
            style={styles.container}
            animationType="slide"
            transparent={false}
            visible={props.modalVisible}
        >
          <View style={styles.top}>
            <View style={styles.close}>
                <Image style={styles.logo} source={Images[marker.type]} resizeMode="contain"/>
                <AntDesign 
                    name='close' 
                    color='#000000' 
                    size={30}
                    onPress={() => props.setmodalVisible(false)} 
                />
            </View>
            <Image style={styles.image} source={marker.image} resizeMode="contain" />
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>{marker.title}</Text>
                <Text style={{width: '100%', textAlign: 'right', marginRight: 10}}>{marker.categories}</Text>
                <View style={styles.ranking}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            marker.type === 0?
                            <Image source={marker.rating} /> 
                            :
                            <StarRating 
                                disabled={true} 
                                maxStars={5} 
                                rating={marker.rating}
                                starSize={15} 
                            />
                        }
                        <Text>
                            ({marker.rating_count})
                        </Text>
                    </View>
                    <Text  style={{fontSize: 20}}>{marker.price}</Text>
                </View>
                <Text>{marker.categories}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.address}
                </Text>
                <Text>{marker.phone}</Text>
                <AntDesign 
                    name='link' 
                    color='#000000' 
                    size={30}
                    onPress={() => {WebBrowser.openBrowserAsync(marker.website); props.setmodalVisible(false)}} 
                />
                {
                    marker.type === 0?
                    <View>
                        {pics.map(pic => {
                            <Image source={pic} resizeMode="cover" />
                        })}
                    </View>
                    :
                    <Text>{marker.description}</Text>
                }

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        // justifyContent: 'center'

    },
    logo: {
        width: 90,
        height: 30,
    },
    image: {
      flex: 2,
      width: "100%",
      height: "100%",
      alignSelf: "center",
    },
    close: {
        width: '100%',
        height: 30,
        paddingHorizontal: 10,
        marginBottom: 5,
        flexDirection: 'row',
        // alignItems: 'flex-end',
        alignSelf: 'center',
        justifyContent: 'space-between',
        zIndex: 9,
    },
    ranking: {
        paddingLeft: 10,
        paddingRight: 30,
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
      color: '#000',
      paddingHorizontal: 10,
      paddingTop: 30,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
})