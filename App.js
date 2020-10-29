import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import AppTemplateScreen from './screen/app/Template'
import LoginScreen from './screen/Login'
import RegisterScreen from './screen/Register'
     
import {AppLoading} from "expo";


const RootStack = createStackNavigator();

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
    .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error
class App extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

    }
    state = {
        fontsLoaded: false,
    };
    

    async componentDidMount() {
        // Hides native splash screen after 2s
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 2000);

        this._isMounted = true;

        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        
        return (
            <NavigationContainer>

                <RootStack.Navigator
                    mode="modal"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#61AC7F",
                            borderBottomWidth: 0,
                            shadowOpacity: 0,
                        },
                        headerTintColor: "white",
                    }}
                >
                    <RootStack.Screen
                        name="Login"
                        options={{headerShown: false}}
                        component={LoginScreen}/>

                    <RootStack.Screen
                        name="Register"
                        options={{
                            title: 'Register',
                        }}
                        component={RegisterScreen}/>

                    <RootStack.Screen
                        name="Template"
                        component={AppTemplateScreen}
                        options={{headerShown: false}}
                    />
                    
                </RootStack.Navigator>


            </NavigationContainer>
        );
    }


}

export default App







// const Stack = createStackNavigator();
// const Navigation = () => (
//   <NavigationContainer>
//     <Stack.Navigator
//     screenOptions ={
//       {
//         headerStyle :{
//           backgroundColor: '#61AC7F',
//           shadowOpacity:0
//         },
//         headerTintColor: 'white'
//       }
//         } >
//        <Stack.Screen name="จองแม่บ้านออนไลน์" 
//        component={AppTemplateScreen} 
//        />
      
        

        
      


//     </Stack.Navigator>
//   </NavigationContainer>
// )

// export default function App() {
//   return (
    
//     <View style={styles.container}>
      
//       <Navigation/>
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#fff',
//     justifyContent:'center'
//   },
// });
