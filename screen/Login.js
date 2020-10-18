import * as React from 'react';
import { Button } from 'react-native-elements';
import axios from 'axios'

import {StyleSheet, View, Text,TextInput,Image,TouchableHighlight,ActivityIndicator,  Alert} from 'react-native';
import ValidationComponent from "react-native-form-validator";
import AsyncStorage from '@react-native-community/async-storage';
import {backendUrl} from "../config"


export default  class LoginScreen extends ValidationComponent {
    _isMounted = false;
    state = {
        isLoading: false,
        username: "admin",
        password: "password",
    };

    constructor(props) {
        super(props);
    }

    _storeTokenData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_TokenKey', value)

        } catch (e) {
            // saving error
        }
    }
    _storeUserData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_UserData', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    _getUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_UserData')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            return null


        }
    }

    _getTokenData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_TokenKey')
            if (value !== null) {
                // value previously stored
                // await this._getUserFromToken()
                return value
            }
        } catch (e) {
            // error reading value
        }
    }
    _getUserFromToken = async () => {
        this.setState({isLoading: true});
        let token = await this._getTokenData()
        await axios
            .get(backendUrl+"/api/user/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((response) => {
                this.setState({isLoading: false});
                this._storeUserData(response.data)
                return response.data;
            })
            .catch((error) => {
                console.log('error get user', error)
                this.setState({isLoading: false});
                Alert.alert(
                    "Load Data Failure",
                    "Unable to log in with provided credentials.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                this.setState({username: ""});
                                this.setState({password: ""});
                            },
                        },
                    ]
                );
                return null;
            });


    }

    async componentDidMount() {
        console.log("login");
        this._isMounted = true
        let token = await this._getTokenData();
        console.log("token",token);
        if (token) {
            await this._getUserFromToken()
            let user = await this._getUserData()
            if (user) {
                this.props.navigation.replace("Template");
            }
        }


    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    _onPressButton = async () => {
        const isValid = this.validate({
            username: {required: true},
            password: {required: true},
        });
        if (isValid) {
            let token = await this._getToken();
            if (token){
                await this._getUserFromToken()
                let user = await this._getUserData()
                if(user){
                    this.props.navigation.replace("Home");

                }else{
                    console.log(token)
                }

            }
            
        } else {
            console.log(isValid,'isValid error')
            Alert.alert("Login Failure", this.getErrorMessages(), [
                {
                    text: "OK",
                    onPress: () => {
                        this.setState({username:""})
                        this.setState({password:""})
                    },
                },
            ]);
        }
    };


    _getToken = async () => {
        this.setState({isLoading: true});
        await axios
            .post(backendUrl + "/rest-auth/login/", {
                username: this.state.username,
                password: this.state.password,
            }, {
                headers: {
                    Authorization: null
                }
            })
            .then((response) => {
                this.setState({isLoading: false});
                this._storeTokenData(response.data.key)
                this._getUserFromToken()
                console.log("token", token);
                return response.data;
            })
            .catch((error) => {
                this.setState({isLoading: false});
                Alert.alert(
                    "Login Failure",
                    "Unable to log in with provided credentials.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                this.setState({username: ""});
                                this.setState({password: ""});
                            },
                        },
                    ]
                );
                return null;
            });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.view_bg}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        } else 

    return (
      <View style={styles.view_bg}>
          <View>
              <Image 
              style={styles.logo}
              source={require('../assets/broom1.png')}/>
          </View>
          <View style={styles.input_view}>
              <Text style={{ color: 'white',fontSize:17 }}> Username :</Text>
              <TextInput
                            value={this.state.username}
                            placeholder="username"
                            style={styles.text_input}
                            onChangeText={(text) => {
                                this.setState({username: text});
                            }}
                        />
              <Text style={{ color: 'white',fontSize:17 }}> Password :</Text>
              <TextInput
                            value={this.state.password}
                            placeholder="password"
                            style={styles.text_input}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password: text});
                            }}
                        />
          </View>
          <View >
              <View >
              <Button  titleStyle={{fontSize: 22,}} buttonStyle={{borderRadius:50,width:100,backgroundColor:'#F5C2C2',marginBottom:5 }}  onPress={this._onPressButton} color='#F5C2C2' title='Login'></Button>        
              </View>
              <View >
              <Button titleStyle={{fontSize: 22,}} buttonStyle={{borderRadius:50,width:100,backgroundColor:'#F5C2C2',}}  onPress={()=>{this.props.navigation.replace("Register")}} title='Register'></Button>
              </View>
          </View>
    
      </View>
    );
  }

}
const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: "#61AC7F",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    logo: {
        width: 200,
        height: 200,
    },
    logo_view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 100,
    },
    text_logo: {
        color: "white",
        fontFamily: "Signika",
        fontSize: 45,
    },
    input_view: {
        width: "70%",
        marginBottom: 50,
    },
    text_input: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 30,
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
});


//   const style = StyleSheet.create({
//       view_bg:{
//           backgroundColor : "#61AC7F",
//           flex:1 ,
//           alignItems:'center',
//           justifyContent:'center',
//           width:'100%'
//       },
//       logo:{
//           width :250,
//           height:250,
//           marginBottom:50
//       },
//       input_view:{
//           width:'70%',
//           marginBottom:20

//       },
//       text_input:{     
//          height: 40, 
//          backgroundColor : 'white',
//          borderRadius : 30,
//          width:'100%',
//          paddingHorizontal: 10,
//          marginVertical:5,
//       },
//       container: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonContainer: {
//         flex: 1,
//     }

      
      
//   });
  