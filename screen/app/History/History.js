import React ,{ useState, useEffect} from 'react'
import { ScrollView,View, Text,StyleSheet,FlatList,Image } from 'react-native'
import axios from 'axios'
import {backendUrl} from "../../../config"

export default function History() {
    const [list, setHistory] = useState([]);

    useEffect (() => {
      axios
        .get( backendUrl+"/api/historymaid/")
        .then((res) =>{
            console.log(res.data)
            setHistory(res.data)
      }).catch((error) =>{
          console.log('error' , error)
      })
    }, []);
         
  
    return (
        
        <ScrollView style={styles.container}>   
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item) => item.id+""}
          renderItem={({ item }) => (
            <View           
             style={styles.item}
            >
              <View style={{flex:1, flexDirection: 'row'}}>                 
                  <Image source = {{ uri:  item.maid_history_data.photo }} style={styles.imageView} />
               <View style={{alignItems:"lift",flex:'1'}}>
                <Text style={{fontWeight:"bold",}}>{item.maid_history_data.name}</Text>
                <Text style={{color:"#95A5A6"}}>{item.maid_history_data.phone}</Text>
                <Text style={{color:"#D8A31D"}}>รีวิวแม่บ้าน :{item.maid_history_data.review}</Text>
              </View>            
              </View>
              </View>                           
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