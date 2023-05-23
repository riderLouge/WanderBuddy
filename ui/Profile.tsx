import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, BottomSheet } from "react-native-elements";
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ImageResizer from 'react-native-image-resizer';


const Profile = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { width, height } = Dimensions.get('window');
  const [isVisible, setIsVisible] = React.useState(false);


  async function post() {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
  
      const path = file.uri;
  
      // Resize the image to a desired width and height
      const resizedImage = await ImageResizer.createResizedImage(path, 800, 600, 'JPEG', 80);
  
      const resizedImagePath = resizedImage.uri;
  
      const result = await RNFetchBlob.fs.readFile(resizedImagePath, 'base64');
  
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        await firestore().collection('users')
          .doc(currentUser.uid)
          .collection('posts').add({
            result
          });
      } else {
        console.log('User not logged in.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled.');
      } else {
        console.log('Error:', err);
      }
    }
  }
  
  const openMenuScreen = () => {
    setIsVisible(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 10, width: width - 75 }}>
            <Avatar.Image
              style={{ backgroundColor: 'grey' }}
              size={100}
              source={{
                uri: 'https://c4.wallpaperflare.com/wallpaper/143/213/145/uchiha-madara-wallpaper-preview.jpg'
              }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{
                color: 'silver',
                marginLeft: 15,
                marginTop: 7,
                fontSize: 20,
                fontWeight: '400'
              }}>Vikranth Venkateswar</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15
              }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 14 }}>
                  <Text style={{ color: 'silver' }}>25</Text>
                  <Text style={{ color: 'silver' }}>POST</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                  <Text style={{ color: 'silver' }}>25</Text>
                  <Text style={{ color: 'silver' }}>FOLLOWERS</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                  <Text style={{ color: 'silver' }}>25</Text>
                  <Text style={{ color: 'silver' }}>FOLLOWING</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='add-circle-outline'
              size={30}
              color={'white'}
              style={{ marginRight: 5, marginTop: -45 }}
              onPress={post}
            />
            <Icon name='people-circle'
              size={30}
              color={'white'}
              style={{ marginTop: -45 }}
              onPress={openMenuScreen}
            />
          </View>
        </View>
        <ScrollView horizontal>
          <View>
            <ImageBackground
              source={require('../Assets/Coorg.jpg')}
              style={styles.box}
            >
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require('../Assets/Vagamon.jpg')}
              style={styles.box}
            >
            </ImageBackground>
          </View>
          <View style={{ marginRight: 15 }}>
            <ImageBackground
              source={require('../Assets/Munnar.jpg')}
              style={styles.box}
            >
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1.5 }}>
        <View style={{
          width: Dimensions.get('window').width - 30,
          height: 50,
          backgroundColor: '#1e1e1e',
          marginLeft: 15,
          marginBottom: 15,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'silver', fontWeight: '900' }}>POSTS</Text>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>

          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width / 2.3,
    marginLeft: 15,
    borderRadius: 20
  }
});

export default Profile;
