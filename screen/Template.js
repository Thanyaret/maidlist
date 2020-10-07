import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Icon, Button} from "react-native-elements";
import {View, StyleSheet} from "react-native";
import HomeScreen from "./Maid";
// import  from "./home/Template";
// import  from "./home/Create";

const Tab = createBottomTabNavigator();

export default function AppTemplateScreen({navigation}) {

    const customTabBarStyle = {
        activeTintColor: '#660095',
        inactiveTintColor: 'gray',
        style: {backgroundColor: 'white'},
    }
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarOptions={HomeScreen}
            shifting="false"
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Create"
                component={CreateTopicScreen}
                options={{
                    title: "",
                    tabBarIcon: ({color}) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 7,
                                height: 40,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                onPress={() => {
                                    navigation.navigate('Create')
                                }}
                                buttonStyle={styles.buttonStyle}
                                icon={
                                    <Icon
                                        name='add'
                                        type='material'
                                        color='#660095'
                                        containerStyle={{alignSelf: 'center'}}
                                        reverse
                                        size={30}
                                    />}
                            />
                        </View>

                    ),
                }}
            />
            <Tab.Screen
                name="MyTopicTemplate"
                component={MyTopicTemplateScreen}
                options={{
                    title: "MyTopic",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 60,
        width: 60,
        borderRadius: 100,
    },
})