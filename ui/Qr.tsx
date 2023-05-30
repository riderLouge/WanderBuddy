import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

var { width, height } = Dimensions.get("window");

const Qr = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [add, setAdd] = useState<boolean>(false);
  const [qrId, setQrID] = useState('');
  const [qrPassword, setQrPassword] = useState('');
 
  const toggleAddView = () => {
    setAdd((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Response code</Text>
        <Icon
          name={add ? "remove-circle-outline" : "add-circle-outline"}
          size={30}
          color={"silver"}
          onPress={toggleAddView}
        />
      </View>
      {add && (
        <View style={styles.addView}>
          <TextInput
            style={styles.textInput}
            placeholder="QR ID"
            placeholderTextColor={"#666666"}
            onChangeText={setQrID}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={"#666666"}
            onChangeText={setQrPassword}
          ></TextInput>
          <View style={{ alignItems: "flex-end" }}>
            <Button
              title="Add"
              type="solid"
              buttonStyle={styles.editAddButton}
              onPress={() => Navigation.push('EditQr', { QrId: qrId})}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Qr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  textInput: {
    color: "black",
    width: width - 60,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "silver",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addView: {
    marginTop: 40,
    width: width - 30,
    height: 220,
    backgroundColor: "#242323",
    marginLeft: 15,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  editAddButton: {
    width: width / 3,
    height: width / 10,
    backgroundColor: "#111",
    borderRadius: 4,
  },
});
