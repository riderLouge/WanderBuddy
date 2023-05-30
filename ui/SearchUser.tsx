import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

const SearchUser = () => {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();

  type User = {
    id: string;
    value: string;
    docId: string;
  };
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    db.collectionGroup("Profile")
      .get()
      .then((snapshot) => {
        const updatedUsers: User[] = [];
        snapshot.forEach((doc) => {
          const id = doc.data().ProfilePic;
          const value = doc.data().ProfileName;
          const docId = doc.data().UserId;
  
          // Skip the current user
          if (docId === firebase.auth().currentUser?.uid) {
            return;
          }
  
          const newUser: User = { id, value, docId };
          updatedUsers.push(newUser);

        });
  
        // Sort the users array alphabetically by the value (ProfileName)
        updatedUsers.sort((a, b) => a.value.localeCompare(b.value));
  
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      });
  }, []);
  
  

  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }, [searchQuery]);


  const renderItem = ({ item }: { item: User }) => (
    <ListItem bottomDivider containerStyle={styles.listItem}>
      <Avatar
        rounded
        source={{ uri: 'data:image/jpg;base64,' + item.id }}
        size={60}
        containerStyle={styles.avatarContainer}
        onPress={() =>
            Navigation.push("UserProfile", { userId: item.docId })
        }
      />
      <ListItem.Content>
        <ListItem.Title
          style={styles.name}
          onPress={() =>
            Navigation.push("UserProfile", { userId: item.docId })
          }
        >
          {item.value}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search User</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter name"
        placeholderTextColor="#666666"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredUsers.length === 0 ? (
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "white",
  },
  flatList: {
    flexGrow: 1,
  },
  listItem: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "silver",
    height: 80,
  },
  avatarContainer: {
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
});

export default SearchUser;
