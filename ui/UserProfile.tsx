import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar, Button, BottomSheet } from "react-native-elements";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import { Image } from "native-base";

const { width, height } = Dimensions.get("window");


const UserProfile = ({ route }: { route: any }) => {
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [images, setImages] = useState<string[]>([]);
  const db = firebase.firestore();
  const { userId } = route.params;
  const [Pic, setPic] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [buttonName,setButtonName] = useState('Follow');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      console.log(userId)
      const currentUser = userId;
      if (currentUser) {
        const snapshot = await db
          .collection("users")
          .doc(userId)
          .collection("posts")
          .get();
        const test: string[] = [];
        snapshot.forEach((doc) => {
          test.push(doc.data().result);
        });
        console.log(test.length);
        setImages(test);
      } else {
        console.log("User not logged in.");
      }
    };


    fetchImages();
  }, [db]);

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .collection('Profile')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          renderData(doc);
        });
      });
  }, [db, userId]);

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .collection('Following')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
            if(doc.data().FollowingUserId === firebase.auth().currentUser?.uid){
                setButtonName('UnFollow');

            }
        })
      })
      db.collection('users')
      .doc(userId)
      .collection('Followers')
      .get()
      .then((snapshot)=> {
        setFollowers(snapshot.size)
      })
      db.collection('users')
      .doc(userId)    
      .collection('Following')
      .get()
      .then((Followingsnapshot)=> {
        setFollowing(Followingsnapshot.size)
      })
  }, [buttonName])

  function renderData(doc: any) {
    setPic(doc.data().ProfilePic);
    setProfileName(doc.data().ProfileName);
  }


  const renderSection = () => {
    return images.map((image, index) => {
      if (image !== "") {
        return (
          <View
            key={index}
            style={[
              { width: width / 3.18 },
              { height: width / 3.18 },
              index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
              index === 3 ? { borderTopEndRadius: 10 } : { borderTopLeftRadius: 0 },
            ]}
          >
            <Image
              style={{ flex: 1, width: undefined, height: undefined, marginTop:2 }}
              source={{ uri: "data:image/jpg;base64," + image }}
              alt="postImg"
            />
          </View>
        );
      }
    });
  };

  async function manageFollowers() {
    if (buttonName === "Follow") {
      await firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser?.uid)
        .collection('Followers')
        .add({
          FollowerUserId: userId,
        });
  
      await firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('Following')
        .add({
          FollowingUserId: firebase.auth().currentUser?.uid,
        });
  
      setButtonName("UnFollow");
    } else if (buttonName === "UnFollow") {
      const currentUser = firebase.auth().currentUser?.uid;
      console.log("in delete")
  
      // Remove from current user's followers
      await firebase.firestore()
        .collection('users')
        .doc(currentUser)
        .collection('Followers')
        .where('FollowerUserId', '==', userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
  
      // Remove from other user's following
      await firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('Following')
        .where('FollowingUserId', '==', currentUser)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
  
      setButtonName("Follow");
    }
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <View style={{ flex: 1.3 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 10,
              width: width - 75,
            }}
          >
            <Avatar
              size={width /4}
              source={{ uri: 'data:image/jpg;base64,' + Pic }}
              overlayContainerStyle={styles.profileImage}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "silver",
                  marginLeft: 15,
                  marginTop: 7,
                  fontSize: 20,
                  fontWeight: "400",
                }}
              >
                {ProfileName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15,
                }}
              >
                <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 14 }}>
                  <Text style={{ color: "silver" }}>{images.length}</Text>
                  <Text style={{ color: "silver" }}>POST</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 20 }}>
                  <Text style={{ color: "silver" }}>{followers}</Text>
                  <Text style={{ color: "silver" }}>FOLLOWERS</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 20 }}>
                  <Text style={{ color: "silver" }}>{following}</Text>
                  <Text style={{ color: "silver" }}>FOLLOWING</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row" }}>
            <Icon
              name="add-circle-outline"
              size={30}
              color={"white"}
              style={{ marginRight: 5, marginTop: -45 }}
              onPress={post}
            />
            <Icon
              name="people-circle"
              size={30}
              color={"white"}
              style={{ marginTop: -45 }}
              onPress={()=> Navigation.push('SearchUser')}
            />
          </View> */}
        </View>
        <ScrollView horizontal>
          <View>
            <ImageBackground
              source={require("../Assets/Coorg.jpg")}
              style={styles.box}
            ></ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../Assets/Vagamon.jpg")}
              style={styles.box}
            ></ImageBackground>
          </View>
          <View style={{ marginRight: 15 }}>
            <ImageBackground
              source={require("../Assets/Munnar.jpg")}
              style={styles.box}
            ></ImageBackground>
          </View>
        </ScrollView>
        <View style={{flexDirection:'row',
                    marginBottom:20,
                    justifyContent:'space-evenly'}}>
            <Button  
                title='Message'
                type="solid"
                buttonStyle={{width:(width/2.5),
                height:(width/10),
                backgroundColor:'#1f1e1e'}}                           
                >
            </Button>
            <Button  
                title={buttonName}
                type="solid"
                buttonStyle={{width:(width/2.5),
                height:(width/10),
                backgroundColor:'#1f1e1e'}}    
                onPress={manageFollowers}                       
                >
            </Button>
          </View>
      </View>
      <View style={{ flex: 1.5 }}>
        <View
          style={{
            width: Dimensions.get("window").width - 30,
            height: 50,
            backgroundColor: "#1e1e1e",
            marginLeft: 15,
            marginBottom: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "silver", fontWeight: "900" }}>POSTS</Text>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", flexWrap: "wrap", width:(width-23), marginLeft:11.5}}>
            {renderSection()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width / 2.3,
    marginLeft: 15,
    borderRadius: 20,
  },
  profileImage: {
    backgroundColor: 'grey',
    marginLeft: '1.5%',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: (width / 8),
  },
});

export default UserProfile;
