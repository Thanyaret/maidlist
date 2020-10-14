import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaidDetail from './MaidDetail'
import HomeScreen from './Home'
const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: '#61AC7F',
                        shadowOpacity: 0
                    },
                    headerTintColor: 'white'
                }
            } >
                
            
            <Stack.Screen 
                name="MaidDetail"
                component={MaidDetail} />
            <Stack.Screen
                name="Home"
                component={HomeScreen} />
        </Stack.Navigator>
    )
}



