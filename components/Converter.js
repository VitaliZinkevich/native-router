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

import AppHeader from './Layout/AppHeader'

import converterStore from '../mobx/converterStore'


import { Actions } from 'react-native-router-flux';
import SideBar from './Layout/SideBar';


const Converter = observer ( () => {

        let {values, onValueChange, onTextCange} = useContext(converterStore);
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
            
            <Container>
                <AppHeader/>
                <Content>
                    {/* <SideBar></SideBar> */}
                    {inputs}
                    <Text>{JSON.stringify(values)}</Text>
                    <Button onPress={()=>{
                        
                        Actions.calc()
                        
                        }}><Text>Calc</Text></Button>
                </Content>
            </Container>
                

            
            )
    }
)

export default Converter
