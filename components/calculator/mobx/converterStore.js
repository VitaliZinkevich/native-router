import { createContext } from 'react'
import { observable, action, observer, decorate} from 'mobx'
import { task } from 'mobx-task'

import {AsyncStorage} from 'react-native';

import {configure} from "mobx"
//configure({enforceActions: 'always'})
//configure({ enforceActions: "observed" })


class ConverterStore  {

   values = [
    100, 400, 900
    ]
   rates = {};

   onValueChange = (val, index)=>{
      this.values[index]= val;
  }

   onTextCange = (event, index)=>{
    console.log(event, index);
    this.values[index] = event;
  }
   getRates = async () => {
    await fetch('https://api.exchangeratesapi.io/latest')
      .then(r => r.json())
      .then(action(response => this.rates = response))
  };

}

decorate(ConverterStore, {
  values: observable,
  rates: observable,

  
  onTextCange: action,
  onValueChange: action,
  getRates:action
});

let converterStore = new ConverterStore();
converterStore.getRates();
//AsyncStorage.clear()

export default createContext (converterStore);