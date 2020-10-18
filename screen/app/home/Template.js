import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaidDetail from './MaidDetail'
import HomeScreen from './Home'
import { Button } from 'react-native-elements';


const Stack = createStackNavigator();



export default function HomeTemplate(props) {

    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }
        const logout = async () => {
        await removeItemValue('@storage_TokenKey')
        await removeItemValue('@storage_UserData')
        props.navigation.navigate('Login')
    }
    
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
                name="Home"
                component={HomeScreen} 
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => logout()}
                            title="logout"
                            color="#61AC7F"
                            buttonStyle={{
                                backgroundColor: 'red'
                            }}
                            containerStyle={{
                                paddingRight: 10
                            }}
                        />
                    ),
                    headerTitleStyle: {
                        color: 'black',
                        alignSelf: 'center'
                    },
                    headerStyle: {
                        backgroundColor: 'white',
                        shadowOpacity: 0
                    }
                }}
                

            />
            <Stack.Screen 
                name="MaidDetail"
                component={MaidDetail} />
            
        </Stack.Navigator>
    )
}



