import React ,{ useState, useEffect} from 'react'
import axios from 'axios'
import { StyleSheet, View ,Text ,Image} from 'react-native'
import { Button } from 'react-native-elements';

export default function MaidDetail(props,route) {
    const[maid, setMaid] = useState({
        name: '',
        age: '',
        phone: '',
        skill: '',
    })

    useEffect (() => {
        console.log(props.route.params);
        axios.get('http://10.94.0.151:8000/api/maid/' + props.route.params)
        .then((res) =>{
            setMaid(res.data)
        }).catch((error) =>{
            console.log('error' , error)
        })
    }, [])
    


return (
        <View style={styles.container}>
        <Image source={{uri: maid.photo}}
                   style={styles.maidImage} />
        <View style={styles.textLine }>
        <Text style={{ color: 'white',fontSize:20 }}>ชื่อ:{maid.name}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:20 }}>อายุ:{maid.age}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:20 }}>เบอร์ติดต่อ :{maid.phone}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:20 }}>พิกัด :{maid.age}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:20 }}>ความสามารถพิเศษ :{maid.skill}</Text>
        </View>
        <View style={styles.btn}>
              <Button titleStyle={{fontSize: 22,}}  buttonStyle={{borderRadius:50,width:100,backgroundColor:'#F5C2C2',justifyContent:'center',}} title='Select'></Button>
        </View>
          
    </View>
    
)
}
    const styles = StyleSheet.create({
        container: {
          backgroundColor: "#61AC7F",
          minHeight: "100%",
          paddingTop: 30,
        },
        textLine: {marginBottom:20},
        btn:{ alignItems:'center',
            justifyContent:'center',
    },
    maidImage: {
        height: 300
    },
    });
