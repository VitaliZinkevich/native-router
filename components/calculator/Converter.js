import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Picker,
    Button, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';

import { Formik, FieldArray, Form } from 'formik';
import FormikObserver from 'formik-observer';

import converterStore from './mobx/converterStore'
import { observer } from "mobx-react"

let ConverterForm = (props)=>{
  let {delInput, ratesKeys, changeInput } = useContext (converterStore);
  const inputEl = React.createRef();
  console.log(props.inputObj.active, props.inputObj.select)
  useEffect(() => {
    if (!!props.inputObj.active) {
      inputEl.current.focus();
    }
  }, [inputEl]);
 return (
  <View style={props.inputObj.active ? {...styles.activeInput, ...styles.rate} : {...styles.rate}}>
    <TextInput
      ref={inputEl}
      keyboardType='numeric'
      style={styles.text} 
      defaultValue={props.inputObj.input+''}
      onChangeText={(val)=> {changeInput ({value: val, input: props.inputObj})}}
      />
    <Picker
        style={styles.select}    
          onValueChange = {(val)=>{changeInput({value: val, input: props.inputObj, picker: true})}}
          selectedValue={props.inputObj.select}
          >
        {ratesKeys.map ((item, index) => {
            return <Picker.Item label = {item} value = {item} key={index}/>
        })}
    </Picker>
      <TouchableOpacity style={styles.del} onPress={()=>{delInput(props.inputObj.select)}}><Text>X</Text></TouchableOpacity>
  </View> 
 );
};

const inputs = ()=>{
  let { inputs } = useContext (converterStore);
  let view = inputs.filter ((inp, index)=>{
    return inp.added === true;
  })
  let inpView= view.map ((el, i)=>{
    return <ConverterForm key={i} inputObj={el}/>;
  });
  console.log('inputs')
  return (
    <View>
      {inpView}
    </View>
  );
};

  const AddInput = ()=>{

    let {ratesKeys, addNewCurrency } = useContext (converterStore);
    return (
      <View>
        <Picker
              selectedValue={''}
              onValueChange = {(val)=>{addNewCurrency(val)}}
              >
                <Picker.Item label = {'Add currency'} value = {''} key={-1}/>
            {ratesKeys.map ((item, index) => {
                return <Picker.Item label = {item} value = {item} key={index}/>
            })}
        </Picker>
      </View>
    )
  } 


 const Converter = observer  (() => {
    console.log('Converter')
    return (
      <ScrollView>
          {inputs()}
          <AddInput/>
      </ScrollView>
)});

const styles = StyleSheet.create({
  activeInput:{
    backgroundColor: 'grey',
    fontSize: 16,
    fontWeight: '700',
    color: '#cc2016'
  },
  text: {
    flex:0.6,
  },
  select: {
    flex:0.3,
  },
  rate:{
    flexDirection: 'row' ,
  },
  del:{
    flex:0.1,
    justifyContent:"center",
    alignItems:"center",
  }
});

export default Converter;
