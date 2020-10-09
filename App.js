import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaidDetail from './screen/MaidDetail'
import HomeScreen from './screen/Maid'
import LogginScreen from './screen/Login'
import RegisterScreen from './screen/Register'
import AppTemplateScreen from "./screen/Template"
import History from "./screen/History"
import UserProfile from "./screen/UserProfile"
import status from "./screen/status"


const Stack = createStackNavigator();
const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
    screenOptions ={
      {
        headerStyle :{
          backgroundColor: '#61AC7F',
          shadowOpacity:0
        },
        headerTintColor: 'white'
      }
        } >

  
        <Stack.Screen name="Login" options={{headerShown :false}} component={LogginScreen} />
        <Stack.Screen name="Register"  component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MaidDetail" component={MaidDetail} />
        <Stack.Screen name="Template" component={AppTemplateScreen} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="status" component={status} />

        
      


    </Stack.Navigator>
  </NavigationContainer>
)

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
});
