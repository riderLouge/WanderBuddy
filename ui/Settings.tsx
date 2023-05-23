import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "@react-native-firebase/firestore";
import { Avatar } from "react-native-paper";
import { Button } from "react-native-elements";

var { width, height } = Dimensions.get('window');

export default function Settings() {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Avatar.Image
            style={styles.avatar}
            size={100}
            source={{
              uri: 'https://c4.wallpaperflare.com/wallpaper/143/213/145/uchiha-madara-wallpaper-preview.jpg'
            }}
          />
          <Text style={styles.username}>Vikranth Venkateswar</Text>
          <Button
            title="Edit Profile"
            type="solid"
            buttonStyle={styles.editProfileButton}
            // onPress={}
          />
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Icon name="qr-code" size={26} color="white" style={styles.optionIcon} />
            <Text style={styles.optionText}>QR</Text>
          </View>
          <View style={styles.option}>
            <Icon1 name="shop" size={26} color="white" style={styles.optionIcon} />
            <Text style={styles.optionText}>Shop</Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Icon2 name="persons" size={26} color="white" style={styles.optionIcon} />
            <Text style={styles.optionText}>Manage Followers</Text>
          </View>
          <View style={styles.option}>
            <Icon name="ios-person" size={26} color="white" style={styles.optionIcon} />
            <Text style={styles.optionText}>Manage Login Id / Password</Text>
          </View>
          <View style={styles.option}>
            <Icon name="ios-power-sharp" size={26} color="white" style={styles.optionIcon} />
            <Text style={styles.optionText} onPress={() => firebase.auth().signOut()}>Logout</Text>
          </View>
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
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: 'silver',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: 'grey',
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    marginTop: 20,
    color: 'white',
  },
  editProfileButton: {
    width: width / 3,
    height: width / 10,
    backgroundColor: '#1f1e1e',
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 15,
  },
  optionsContainer: {
    flex: 1.8,
    flexDirection: 'column',
    marginTop: 20,
  },
  option: {
    width: width - 30,
    height: 60,
    backgroundColor: '#1f1e1e',
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: width / 23,
    color: 'silver',
  },
});
