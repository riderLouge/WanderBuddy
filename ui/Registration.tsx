import { firebase } from "@react-native-firebase/firestore";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from "react-native";
import { Alert } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native-elements";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



var {width,height} = Dimensions.get('window')

const Registration = () => {

    const [FirstName,SetFirstName]=React.useState('');
    const [LastName,SetLastName]=React.useState('');
    const [Email,SetEmail]=React.useState('');
    const [Password,SetPassword]=React.useState('');
    const Navigation = useNavigation<NativeStackNavigationProp<any>>();



    async function registerUser(Email: string, Password: string, FirstName: string, LastName: string): Promise<void> {
        console.log(Email)
        console.log(Password)
        console.log(FirstName)
        console.log(LastName)

        await firebase.auth().createUserWithEmailAndPassword(Email,Password)
        .then(() =>{
            firebase.auth().currentUser?.sendEmailVerification({
                handleCodeInApp:true,
                url:'',
            })
            .then(() => {
                console.log('verification email sent')
            }).catch((error: any)=>{
                console.log('1')
                console.log(error)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser?.uid)
                .collection('Profile')
                .doc('Details')
                .set({
                    FirstName,
                    LastName,
                    Email,
                    UserId : firebase.auth().currentUser?.uid,
                })
            })
            .catch((error: any) => {
                console.log('2')
                console.log(error)
            })
        })
        .catch((error: any) => {
            console.log('3')
            console.log(error)
        }) 
    }

    return(
        <View style={{flex:1, backgroundColor:'#111'}}>
            <View style={{backgroundColor:'#111',
                          width:(width-10),
                          borderTopStartRadius:20,
                          borderTopEndRadius:20,
                          marginTop:10}}>
                <Text style={{fontWeight: 'normal',
                              fontSize:20,
                              color:'white',
                              marginLeft:10,
                              marginTop:25}}>WanderBuddy</Text>
                <Text style={{fontWeight: 'bold',
                              fontSize:23,
                              color:'white',
                              marginLeft:10,
                              marginTop:(width/2.5)}}>Welcome Back,</Text>
                <Text style={{fontWeight: 'normal',
                              fontSize:16,
                              color:'silver',
                              marginLeft:10,
                              marginTop:5}}>Sign Un to continue</Text>
                <View style={{alignItems:'center', marginTop:10}}>
                     <View style={{flexDirection:'row',
                                  alignItems:'center',
                                  marginTop:30,
                                  borderBottomWidth:0.5,
                                  borderBottomColor:'white',
                                  width:(width-40)}}>
                        <Icon name="person" size={width/20} style={{color:'white'}}></Icon>
                        <TextInput
                            style={styles.textInput}
                            placeholder="FirstName"
                            placeholderTextColor={'#666666'}
                            onChangeText={(newFirstName) => SetFirstName(newFirstName)}>   
                        </TextInput>
                    </View>                    
                    <View style={{flexDirection:'row',
                                  alignItems:'center',
                                  marginTop:5,
                                  borderBottomWidth:0.5,
                                  borderBottomColor:'white',
                                  width:(width-40)}}>
                        <Icon name="person" size={width/20} style={{color:'white'}}></Icon>
                        <TextInput
                            style={styles.textInput}
                            placeholder="LastName"
                            placeholderTextColor={'#666666'}
                            onChangeText={(newLastName) => SetLastName(newLastName)}>   
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row',
                                 alignItems:'center',
                                 marginTop:5,
                                 borderBottomWidth:0.5,
                                 borderBottomColor:'white',
                                 width:(width-40)}}>
                        <Icon2 name="email" size={width/20} style={{color:'white'}}></Icon2>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor={'#666666'}
                            onChangeText={(newEmail) => SetEmail(newEmail)}>   
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row',
                                 alignItems:'center',
                                 marginTop:5,
                                 borderBottomWidth:0.5,
                                 borderBottomColor:'white',
                                 width:(width-40)}}>
                        <Icon2 name="email" size={width/20} style={{color:'white'}}></Icon2>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            placeholderTextColor={'#666666'}
                            secureTextEntry={true}
                            onChangeText={(newPassword) => SetPassword(newPassword)}>   
                        </TextInput>
                    </View>
                    <View>
                        <Button  
                            title='Register'
                            type="solid"
                            buttonStyle={{width:(width/1.1),
                            height:(width/7),
                            backgroundColor:'#1f1e1e',
                            marginTop:40}}                           
                            onPress={() => registerUser(Email,Password,FirstName,LastName,)}>
                        </Button>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                        <Text style={{color:'grey'}}>Already have an account ?</Text>
                        <Text style={{color:'white'}} onPress={()=> Navigation.push("Login")}>  Sign In</Text>
                    </View>
                </View>
            </View>
        </View>
    )
 }

const styles = StyleSheet.create({
    textInput: {
        color: "white",
        width:(width-120),
        marginLeft:5

    },
});


export default Registration;