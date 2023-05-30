import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import MapViewDirections from "react-native-maps-directions";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

var { width, height } = Dimensions.get("window");

const DistanceDisplay = ({ distance }: { distance: string }) => {
  return (
    <View style={styles.distanceDisplayContainer}>
      <Text style={styles.distanceDisplayText}>{distance} km</Text>
    </View>
  );
};

const Map = ({ route }: { route: any }) => {
  const place = route.params.place;
  const lat = route.params.latitude;
  const lng = route.params.longitude;
  const [mLat, setMlat] = useState(0);
  const [mLong, setMlong] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [renderDirections, setRenderDirections] = useState(false);
  const [distance, setDistance] = useState("0");
  const [isMovingDestination, setIsMovingDestination] = useState(false);
  const [destination, setDestination] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef<MapView>(null);
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  const GOOGLE_MAPS_APIKEY = "AIzaSyAnuL_aIiVuU9J7IXjOu49Gx7IsQVxJE98";
  const [Pic, setPic] = useState('');

  useEffect(() => {
    db.collection('users')
      .doc(uid)
      .collection('Profile')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          renderData(doc);
        });
      });
  }, [db, uid]);

  function renderData(doc: any) {
    setPic(doc.data().ProfilePic);
  }

  useEffect(() => {
    const fetchLocation = async () => {
      await requestLocationPermission();
      getLocation();
      setIsLoading(false);
    };

    fetchLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "WanderBuddy Location Permission",
          message:
            "WanderBuddy needs access to your location " +
            "in order to use the trip feature.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
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
        calculateDistance(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log(position);
        setMlat(position.coords.latitude);
        setMlong(position.coords.longitude);
        calculateDistance(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 10 } // Update every 10 meters
    );

    return () => {
      // Cleanup the watchPosition listener when component unmounts
      Geolocation.clearWatch(watchId);
    };
  };

  
  const calculateDistance = (latitude: number, longitude: number) => {
    const earthRadius = 6371; // in kilometers
    const latDiff = ((destination.latitude - latitude) * Math.PI) / 180;
    const lngDiff = ((destination.longitude - longitude) * Math.PI) / 180;
    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos((latitude * Math.PI) / 180) *
        Math.cos((destination.latitude * Math.PI) / 180) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    setDistance(distance.toFixed(2)); // Round to 2 decimal places and convert to string
  };

  const handleDestinationMarkerPress = () => {
    setIsMovingDestination(true);
  };

  const handleMapPress = (event: any) => {
    if (isMovingDestination) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      const newDestination = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setDestination(newDestination);
      calculateDistance(latitude, longitude);
      setIsMovingDestination(false);
    }
  };
  
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapcontainer}
        userInterfaceStyle={"dark"}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        region={destination}
        onPress={handleMapPress}
      >
        <Marker coordinate={destination} pinColor="red" onPress={handleDestinationMarkerPress} draggable={isMovingDestination} />
        <MapViewDirections
          origin={{
            latitude: mLat,
            longitude: mLong,
          }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
        />
        <Marker coordinate={{ latitude: mLat, longitude: mLong }}>
          <Image source={{ uri: 'data:image/jpg;base64,' + Pic }} style={styles.markerImage} />
        </Marker>
      </MapView>
      <DistanceDisplay distance={distance} />
    </View>
  );
};

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
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  distanceDisplayContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
    zIndex: 999,
  },
  distanceDisplayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
