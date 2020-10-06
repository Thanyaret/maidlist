import React, {useEffect ,useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { TouchableHighlight ,FlatList} from 'react-native-gesture-handler'
import axios from 'axios'
import moment from 'moment'


export default function MaidList({navigation}) {
 return (

    
        <View style={{flex:1 , backgroundColor:'white'}}>
            
                <TouchableHighlight onPress={() => navigation.navigate('MaidDetail'
                )
                }>
            
             
              <View style={{padding: 20}}>
                    <Text >go to Maid</Text>
            </View>
          </TouchableHighlight> 

    


      
      
  </View>
 )
            }




              
        

