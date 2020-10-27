import React ,{ useState, useEffect} from 'react'
import {ScrollView, View, Text ,StyleSheet,FlatList, TouchableOpacity, Image,Alert} from 'react-native'
import axios from 'axios'
import { Button } from 'react-native-elements';
import {backendUrl} from "../../../config"
export default function status(props) {
    const [list, setStatus] = useState([]);
    useEffect (() => {
        axios
      .get( backendUrl+"/api/statusmaid/")
      .then((res) =>{
          console.log(res.data)
          setStatus(res.data)
    }).catch((error) =>{
        console.log('error' , error)
    })
}, [])

const Delete_me = (id) => {
  axios
    .delete(`${backendUrl}/api/statusmaid/${id}/`)
    .then((res) => {
      
      Alert.alert("Delete success", "ลบสำเร็จแล้ว", [
        {
          text: "ตกลง",
          
        },
      ]);
    })
    .catch((error) => {
      console.log("error ", error);
    })
    .finally(() => {});
};
    return (
        <ScrollView style={styles.container}>
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}

          >
 
            <View style={{flex:1, flexDirection: 'row'}}>
                
                <Image source = {{ uri: item.maid_name_data.photo }} style={styles.imageView} />             
             <View style={{alignItems:"lift",flex:'1'}}>
              <Text style={{fontWeight:"bold", }}>{item.maid_name_data.name}</Text>
              <Text style={{fontWeight:"bold",color:"#95A5A6" }}>{item.maid_name_data.phone}</Text>
              <Text style={{fontWeight:"bold",color:"#95A5A6" }}>วันที่จอง:{item.date}</Text>
              <Text style={{fontWeight:"bold",color:"#D8A31D"}}>{item.status ? "ยืนยันแล้ว" : "รอยืนยัน"}</Text>
              <View style={styles.btn}>
              <Button titleStyle={{ fontSize: 10, }}
                buttonStyle={{ borderRadius: 20, width: 80, backgroundColor: '#F5C2C2', justifyContent: 'center', }} title='ยกเลิกการจอง' onPress={() => {
                  Delete_me(item.id );
                }}
                ></Button>
            </View>
            </View>                    
            </View>
            
          </TouchableOpacity>
        )}
      />
    </ScrollView>
    
    );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#61AC7F",
    minHeight: "100%",
    paddingTop: 30,
  },
  Topic: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {   
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10
  },
  maidImage: {
    height: '85%',
    width:'30%'
},
  textdata:{

    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {

    width: '50%',
    height: '100%',
    
    borderRadius : 7
 
},
textView: {

  width:'50%', 
  textAlignVertical:'center',
  padding:10,
  color: '#000'

}
});