import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { MapView, Permissions, Location } from "expo";
import CurrentLocationButton from '../components/CurrentLocationButton';
import SearchCurrentLocationButton from '../components/SearchCurrentLocationButton';
import { yelpSearch, facebookSearch, getBusinessByID, search } from '../util/My_api';
import StarRating from 'react-native-star-rating';
import BusinessModal from '../components/BusinessModal';

const Images = [
  { uri: "https://cdn.vox-cdn.com/thumbor/qI3R0shcA0ycV2ghLmpbkNtNf4s=/0x0:1100x733/1200x800/filters:focal(0x0:1100x733)/cdn.vox-cdn.com/assets/884081/Yelp_Logo_No_Outline_Color-01.jpg" },
  { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Facebook.svg/1280px-Facebook.svg.png" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 40;

export default class screens extends Component {

    constructor(props){
        super(props);
        this.state = {
            markers: [],
            region: null,
            currentMarker: null,
            modalVisible: false,
            isLoading: false
          };
          this.handleCardPress = this.handleCardPress.bind(this);
          this.mapInit();
    }
    componentDidMount(){
        
    }
    handleCardPress(marker){
        this.setState({
            currentMarker: marker,
            modalVisible: true
        })
    }
    mapInit = async () => {
        let region = await this._getLocationAsync();
        this.setState({ region: region }, () => {
            this._getPlaces();
        });
    }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted')
        console.log("Permission to access location was denied!");
    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
    let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
    }
    // this.setState({ region: region });
    return region;
  }
  
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  // _getPlaces = async () => {
  //   this.setState({isLoading: true});
  //   let yelpMarkers = [];
  //   let facebookMarkers = [];
    
  //   const yelpStars = {
  //       '0': require('../assets/images/yelp_stars/web_and_ios/small/small_0.png'),
  //       '1': require('../assets/images/yelp_stars/web_and_ios/small/small_1.png'),
  //       '1.5': require('../assets/images/yelp_stars/web_and_ios/small/small_1_half.png'),
  //       '2': require('../assets/images/yelp_stars/web_and_ios/small/small_2.png'),
  //       '2.5': require('../assets/images/yelp_stars/web_and_ios/small/small_2_half.png'),
  //       '3': require('../assets/images/yelp_stars/web_and_ios/small/small_3.png'),
  //       '3.5': require('../assets/images/yelp_stars/web_and_ios/small/small_3_half.png'),
  //       '4': require('../assets/images/yelp_stars/web_and_ios/small/small_4.png'),
  //       '4.5': require('../assets/images/yelp_stars/web_and_ios/small/small_4_half.png'),
  //       '5': require('../assets/images/yelp_stars/web_and_ios/small/small_5.png'),

  //   }
    
  //   let yelpData = await yelpSearch(this.state.region.latitude, this.state.region.longitude);
  //   if(yelpData){
  //       yelpMarkers = yelpData.map( business => {
  //           return {
  //               type: 0,
  //               coordinate: {
  //                   latitude: business.coordinates.latitude,
  //                   longitude: business.coordinates.longitude,
  //               },
  //               title: business.name,
  //               categories: business.categories.map(category => category.title).join('/'),
  //               phone: business.display_phone,
  //               address: business.location.display_address.join(" "),
  //               image: business.image_url?{uri: business.image_url}:Images[0],
  //               price: business.price,
  //               website: business.url,
  //               photos: business.photos,
  //               rating_count: business.review_count,
  //               rating: yelpStars[`${business.rating}`]
  //           }
  //       });
  //   }
    
  //   let facebookData = await facebookSearch(this.state.region.latitude, this.state.region.longitude);
  //   if(facebookData){
  //       facebookMarkers = facebookData.data.map( business => {
  //           return {
  //               type: 1,
  //               coordinate: {
  //                 latitude: business.location.latitude,
  //                 longitude: business.location.longitude,
  //               },
  //               title: business.name,
  //               categories: business.category_list.name,
  //               phone: business.phone,
  //               address: business.single_line_address,
  //               image: business.hasOwnProperty('cover')?
  //                       {uri: business.cover.source}
  //                       :
  //                       Images[1],
  //               price: business.price_range,
  //               website: business.website?business.website.indexOf('http')>-1? business.website:'http://'+business.website:"",
  //               description: business.description,
  //               rating_count: business.rating_count,
  //               rating: business.overall_star_rating
  //           }
  //       });
  //   }
  //       this.setState({
  //           markers: [...yelpMarkers, ...facebookMarkers],
  //           currentMarker: yelpMarkers[0],
  //           isLoading: false
  //       })
  // }
  _getPlaces = async () => {
    this.setState({isLoading: true});
    
    const yelpStars = {
        '0': require('../assets/images/yelp_stars/web_and_ios/small/small_0.png'),
        '1': require('../assets/images/yelp_stars/web_and_ios/small/small_1.png'),
        '1.5': require('../assets/images/yelp_stars/web_and_ios/small/small_1_half.png'),
        '2': require('../assets/images/yelp_stars/web_and_ios/small/small_2.png'),
        '2.5': require('../assets/images/yelp_stars/web_and_ios/small/small_2_half.png'),
        '3': require('../assets/images/yelp_stars/web_and_ios/small/small_3.png'),
        '3.5': require('../assets/images/yelp_stars/web_and_ios/small/small_3_half.png'),
        '4': require('../assets/images/yelp_stars/web_and_ios/small/small_4.png'),
        '4.5': require('../assets/images/yelp_stars/web_and_ios/small/small_4_half.png'),
        '5': require('../assets/images/yelp_stars/web_and_ios/small/small_5.png'),

    }
    let markers = [];
    let searchData = await search(this.state.region.latitude, this.state.region.longitude);
    if(searchData && searchData.rc === 1){
        markers = searchData.result.map( business => (
          {
            ...business, 
            image: business.image?{uri:business.image}:Images[business.type],
            rating: business.type === 0? yelpStars[`${business.rating}`]:business.rating
          }
        )
            // return {
            //     type: 0,
            //     coordinate: {
            //         latitude: business.coordinates.latitude,
            //         longitude: business.coordinates.longitude,
            //     },
            //     title: business.name,
            //     categories: business.categories.map(category => category.title).join('/'),
            //     phone: business.display_phone,
            //     address: business.location.display_address.join(" "),
            //     image: business.image_url?{uri: business.image_url}:Images[0],
            //     price: business.price,
            //     website: business.url,
            //     photos: business.photos,
            //     rating_count: business.review_count,
            //     rating: yelpStars[`${business.rating}`]
            // }
            )
        this.setState({
            markers: markers,
            currentMarker: markers[0],
            isLoading: false
        })
    }
  }

  centerMap = async () => {
      
    let region = await this._getLocationAsync();
    this.setState({region: region}, () => {
        const { latitude, longitude } = this.state.region; 
  
        this.map.animateToRegion({
            latitude,
            longitude
        })
    });
  }
  render() {
    const interpolations = this.state.markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * (CARD_WIDTH + 40),
          (index - 0.5) * (CARD_WIDTH + 40),
          index * (CARD_WIDTH + 40),
          ((index + 0.5) * (CARD_WIDTH + 40)),
          ((index + 1) * (CARD_WIDTH + 40)),
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 1, 2.5, 1, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35,0.35, 1, 0.35, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
      });
    return (
      <View style={styles.container}>
        {
            this.state.currentMarker &&
            <BusinessModal 
            modalVisible={this.state.modalVisible} 
            setmodalVisible={(value) => this.setState({modalVisible: value})} 
            marker={this.state.currentMarker}
            />
        }
        
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={false}
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
        {this.state.markers.map((marker, index) => {
            const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              let styleType = marker.type;
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
                {
                    styleType === 0 ?
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                        <Animated.View style={[styles.yelpRing, scaleStyle]} />
                        <View style={styles.yelpMarker} />
                    </Animated.View>
                    :
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                        <Animated.View style={[styles.facebookRing, scaleStyle]} />
                        <View style={styles.facebookMarker} />
                    </Animated.View>

                }
            </MapView.Marker>
          );
        })}
        </MapView>
        <CurrentLocationButton cb={this.centerMap}/>
        <SearchCurrentLocationButton cb={this._getPlaces}/>
        
      {
        this.state.isLoading?
          <View style={styles.spinner}>
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
          :
          <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={(CARD_WIDTH + 40)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
      {this.state.markers.map((marker, index) => {
        return (
            <TouchableWithoutFeedback key={marker.title+marker.type} onPress={() => this.handleCardPress(marker)}>
                <View style={styles.card} key={index}>
                <Image
                    source={marker.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
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
                    <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.address}
                    </Text>
                    <Text>{marker.description}</Text>
                </View>
                </View >
            </TouchableWithoutFeedback>
        )
        })}
      </Animated.ScrollView>
      }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  spinner: {
    position: "absolute",
    bottom: 0,
    left: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 2,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  yelpMarker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,20, 0.9)",
    },
    facebookMarker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(20,150,200, 0.9)",
    },
  yelpRing: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,20, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,20, 0.5)",
    },
    facebookRing: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(20,150,200, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(20,150,200, 0.5)",
    },
});
