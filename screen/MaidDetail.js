import React ,{ useState, useEffect} from 'react'
import axios from 'axios'
import { StyleSheet, View ,Text ,Image} from 'react-native'
import { Button } from 'react-native-elements';

export default function MaidDetail(props) {
    const[resume, setResume] = useState({
        name: '',
        nickname: '',
        age: '',
        skill: '',
    })
    // useEffect (() => {
    //     const id = props.route.params.id
    //     axios.get('http://10.94.5.84:8000/api/maid/' + id)
    //     .then((res) =>{
    //         setResume(res.data)
    //     }).catch((error) =>{
    //         console.log('error' , error)
    //     })
    // }, [])

return (
        <View style={styles.container}>
        <Image
        style={styles.avatar} 
        source={{uri:'https://movie-api.igeargeek.com' + resume.avatar}}/>
        <View style={styles.textLine }>
        <Text style={{ color: 'white',fontSize:17 }}>ชื่อ:{resume.name}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:17 }}>อายุ:{resume.nickname}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:17 }}>เบอร์ติดต่อ :{resume.nickname}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:17 }}>พิกัด :{resume.age}</Text>
        </View>
        <View style={styles.textLine}>
        <Text style={{ color: 'white',fontSize:17 }}>ความสามารถพิเศษ :{resume.skill}</Text>
        </View>
        <View style={styles.btn}>
              <Button titleStyle={{fontSize: 22,}} buttonStyle={{borderRadius:50,width:100,backgroundColor:'#F5C2C2',justifyContent:'center',}} title='Select'></Button>
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
        // avatar:{width:'100%', height:360,marginBottom:20,}
    });
