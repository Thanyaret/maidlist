import React ,{ useState, useEffect} from 'react'
import axios from 'axios'
import { StyleSheet, View ,Text ,Image} from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {backendUrl} from "../../../config"


export default function MaidDetail(props,route) {
    const[maid, setMaid] = useState({
        name: '',
        age: '',
        phone: '',
        skill: '',
    })
    const [date_me,setDateMe] = useState("")
   
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
      
    const showDatePicker = () => {
      setDatePickerVisibility(true); 
      
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (Startdate) => {
      console.warn("เลือกวันที่: ", Startdate);
      setDateMe(Startdate)
      hideDatePicker();
    };
    


    useEffect (() => {
        console.log(props.route.params);
        axios.get( backendUrl +'/api/maid/' + props.route.params)
        .then((res) =>{
            setMaid(res.data)
        }).catch((error) =>{
            console.log('error' , error)
        })


    }, [])


return (
        
        <ScrollView style={styles.container}>
        <Image source={{uri: maid.photo}}
                   style={styles.maidImage} />

        <View style={styles.textLine }>
        <Text style={{ color: 'white',fontSize:15 }}>ชื่อ:{maid.name}</Text>
        </View>
        
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:15 }}>อายุ:{maid.age}</Text>
        </View>
        
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:15 }}>เบอร์ติดต่อ :{maid.phone}</Text>
        </View>
        
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:15 }}>พิกัด :{maid.detail}</Text>
        </View>
        
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:15 }}>ความสามารถพิเศษ :{maid.skill}</Text>
        </View>
        <View style={{borderBottomColor:'white', borderBottomWidth:1,marginVertical:5}}>
            
        </View>
            <View style={styles.textLine}>
                <Text style={{ color: 'white',fontSize:15 }}>เลือกวันที่ : {date_me.toString()}</Text>                
            </View>

        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Button title="Show Date Picker" onPress={showDatePicker} buttonStyle={{borderRadius:50,width:200,backgroundColor:'#F5C2C2',marginBottom:5 }} />
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              
            />
        </View>



        <View style={styles.btn}>
             
              <Button titleStyle={{fontSize: 22,}}
                buttonStyle={{borderRadius:50,width:100,backgroundColor:'#F5C2C2',justifyContent:'center',}} title='Select'></Button>
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
        textLine: {marginBottom:5,padding:10},

        btn:{ alignItems:'center',
            justifyContent:'center',
    },
    maidImage: {
        height: 300
    },
    });
