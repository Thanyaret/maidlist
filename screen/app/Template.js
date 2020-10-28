import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import History from './History/HistoryTemplate'
import Home from './home/Template'
import status from './status/statusTemplate'
import UserProfile from './UserProfile/userprofiletemplate'
const Tab = createBottomTabNavigator();

export default function AppTemplateScreen({navigation}) {

    const customTabBarStyle = {
        activeTintColor: '#61AC7F',
        inactiveTintColor: 'gray',
        style: {backgroundColor: 'white'},
    }
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={customTabBarStyle}
            shifting="false"
        >
           
             <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />
             <Tab.Screen
                name="History"
                component={History}
                options={{
                    title: "History",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="history" color={color} size={26}/>                    ),
                }}
            />
             <Tab.Screen
                name="status"
                component={status}
                options={{
                    title: "status",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="ballot-recount-outline" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    title: "UserProfile",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

