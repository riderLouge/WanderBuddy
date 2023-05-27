import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "@react-native-firebase/firestore";
import { Avatar, Button } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

var { width, height } = Dimensions.get('window');

export default function Settings() {
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  const [Pic, setPic] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');

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
    setFirstName(doc.data().FirstName);
    setLastName(doc.data().LastName);  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Avatar
              size={width / 3}
              source={{ uri: 'data:image/jpg;base64,' + Pic }}
              overlayContainerStyle={styles.profileImage}
            />
          <Text style={styles.username}>{FirstName}  {LastName}</Text>
          <Button
            title="Edit Profile"
            type="solid"
            buttonStyle={styles.editProfileButton}
            onPress={() => Navigation.push('EditProfile')}
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
  profileImage: {
    backgroundColor: 'grey',
    marginLeft: '1.5%',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: width / 6,
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
