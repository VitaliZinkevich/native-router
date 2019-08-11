import React from 'react';
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native'



const PickerValue = (props) =>  {
 
   return (
      <View style={styles.container}>
            <Text>{JSON.stringify(props.value)}</Text>
            <TextInput 
               style={styles.text} 
               defaultValue={props.value+''}
               onChangeText={(text)=>{props.onTextCange(text, props.index )}}
               />

            <Picker  style={styles.select} 
                  onValueChange = {(value)=>{props.onValueChange( value, props.index )}}
                  selectedValue={props.value+''}
                  >
            <Picker.Item label = "Steve" value = "steve" />
            <Picker.Item label = "900" value = "900" />
            <Picker.Item label = "400" value = "400" />
            <Picker.Item label = "100" value = "100" />
            <Picker.Item label = "Ellen" value = "ellen" />
            <Picker.Item label = "Maria" value = "maria" />
         </Picker>

      </View>
   )

}
export default PickerValue

const styles = StyleSheet.create({
   text:{
        flex: 2,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'blue'
    },
   select:{
        flex: 1.5,
    },
   container:{
       flex: 1,
       flexDirection: 'row',
       margin: 10
       

   },
})