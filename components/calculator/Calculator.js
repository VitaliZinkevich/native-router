import React, { useContext } from 'react';
import {
  View,
  Content,
  Text,
} from 'native-base';

import   {TouchableOpacity} from 'react-native'
import calculatorStore from './mobx/calculatorStore'

import {
  StyleSheet,
} from 'react-native';

import { observer } from "mobx-react"

import buttons from './buttons'

let rows = [0,1,2,3,4];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignContent: 'center', 
    alignItems: 'center' 
  },
  footer:{
    flex: 0
  },
  actionView: {
    flex: 0.2,
    backgroundColor: '#add8e6'
  },
  buttonsView:{
    flex: 1,
    justifyContent:'space-around'
  },
  textButton: {
      width: 70,
      height: 70,
      textAlign: 'center',
      alignContent: 'center',
      textAlignVertical :'center' 
  }
});
  const Calculator = observer (()=>{

  const store = useContext(calculatorStore);
  
  let buttonsCopy = [...buttons];

  let prepButtons = (row)=>{
    let result = [];
    for (let i = 0; i <= 3; i++) {
      result.push(<TouchableOpacity  
                      rounded
                      large
                      key={buttonsCopy[i]}
                      style={styles.button}
                      info 
                      onPress={()=>{
                        store.addOperation(row, i)}}>
                    <Text style={styles.textButton}>{buttonsCopy[i]}</Text>
                  </TouchableOpacity >);
    }
    buttonsCopy.splice (0,4);
    return result;
  }
  let rowsView = rows.map((row, index)=>{
    return  <View key={row+row+""} style={styles.row}>  
              {prepButtons(row)}
            </View>
  });

  return (
      

        <Content contentContainerStyle={styles.container}>
          <View style={styles.actionView}>
            <Text style={{fontSize: 25}}>
              {store.action}
            </Text>
            <Text style={{fontSize: 35, color: 'black'}}>
              {store.answer}
            </Text>
          </View>
          <View style={styles.buttonsView}>
            {rowsView}
          </View>
        </Content> 
  

   
   );
});

export default Calculator;