import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

export default function Trip() {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePlaceSelected = (data : any, details : any) => {
    const { structured_formatting } = data;
    const { geometry } = details;
    setLocation(structured_formatting.main_text);
    setLat(geometry.location.lat);
    setLng(geometry.location.lng);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          onPress={handlePlaceSelected}
          fetchDetails
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
            listView: styles.listView,
            row: styles.row,
            textInputContainer: styles.textInputContainer,
            description: styles.description,
          }}
          textInputProps={{
            placeholderTextColor: 'grey',
            returnKeyType: "search",
            color: 'black'
          }}          
          query={{
            key: 'AIzaSyAnuL_aIiVuU9J7IXjOu49Gx7IsQVxJE98',
            language: 'en',
          }}
        />
        <View style={styles.searchButton}>
          <Icon
            name="search"
            size={30}
            style={styles.searchIcon}
            onPress={() => navigation.push('Map', { place: location, latitude: lat, longitude: lng })}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.completedRides}>
          <Text style={styles.completedRidesText}>Completed Rides</Text>
        </View>
        <Image source={require('../Assets/Munnar.jpg')} style={styles.image} />
        <Image source={require('../Assets/Coorg.jpg')} style={styles.image} />
        <Image source={require('../Assets/Vagamon.jpg')} style={styles.image} />
        <View style={styles.addRideContainer}>
          <Icon name="add-outline" size={100} style={styles.addRideIcon} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  autocompleteContainer: {
    flex: 1,
    backgroundColor: '#1f1e1e',
    borderRadius: 8,
    marginRight: 10,
  },
  autocompleteInput: {
    color: 'grey',
  },
  listView: {
    backgroundColor: 'white',
  },
  row: {
    backgroundColor: 'transparent',
  },
  textInputContainer: {
    backgroundColor: 'transparent',
  },
  description: {
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#1f1e1e',
    borderRadius: 10,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  completedRides: {
    height: 50,
    width: width - 50,
    backgroundColor: '#1f1e1e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  completedRidesText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: width - 50,
    height: width / 2.5,
    borderRadius: 10,
    marginBottom: 20,
  },
  addRideContainer: {
    width: width - 50,
    height: width / 2.5,
    backgroundColor: '#1f1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  addRideIcon: {
    color: 'silver',
  },
});
