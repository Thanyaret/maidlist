import React ,{ useState, useEffect} from 'react'
import { View, Text ,StyleSheet,FlatList, TouchableOpacity, Image} from 'react-native'
import axios from 'axios'
import { Button } from 'react-native-elements';
import {backendUrl} from "../../../config"
export default function status() {
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
    return (
        <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}

          >
 
            <View style={{flex:1, flexDirection: 'row'}}>
                
                <Image source = {{ uri: item.maid_name.photo }} style={styles.imageView} />             
             <View style={{alignItems:"lift",flex:'1'}}>
              <Text style={{fontWeight:"bold", }}>{item.maid_name.name}</Text>
              <Text style={{fontWeight:"bold",color:"#95A5A6" }}>วันที่จอง:{item.maid_name.date}</Text>
              <Text style={{fontWeight:"bold",color:"#D8A31D"}}>{item.status ? "ยืนยันแล้ว" : "รอยืนยัน"}</Text>
              
            </View>                    
            </View>
            
          </TouchableOpacity>
        )}
      />
    </View>
    
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
    height: 100,
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