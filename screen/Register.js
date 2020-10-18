import React from "react";
import {Button} from "react-native-elements";
import axios from "axios";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
} from "react-native";
import ValidationComponent from "react-native-form-validator";

export default class RegisterScreen extends ValidationComponent {
    state = {
        isLoading: false,
        name: "",
        phone: "",
        username: "",
        password: "",
        address:"",
        errors: [],
    };

    constructor(props) {
        super(props);
    }

    _onPressButton = async () => {
        const isValid = this.validate({
            name : {required: true},
            phone : {required: true},
            username: {required: true},
            password: {required: true},
            address: {required: true},
            
            
        });
        if (isValid) {
            await this._getToken();
        } else {
            Alert.alert("Login Failure", this.getErrorMessages(), [
                {
                    text: "OK",
                    onPress: () => {
                    },
                },
            ]);
        }
    };

    get_uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            let r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    _setError = (error) => {
        let error_list = [];
        for (const [key, value] of Object.entries(error)) {
            value.forEach((element) => {
                error_list.push({
                    id: this.get_uuidv4(),
                    text: `${key} : ${element}`,
                });
            });
            this.setState({errors: error_list});
        }
    };

    _getToken = async () => {
        this.setState({isLoading: true});
        let token = await axios
            .post(`${backendUrl}/rest-auth/registration/`, {
                username: this.state.username,
                email: this.state.email,
                password1: this.state.password1,
                password2: this.state.password2,
            })
            .then((response) => {
                this.setState({isLoading: false});
                return response.data;
            })
            .catch((error) => {
                this.setState({isLoading: false});

                this._setError(error.response.data);
                return null;
            });
        if (token) {
            this.props.navigation.replace("Login");
        }
    };

