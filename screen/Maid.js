import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import axios from 'axios'

import AppTemplateScreen from './Template'

import { SearchBar } from 'react-native-elements';







export default function HomeScreen(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const setHeader = () => {
    props.navigation.setOptions({
      headerRight: () => (
        
        <Button
          title="Menu"
          onPress={() => {
            props.navigation.push("ResumeForm");
          }}
        />
      ),
    });
  };
  useEffect(() => {
    setHeader();
    axios
      .get("http://10.94.0.151:8000/api/maid/")
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



  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }


   
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.push("MaidDetail",item.id)
            }
          >

            
            <View style={{flex:1, flexDirection: 'row'}}>
                
                <Image source = {{ uri: item.photo }} style={styles.imageView} />
              
                <Text  style={{width:'50%', textAlignVertical:'right',padding:10,color: 'red',flex:1}} >{item.name}</Text>

                <Text  style={{textAlignVertical:'center',padding:20,flex:1}} >{item.detail}</Text>
              {/* <View >
                  <Text  style={{width:'50%', textAlignVertical:'right',padding:10,color: 'red',flex:1}} >{item.name}</Text>
                  <Text  style={{textAlignVertical:'center',padding:10,flex:1,fontWeight: 'bold',fontSize:18}} >{item.name}</Text>

                  <Text  style={{textAlignVertical:'center',padding:10,flex:1,color:"#D8A31D",fontSize:15}} >{item.detail}</Text>

              </View> */}
              
                      
            </View>
            


            <Image source={{uri: item.photo}}
                   style={{width:60, height:60,borderRadius:30,flexDirection:'row',horizontal:'5',borderRadius:'5'}} />
            <View style={{alignItems:"center",flex:'1'}}>
              <Text style={{fontWeight:"bold"}}>{item.name}</Text>
              <Text>{item.detail}</Text>
            </View>
            
            
          </TouchableOpacity>
        )}
      />
      <AppTemplateScreen/>
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
    // return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Home</Text>
    //   </View>
    // );
  
  
  