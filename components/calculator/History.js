import React, {useContext} from 'react'
import calculatorStore from './mobx/calculatorStore'

import { observer } from "mobx-react"
import { StyleSheet } from 'react-native';
import {
    View,
    Text,
    } from 'native-base';
import { green } from 'ansi-colors';

    const styles = StyleSheet.create({
      operation: {
        flexDirection: 'row',
        justifyContent: "space-evenly"
      },
      container: {
        flexDirection: "column",
      }
    });

const History = observer(() => {
    const { operations } = useContext(calculatorStore);
    let operationsView = operations.map ((operation, index)=>{
      return (
      <View style={styles.operation} key={index}>
        <Text>{index + 1}</Text>
        <Text>date: {new Date (operation.date).toLocaleDateString()}</Text>
        <Text>action: {operation.action.join('')}</Text>
        <Text>answer: {JSON.stringify(operation.answer)}</Text>
      </View>
      )
  })
        return (
        <View style={styles.container}>
            { operationsView }
        </View>
    )
})

export default History