    render() {
        let errorMessage;
        if (this.state.errors.length) {
            errorMessage = (
                <View style={{width: "70%"}}>
                    <SafeAreaView style={styles.container_error}>
                        <FlatList
                            data={this.state.errors}
                            renderItem={({item}) => (
                                <Text style={{color: "red"}}>{item.text}</Text>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </SafeAreaView>
                </View>
            );
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.view_bg}>
                    <ActivityIndicator size="large" color="#660095"/>
                </View>
            );
        } else {
            return (
                <View style={styles.view_bg}>
                    <View style={styles.logo_view}>
                        <Text style={styles.text_logo}>Register</Text>
                    </View>

                    <View style={styles.input_view}>
                        <TextInput
                            value={this.state.username}
                            placeholder="username"
                            style={styles.text_input}
                            onChangeText={(text) => {
                                this.setState({username: text});
                            }}
                        />
                        <TextInput
                            value={this.state.email}
                            placeholder="e-mail"
                            style={styles.text_input}
                            onChangeText={(text) => {
                                this.setState({email: text});
                            }}
                        />
                        <TextInput
                            value={this.state.password1}
                            placeholder="password"
                            style={styles.text_input}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password1: text});
                            }}
                        />
                        <TextInput
                            value={this.state.password2}
                            placeholder="confirm password"
                            style={styles.text_input}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password2: text});
                            }}
                        />
                    </View>

                    {errorMessage}

                    <View
                        style={{
                            width: "70%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Button
                                onPress={() => {
                                    this.props.navigation.replace("Login");
                                }}
                                title="BACK"
                                titleStyle={{
                                    fontFamily: "Roboto",
                                    fontWeight: "bold",
                                    color: "black",
                                }}
                                containerStyle={{width: "100%"}}
                                buttonStyle={{
                                    borderRadius: 30,
                                    backgroundColor: "#DE3F1C",
                                    paddingHorizontal: 20,
                                }}
                            />
                        </View>
                        <View>
                            <Button
                                title="SAVE"
                                titleStyle={{
                                    fontFamily: "Roboto",
                                    fontWeight: "bold",
                                    color: "black",
                                }}
                                onPress={async () => {
                                    await this._onPressButton();
                                }}
                                containerStyle={{width: "100%"}}
                                buttonStyle={{
                                    borderRadius: 30,
                                    backgroundColor: "#DECB1C",
                                    paddingHorizontal: 20,
                                }}
                            />
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    logo: {
        width: 66,
        height: 58,
    },
    logo_view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 50,
    },
    text_logo: {
        color: "black",
        fontFamily: "Signika",
        fontSize: 35,
    },
    input_view: {
        width: "70%",
        marginBottom: 50,
    },
    text_input: {
        borderColor: "black",
        borderWidth: 1,
        height: 40,
        backgroundColor: "white",
        borderRadius: 30,
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    container_error: {
        height: 100,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});



// import React from 'react'



// import { View, Text, TextInput, StyleSheet, Alert ,ScrollView} from 'react-native'
// import { Button } from 'react-native-elements';
// import ValidationComponent from 'react-native-form-validator'
// import axios from 'axios'

// export default class ResumeForm extends ValidationComponent {
//   state = {
//     name: '',
//     phonenumber:'',
//     username: '',
//     password: '',
//     confirmpassword: '',
//     address: '',
//   }

  
//   _onSubmit = () => {
//     const isValid = this.validate({
//       name: { required: true },
//       phonenumber: { required: true ,numbers:true},
//       username: { required: true },
//       password: { required: true, numbers: true ,secureTextEntry:true},
//       comfirmpassword: { required: true, numbers: true ,secureTextEntry:true},
//       address: { required: true },
    
//     });
//     if(isValid){
//       const formData = new FormData();
//       formData.append('name',this.state.name)
//       formData.append('phonenumber',this.state.phonenumber)
//       formData.append('username',this.state.username)
//       formData.append('password',this.state.password)
//       formData.append('confirmpassword',this.state.confirmpassword)
//       formData.append('address',this.state.address)
//       const config = {
//         headers: { 'content-type': 'multipart/form-data' }
//       }
//       axios.post(' ', formData, config)
//         .then((res) => {
//           Alert.alert(
//             'Create success',
//             'Click OK go to resume password',
//             [{
//               text: 'OK', onPress: () => {
//                 this.props.navigation.push('Register', { id: res.data.id })
//               }
//             }]
//           )
//         }).catch((error) => {
//           console.log('error :', error)
//         })
//     }
//   }

//   render() {
//     return (
//       <ScrollView style={styles.container}>
//       <View style={styles.container}>
//         <Text >
          
//         </Text>
//         <View>
//           <Text style={{ color: 'white' }}> Name :</Text>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={text => this.setState({ name: text })}
//             value={this.state.name}
//           />
//         </View>
//         <View>
//           <Text style={{ color: 'white' }} >Phonenumber :</Text>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={text => this.setState({ phonenumber: text })}
//             value={this.state.phonenumber}
//           />
//         </View>
        
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white' }}>Username :</Text>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={text => this.setState({ username: text })}
//             value={this.state.username}
//           />
//         </View>
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white' }}>Password :</Text>
//           <TextInput
//             secureTextEntry={true} style={styles.default} value="abc"
//             style={styles.textInput}
//             onChangeText={text => this.setState({ password: text })}
//             value={this.state.password}
//           />
//         </View>
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white' }} >Confirm Password :</Text>
//           <TextInput 
//             secureTextEntry={true} style={styles.default} value="abc"         
//             style={styles.textInput}
//             onChangeText={text => this.setState({ confirmpassword: text })}
//             value={this.state.confirmpassword}
//           />
//         </View>
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white' }}>Address :</Text>
//           <TextInput
//             style={styles.textAreaInput}
//             onChangeText={text => this.setState({ address: text })}
//             value={this.state.address}
//             multiline={true}
//           />
//         </View>
//         <View style={{ marginTop: 20,alignItems: 'center',}}>
//            <Button buttonStyle={{ borderRadius:50,width:200,backgroundColor:'#F5C2C2',marginBottom:5}} 
//             onPress={() => {this._onSubmit 
//               alert('Register Done!');
//             }}
//              color='#F5C2C2' title="Create Account"></Button> 
//         </View>
//       </View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: { padding: 30, backgroundColor: "#61AC7F", minHeight: '100%' },
//   textInput: { height: 40, 
//     backgroundColor : 'white',
//     borderRadius : 30,
//     width:'100%',
//     paddingHorizontal: 10,
//     marginVertical:7, },
//   textAreaInput: { marginTop:10,borderRadius : 30,backgroundColor : 'white',height: 100, borderColor: '#61AC7F', borderWidth: 1 },
//   errorMesspassword: { color: 'red', marginBottom: 20 },
//   textwhite:{
//     color: 'white'
//   },
  
// })