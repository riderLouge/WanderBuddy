import React,{useEffect} from "react";
import { View, Text ,StyleSheet,Dimensions, PermissionsAndroid} from "react-native";
import MapView,{ Marker, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { log } from "react-native-reanimated";

var { width, height } = Dimensions.get('window');

const Map = ({route}) => {

  const place = route.params.place;
  const lat= route.params.latitude;
  const lng = route.params.longitude;
  const [mLat,setMlat] = React.useState(0);  
  const [mLong,setMlong] = React.useState(0);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAnuL_aIiVuU9J7IXjOu49Gx7IsQVxJE98';
  
  useEffect(() => {
    requestLocationPermission();
    getLocation();
  },[]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'WanderBuddy Location Permission',
          message:
            'WanderBuddy needs access to your location ' +
            'in order to use trip feature.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setMlat(position.coords.latitude);
          setMlong(position.coords.longitude);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const destination = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
  
  const currentLocation = {
    latitude: mLat,
    longitude: mLong,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  return (
     <View style={styles.container}>
        <MapView style = {styles.mapcontainer}
                  userInterfaceStyle={'dark'}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  zoomEnabled = {true}
                  region={destination}>
            <Marker
              coordinate={currentLocation}
              pinColor="blue"
            /> 
            <Marker
              coordinate={destination}
              pinColor="red"
            />   
            <MapViewDirections
              origin={currentLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
            />
      </MapView>
   </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
mapcontainer: {
    flex: 1,
    width: width,
    height: height,
  },
})