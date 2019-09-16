import React, {useContext} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Picker,
    Button, 
    TextInput
} from 'react-native';

import { Formik, FieldArray, Form } from 'formik';
import FormikObserver from 'formik-observer';

import converterStore from './mobx/converterStore'
import { observer } from "mobx-react"

let inputObj = {input: 1, select: "USD", active: true}

let ConverterForm = (props)=>{
  let { ratesKeys } = useContext (converterStore);
 return (
  <View>
    <TextInput 
      //  style={styles.text} 
      defaultValue={props.inputObj.input+''}
      // onChangeText={(text)=>{inputObj.changeInput(text)}}
      />

    <Picker   
          // onValueChange = {(value)=>{inputObj.changeInput( value )}}
          selectedValue={props.inputObj.select+''}
          >
        {ratesKeys.map ((item, index) => {
            return <Picker.Item label = {item} value = {item} key={index}/>
        })}
    </Picker>
  </View> 
 );
};

const inputs = ()=>{
  let { activeInputs } = useContext (converterStore);
  let view = activeInputs.map((inp, index)=>{
    return <ConverterForm key={index} inputObj={inp} />;
  })
  return (
    <View>
      {view}
    </View>
  );
};


 const Converter = observer  (() => {
    // let {ratesKeys, ratesValues, /*onValueChange, onTextCange*/} = useContext (converterStore);
    return (
      <View >
          {inputs()}
      </View>
)});

const styles = StyleSheet.create({
  employee: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 40,
      padding: 5,
      backgroundColor: '#FFFFFF'
  },
  cover: {
      flex: 1,
      height: 150,
      marginTop: 40,
      resizeMode: 'contain'
  },
  info: {
      flex: 3,
      flexDirection: 'column',
      alignSelf: 'center',
      padding: 20
  },
  name: {
      alignSelf: 'center',
      marginBottom: 12,
      fontSize: 16,
      fontWeight: '700',
      color: '#222222'
  },
  fontBold: {
      fontWeight: '700'
  }
});

export default Converter;
