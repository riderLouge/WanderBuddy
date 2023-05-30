import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from "react-native-image-resizer";


const { width } = Dimensions.get("window");

const Home = ({ route, navigation }: { route: any, navigation: any }) => {
  const { QrId } = route.params;
  const [currentView, setCurrentView] = useState(1);
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactNo, setEmergencyContactNo] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [gender, setGender] = useState("");

  const goToNextView = () => {
    setCurrentView(currentView + 1);
  };

  const goBack = () => {
    setCurrentView(currentView - 1);
  };

  const handleSave = () => {
    // Perform save action here
  };
  
  async function handleImagePick() {
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
      setImageUri(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Handle cancel
      } else {
        throw err;
      }
    }
  }
  
  
  const renderViewOne = () => {
    return (
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleImagePick}
        >
          {imageUri ? (
            <Avatar
              rounded
              source={{ uri: "data:image/jpg;base64," + imageUri }}
              size={185}
            />
          ) : (
            <Avatar
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              size={185}
            />
          )}
          <Text style={styles.avatarText}>Tap to select image</Text>
        </TouchableOpacity>
        <View style={[styles.row, { marginTop: 50 }]}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} placeholder="Enter Name" placeholderTextColor={'black'} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact No"
            keyboardType="phone-pad"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E-Mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter E-Mail"
            keyboardType="email-address"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Date of Birth"
            keyboardType="numeric"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Blood Group:</Text>
          <TextInput style={styles.input} placeholder="Enter Blood Group" placeholderTextColor={'black'} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setGender("male")}
            >
              {gender === "male" && <View style={styles.radioButtonSelected} />}
            </TouchableOpacity>
            <Text style={styles.radioButtonLabel}>Male</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setGender("female")}
            >
              {gender === "female" && <View style={styles.radioButtonSelected} />}
            </TouchableOpacity>
            <Text style={styles.radioButtonLabel}>Female</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setGender("others")}
            >
              {gender === "others" && <View style={styles.radioButtonSelected} />}
            </TouchableOpacity>
            <Text style={styles.radioButtonLabel}>Others</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Qr Name:</Text>
          <TextInput style={styles.input} placeholder="Enter QR Name" placeholderTextColor={'black'}/>
        </View>
        <TouchableOpacity style={[styles.button, {marginTop:43}]} onPress={goToNextView}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  


  const renderViewTwo = () => {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Line 1:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Line 1"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Line 2:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Line 2"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Area:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Area"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Landmark:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Landmark"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>City:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Pincode:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Pincode"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>State:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter State"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Emergency Contact</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={emergencyContactName}
            onChangeText={setEmergencyContactName}
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact No"
            keyboardType="phone-pad"
            value={emergencyContactNo}
            onChangeText={setEmergencyContactNo}
            placeholderTextColor={'black'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToNextView}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderViewThree = () => {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Past Medical History:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Allergies:</Text>
          <TextInput style={styles.input} placeholder="Enter Allergies" placeholderTextColor={'black'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Chronic Conditions:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Chronic Conditions"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Previous Surgeries:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Previous Surgeries"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Medications:</Text>
          <TextInput style={styles.input} placeholder="Enter Medications" placeholderTextColor={'black'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Hospitalizations:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Hospitalizations"
            placeholderTextColor={'black'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Family History:</Text>
          <TextInput style={styles.input} placeholder="Enter Family History" placeholderTextColor={'black'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Others:</Text>
          <TextInput style={styles.input} placeholder="Enter Others" placeholderTextColor={'black'}/>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Family Doctor:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Name:</Text>
          <TextInput style={styles.input} placeholder="Enter Name" placeholderTextColor={'black'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Contact No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact No"
            keyboardType="phone-pad"
            placeholderTextColor={'black'}
          />
        </View>
        <TouchableOpacity style={[styles.button, {marginTop:38}]} onPress={goBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  
  let currentViewComponent = null;
  if (currentView === 1) {
    currentViewComponent = renderViewOne();
  } else if (currentView === 2) {
    currentViewComponent = renderViewTwo();
  } else if (currentView === 3) {
    currentViewComponent = renderViewThree();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR ID :</Text>
        <Text style={styles.qrId}>{QrId}</Text>
      </View>
      {currentViewComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "silver",
    fontSize: 20,
    fontWeight: "bold",
  },
  qrId: {
    color: "silver",
    fontSize: 16,
    marginLeft: 10
  },
  viewContainer: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 20,
    marginTop:50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    color: "silver",
    width: width * 0.3,
    marginRight: 10,
  },
  subLabel: {
    color: "silver",
    width: width * 0.2,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
    backgroundColor:'silver'
  },
  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "silver",
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 2,
    marginRight: 10
  },
});

export default Home;