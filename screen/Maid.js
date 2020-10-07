import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import axios from 'axios'
import Template from './Template'
import {Icon} from "react-native-elements";

export default function HomeScreen(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const setHeader = () => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
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
      .get("http://10.94.5.84:8000/api/maid/")
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.push("MaidDetail",item.id)
            }
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Image source={{uri: item.photo}}
                   style={styles.maidImage} />
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
    height: 300
},
});
    // return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Home</Text>
    //   </View>
    // );
  
  
  