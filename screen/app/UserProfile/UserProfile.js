import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import axios from 'axios'
import { backendUrl } from "../../../config"
import AsyncStorage from '@react-native-community/async-storage'
export default class UserProfile extends React.Component {
    state = {
        user: {},
        image : null
    }
    _getTokenData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_TokenKey')
            if (value !== null) {
                return value
            }
        } catch (e) {
            // error reading value
        }
    }
    _loadUserProfile = async () => {
        let token = await this._getTokenData()
        let url = backendUrl + "/rest-auth/user-profile/"
        console.log(url, 'test');
        await axios
            .get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                this.setState({ user: res.data })
                this.setState({image : this.getImageUri()})
                return res.data
            }).catch((error) => {
                console.log('error', error)
            })
    }
    componentDidMount = async () => {
        await this._loadUserProfile()
    }
    getImageUri () {
        let uri = this.state.user.userprofile ? this.state.user.userprofile.photo : ""
        if (uri.startsWith("/media")){
            console.log(backendUrl + uri,'url');
            return backendUrl + uri
        }else {
            return uri
        }
        

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image source={{ uri:  this.state.image}}
                    style={styles.userImage} />
                <View style={styles.textLine}>
                    <Text style={{ color: 'white', fontSize: 15 }}>ชื่อ : {this.state.user.first_name} {this.state.user.last_name}</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={{ color: 'white', fontSize: 15 }}>เบอร์โทรศัพท์ : {this.state.user.userprofile ? this.state.user.userprofile.phone : ""}</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={{ color: 'white', fontSize: 15 }}>ที่อยู่ปัจจุบัน :{this.state.user.userprofile ? this.state.user.userprofile.address : ""}</Text>
                </View>
            </ScrollView >
        )

    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#61AC7F",
        minHeight: "100%",
        paddingTop: 30,
    },
    userImage: {
        height: 300
    },
    textLine: { marginBottom: 20, padding: 10 },
});

