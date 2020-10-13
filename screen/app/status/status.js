import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

export default function status() {
    return (
        <View style={styles.container}>
            <Text>สถานะการจอง</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#61AC7F",
      minHeight: "100%",
      paddingTop: 30,
    }
});
