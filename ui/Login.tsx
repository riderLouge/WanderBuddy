import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, TextInput, Image} from "react-native";
import { Button } from "react-native-elements";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import 'firebase/auth';
import { firebase } from "@react-native-firebase/firestore";



var {width,height} = Dimensions.get('window')


const Login = () => {
    const Navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [Email,SetEmail]=React.useState('');
    const [Password,SetPassword]=React.useState('');


    async function loginUser(Email: string, Password: string): Promise<void> {
        try {
          console.log(Email);
          console.log(Password);
          await firebase.auth().signInWithEmailAndPassword(Email, Password);
        } catch (e) {
          console.log(e);
        }
      }

    return(
        <View style={{flex:1, alignItems:'center', backgroundColor:'#111'}}>
            <View style={{flex:1, backgroundColor:'#111', width:(width-10), borderTopStartRadius:20, borderTopEndRadius:20}}>
                <Text style={{fontWeight: 'normal',
                              fontSize:20,
                              color:'white',
                              marginLeft:10,
                              marginTop:35}}>WanderBuddy</Text>
                <Text style={{fontWeight: 'bold',
                              fontSize:23,
                              color:'white',
                              marginLeft:10,
                              marginTop:(width/2.5)}}>Welcome Back,</Text>
                <Text style={{fontWeight: 'normal',
                              fontSize:16,
                              color:'silver',
                              marginLeft:10,
                              marginTop:5}}>Sign in to continue</Text>
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row',
                                 justifyContent:'center',
                                 alignItems:'center',
                                 borderBottomWidth:0.5,
                                 borderColor:'white',
                                 height:(width/8),
                                 width:(width-40),
                                 marginTop:50}}>
                        <Icon2 name="email" size={width/20} style={{color:'white', marginLeft:20}}></Icon2>
                        <TextInput 
                            style={styles.textInput2}
                            placeholder="Email"
                            placeholderTextColor={'#666666'}
                            onChangeText={(newEmail) => SetEmail(newEmail)}>   
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row',
                                  alignItems:'center',
                                  borderBottomWidth:0.5,
                                  marginTop:10,
                                  borderBottomColor:'white',
                                  width:(width-40)}}>
                        <Icon name="ios-lock-closed-outline" size={width/15} style={{color:'white'}}></Icon>
                        <TextInput 
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor={'#666666'}
                        secureTextEntry={true}
                        onChangeText={(newPassword) => SetPassword(newPassword)}> 
                        </TextInput>
                        <Text style={{color:'white'}}>
                            Forgot?
                        </Text>
                    </View>
                    <Button
                        title="Sign In"
                        type="solid"
                        buttonStyle={{
                            width: width / 1.1,
                            height: width / 9,
                            backgroundColor: '#1f1e1e',
                            borderRadius: 4,
                            marginTop: 45
                        }}
                        onPress={() => loginUser(Email, Password)}
                    />
                    <Text style={{color:'white', marginTop:'5%'}}>-- Or --</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginTop:'5%',
                                      width:(width/2.5),
                                      height:(width/9),
                                      borderRadius:4,
                                      borderWidth:1,
                                      borderColor:'grey',
                                      alignItems:'center',
                                      justifyContent:'center',
                                      marginBottom:'10%',
                                      backgroundColor:'white',
                                      flexDirection:'row'}}>
                            <Text style={{color:'black'}}>Sign In with</Text>
                            <Image 
                                source={require('../Assets/google.png')} 
                                style={[{width:30},{height:30},{borderRadius:10}]}></Image> 
                        </View>
                        <View style={{marginLeft:'5%',
                                      marginTop:'5%',
                                      width:(width/2.5),
                                      height:(width/9),
                                      borderRadius:4,
                                      borderWidth:1,
                                      borderColor:'grey',
                                      alignItems:'center',
                                      marginBottom:'10%',
                                      backgroundColor:'white',
                                      justifyContent:'center',
                                      flexDirection:'row'}}>
                            <Text style={{color:'black'}}>Sign In with</Text>
                            <Image 
                                    source={require('../Assets/facebook.png')} 
                                    style={[{width:30},{height:30},{borderRadius:10}]}></Image>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{color:'grey'}}>Don't have an account?</Text>
                        <Text style={{color:'white'}} onPress={()=> Navigation.push("Registration")}>  Sign Up</Text>
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
    textInput2: {
        color: "white",
        width:(width-50),
        marginLeft:5
    },
});
export default Login;
