import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { backendUrl } from "../../../config"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import DatePicker from '../../../comp/DatePicker'
export default function MaidDetail(props, route) {
  const [maid, setMaid] = useState({
    name: '',
    age: '',
    phone: '',
    skill: '',
    maid_name: '',
    date_me: ''
  })
  const [date_me, setDateMe] = useState("")

  useEffect(() => {
    console.log(props.route.params);
    axios.get(backendUrl + '/api/maid/' + props.route.params)
      .then((res) => {
        setMaid(res.data)
      }).catch((error) => {
        console.log('error', error)
      })


  }, [])

  const _onDateChange = (date) => {
    setDateMe(date)
  }

  const _onSubmit = async () => {


    const formData = new FormData();

    formData.append('maid_name', props.route.params)
    formData.append("user", 1)
    formData.append("date", moment(date_me).format("YYYY-MM-DDThh:mm"))
    formData.append("status", false)
    await axios.post(backendUrl + "/api/statusmaid/", formData)
      .then((res) => {
        console.log('res');
        props.navigation.goBack()

        // Alert.alert(
        //   'success',
        //   'something'
        //   [{
        //     text: 'OK', 
        //     onPress: () => {
        //       console.log('ok click');
        // //     }
        //   }]
        // )
      }).catch((error) => {
        console.log('error :',error.response.data)
      }).finally(() => {

      })
  }
  return (

    <ScrollView style={styles.container}>
      <Image source={{ uri: maid.photo }}
        style={styles.maidImage} />

      <View style={styles.textLine}>
        <Text style={{ color: 'white', fontSize: 15 }}>ชื่อ:{maid.name}</Text>
      </View>

      <View style={styles.textLine}>
        <Text style={{ color: 'white', fontSize: 15 }}>อายุ:{maid.age}</Text>
      </View>

      <View style={styles.textLine}>
        <Text style={{ color: 'white', fontSize: 15 }}>เบอร์ติดต่อ :{maid.phone}</Text>
      </View>

      <View style={styles.textLine}>
        <Text style={{ color: 'white', fontSize: 15 }}>พิกัด :{maid.detail}</Text>
      </View>

      <View style={styles.textLine}>
        <Text style={{ color: 'white', fontSize: 15 }}>ความสามารถพิเศษ :{maid.skill}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>{date_me.toString()}</Text>
        <DatePicker onDateChange={(date) => { _onDateChange(date) }} />
      </View>



      <View style={styles.btn}>

        <Button titleStyle={{ fontSize: 22, }}
          buttonStyle={{ borderRadius: 50, width: 100, backgroundColor: '#F5C2C2', justifyContent: 'center', }} title='Select' onPress={() => { _onSubmit() }}></Button>
      </View>





    </ScrollView>

  )




}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#61AC7F",
    minHeight: "50%",
    paddingTop: 20,
  },
  textLine: { marginBottom: 5, padding: 10 },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  maidImage: {
    height: 300
  },
});