import React ,{ useState, useEffect} from 'react'
import { View, Text,StyleSheet,Image,ScrollView  } from 'react-native'
import axios from 'axios'
import {backendUrl} from "../../../config"
export default function UserProfile(props) {
    const[User, setUser] = useState({
        name: '',
        phone: '',
        address: '',
    })

    useEffect (() => {
        axios
      .get( backendUrl +"/api/user")
      .then((res) =>{
          console.log(res.data)
          setUser(res.data[0])
    }).catch((error) =>{
        console.log('error' , error)
    })
}, [])
    return (
        <ScrollView  style={styles.container}>
            <Image source={{uri: User.photo}}
                   style={styles.userImage} />
             <View style={styles.textLine}>
            <Text style={{ color: 'white',fontSize:15 }}>Name :{User.name}</Text>
            </View>
            <View style={styles.textLine}>
            <Text style={{ color: 'white',fontSize:15 }}>Phone : {User.phone}</Text>
            </View>
            <View style={styles.textLine}>
            <Text style={{ color: 'white',fontSize:15 }}>Address :{User.address}</Text>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#61AC7F",
      minHeight: "100%",
      paddingTop: 30,
    },
    userImage: {
        height: 200
    },
    textLine: {marginBottom:20,padding:10},
});

