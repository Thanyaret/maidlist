import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import History from "./History"
const Stack = createStackNavigator();
const Navigation = () => (
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
            name="History"
            component={History} />
    </Stack.Navigator>

)

export default function App() {
    return (
        <Navigation />
    );
}

