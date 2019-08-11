import React, {useContext} from 'react'
import calculatorStore from './mobx/calculatorStore'

import { observer } from "mobx-react"

import {
    View,
    Title,
    Container,
    Header,
    Content,
    Button,
    Text,
    Left,
    Icon,
    Right,
    Body,
    Footer,
    FooterTab
    } from 'native-base';

const History = observer(() => {
    const { operations } = useContext(calculatorStore);
        return (
        <View>
            <Text>History</Text>
           { operations.map (operation=>{
                return <Text key={operation.date}>{JSON.stringify(operation)}</Text>;
            })}
        </View>
    )
})

export default History
