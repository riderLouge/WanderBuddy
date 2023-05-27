import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, ScrollView, Dimensions } from "react-native";
import { Avatar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebase  from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ImageResizer from "react-native-image-resizer";

const { width } = Dimensions.get('window');

const EditProfile = () => {
  const [Pic, setPic] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [DOB, setDOB] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [Country, setCountry] = useState('');
  const [City, setCity] = useState('');
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

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
    setProfileName(doc.data().ProfileName);
    setFirstName(doc.data().FirstName);
    setLastName(doc.data().LastName);
    setDOB(doc.data().DOB);
    setPhoneNumber(doc.data().PhoneNumber);
    setEmail(doc.data().Email);
    setCountry(doc.data().Country);
    setCity(doc.data().City);
  }

  async function profilePic() {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      const path = file.uri;
      const resizedImage = await ImageResizer.createResizedImage(
        path,
        800,
        600,
        "JPEG",
        80
      );

      const resizedImagePath = resizedImage.uri;
      const result = await RNFetchBlob.fs.readFile(resizedImagePath, "base64")
      setPic(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Handle cancel
      } else {
        throw err;
      }
    }
  }

  function save() {
    console.log(Pic)
    firestore().collection('users')
      .doc(uid)
      .collection('Profile')
      .doc('Details')
      .update({
        ProfilePic: Pic? Pic : "",
        ProfileName: ProfileName? ProfileName : "",
        FirstName: FirstName? FirstName : "",
        LastName: LastName? LastName : "",
        DOB: DOB? DOB : "",
        PhoneNumber: PhoneNumber? PhoneNumber : "",
        Email: Email? Email : "",
        Country: Country? Country : "",
        City: City? City : "",
      })
      .then(() => {
        Alert.alert(
          'Profile updated!',
          'Your profile has been updated successfully!'
        );
      })
      .catch((error) => {
        console.log('Something went wrong with updating profile:', error);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Profile</Text>
          <View style={styles.saveButtonContainer}>
            <Button
              title="Save Profile"
              type="solid"
              buttonStyle={styles.saveButton}
              onPress={() => {
                save();
                Navigation.push('Bottom');
              }}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageInnerContainer}>
            <Avatar
              size={width / 3}
              source={{ uri: 'data:image/jpg;base64,' + Pic }}
              overlayContainerStyle={styles.profileImage}
            />
              <Icon2
                name="camera-sharp"
                size={width / 13}
                style={styles.profileIcon}
                onPress={profilePic}
              />
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="ninja" size={width / 12} color='white' />
            <TextInput
              placeholder="Profile Name"
              placeholderTextColor="#666666"
              onChangeText={setProfileName}
              defaultValue={ProfileName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon2 name="ios-person-circle-outline" color='white' size={width / 12} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              onChangeText={setFirstName}
              defaultValue={FirstName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon2 name="ios-person-circle-outline" color='white' size={width / 12} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              onChangeText={setLastName}
              defaultValue={LastName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon2 name="ios-calendar" color='white' size={width / 12} />
            <TextInput
              placeholder="DOB"
              placeholderTextColor="#666666"
              onChangeText={setDOB}
              defaultValue={DOB}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="phone" size={width / 12} color='white' />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              onChangeText={setPhoneNumber}
              defaultValue={PhoneNumber}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon2 name="mail-outline" size={width / 12} color='white' />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#666666"
              onChangeText={setEmail}
              defaultValue={Email}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon3 name="globe-americas" size={width / 12} color='white' />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666666"
              onChangeText={setCountry}
              defaultValue={Country}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Icon2 name="location-sharp" size={width / 12} color='white' />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              onChangeText={setCity}
              defaultValue={City}
              style={styles.textInput}
            />
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
    paddingHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  headerText: {
    paddingLeft: '2%',
    fontSize: 20,
    fontStyle: "normal",
    paddingTop: 20,
    color: 'white',
  },
  saveButtonContainer: {
    marginTop: '2%',
  },
  saveButton: {
    borderColor: 'white',
    marginTop: 8,
    backgroundColor:'#1f1e1e'
  },
  saveButtonText: {
    fontSize: width / 40,
    color: 'white',
    backgroundColor: '#1f1e1e',
  },
  content: {
    flex: 10,
  },
  profileImageContainer: {
    flexDirection: 'row',
    height: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageInnerContainer: {
    justifyContent: 'center',
    paddingLeft: '3%',
  },
  profileImage: {
    backgroundColor: 'grey',
    marginLeft: '1.5%',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: width / 6,
  },
  profileIcon: {
    color: 'silver',
    alignSelf: 'flex-end',
    bottom: width / 3.3,
    zIndex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '4%',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "black",
    color: "white",
    width: '70%',
    marginLeft: '3%',
    marginRight: '7%',
  },
});

export default EditProfile;

