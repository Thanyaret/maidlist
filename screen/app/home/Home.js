import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'
import {backendUrl} from "../../../config"



export default function HomeScreen(props) {

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const go_to_login = ()=>{
    navigation.navigate('Login')
};
  const setHeader = () => {
    props.navigation.setOptions({
      

                
        
       
      
    });
  };
  useEffect(() => {
    setHeader();
    axios
      .get(  backendUrl+"/api/maid/")
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
   
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      
     
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id+""}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.navigate("MaidDetail",item.id)
            }
          >

            
            <View style={{flex:1, flexDirection: 'row'}}>
                
                <Image source = {{ uri: item.photo }} style={styles.imageView} />
             <View style={{alignItems:"lift",flex:'1'}}>
              <Text style={{fontWeight:"bold",}}>{item.name}</Text>
              <Text style={{color:"#95A5A6"}}>{item.phone}</Text>
              <Text style={{color:"#D8A31D"}}>{item.detail}</Text>
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
    height: '70%',
    width:'25%'
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

  
  
  