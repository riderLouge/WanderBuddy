/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import Profile from './ui/Profile';
import Map from './ui/Map';
import Qr from './ui/Qr';
import Login from './ui/Login';
import Settings from './ui/Settings';
import Registration from './ui/Registration';
import { firebase } from '@react-native-firebase/auth';
import Challanges from './ui/Challanges';
import Home from './ui/Home';
import Trip from './ui/Trip';
import EditProfile from './ui/EditProfile';
import SearchUser from './ui/SearchUser';
import UserProfile from './ui/UserProfile';
import EditQr from './ui/EditQr';


const App = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [User,SetUser]=React.useState('');
  const [Initializing,SetInitializing]=React.useState(true);

  function onAuthStateChange(User : any){
    SetUser(User);
    if(Initializing) SetInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if(Initializing) return null;

  const BottomTabScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Profile" 
        
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#1a1c1a'},
                tabBarIcon: ({ focused, color, size }) => {
                  var iconName = '';
    
                  if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                  } else if (route.name === 'Challanges') {
                    iconName = focused ? 'trophy-sharp' : 'trophy-outline';
                  } else if (route.name === 'Trip') {
                    iconName = focused ? 'location' : 'location-outline';
                  }else if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  }else if (route.name === 'settings') {
                    iconName = focused? 'md-settings' : 'md-settings-outline';
                  }
    
                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'silver',
                tabBarInactiveTintColor: 'grey',
              })}
        >
          <Tab.Screen name="Profile" component={Profile}  options={{
              title: 'Profile',
              headerStyle: {
                backgroundColor: '#121212',
              },
              headerShown:false,
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
              },
            }} />
          <Tab.Screen name="Challanges" component={Challanges} 
          options={{
                title: 'Challanges',
                headerStyle: {
                  backgroundColor: 'grey',
                },
                headerShown:false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} />
          <Tab.Screen name="Home" component={Home}  options={{
                title: 'Home',
                headerStyle: {
                  backgroundColor: 'grey',
                },
                headerShown:false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
          <Tab.Screen name="Trip" component={Trip}  options={{
                title: 'Trip',
                headerStyle: {
                  backgroundColor: 'grey',
                },
                headerShown:false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
         <Tab.Screen name="settings"  component={Settings}  options={{
                title: 'Settings',
                headerStyle: {
                  backgroundColor: 'grey',
                },
                headerShown:false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} />
        
        </Tab.Navigator>
      );
  }

  if(!User){
    return(
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    )
  }
  return(
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Qr" component={Qr} />
        <Stack.Screen name="EditQr" component={EditQr} />

      </Stack.Navigator>
  );
};



export default ()=>{
  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <App/>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}