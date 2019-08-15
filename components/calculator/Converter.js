import React, {useContext} from 'react'
import { observer } from "mobx-react"
import Picker from 'react-native'
import PickerValue from './PickerValue'


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

// import AppHeader from './Layout/AppHeader'

import converterStore from './mobx/converterStore'


import { Actions } from 'react-native-router-flux';
// import SideBar from './Layout/SideBar';


const Converter = observer ( () => {

        let {values, rates, onValueChange, onTextCange} = useContext(converterStore);
        values
        let inputCount = [0, 1, 2];
        let inputs = inputCount.map(inputNumber => (
            <PickerValue
                key={inputNumber}
                value = {values[inputNumber]}
                index={inputNumber}
                onValueChange={onValueChange}
                onTextCange={onTextCange}
            ></PickerValue>
        ));
    
            console.log(Actions)
        return (
            
            
               
                <Content>
                    {/* <SideBar></SideBar> */}
                    {/* {inputs}
                    <Text>{JSON.stringify(rates)}</Text>
                    <Text>{JSON.stringify(values)}</Text> */}
                    <Text>converter</Text>
                </Content>
            
                

            
            )
    }
)

export default Converter
