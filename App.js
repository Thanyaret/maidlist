import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTemplateScreen from './screen/app/Template'



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
       <Stack.Screen name="จองแม่บ้านออนไลน์" 
       component={AppTemplateScreen} 
       />
        

        
      


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
