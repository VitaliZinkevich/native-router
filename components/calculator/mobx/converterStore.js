import { createContext } from 'react'
import { observable, action, observer, decorate} from 'mobx'
import { task } from 'mobx-task'

import {AsyncStorage} from 'react-native';

import {configure} from "mobx"

//configure({enforceActions: 'always'})
//configure({ enforceActions: "observed" })

// инпут добавления валют
// значения всех инпутов
// активный инпут 

// добавленные валюты
// usd eur byn rub
class ConverterStore  {

  inputs = [];
  activeInputs = [];
  ratesKeys = [];
  rates = [];
  base = '';
  date = '';
  
  makeInputs = (currencies)=>{
    let inputs = [];
    let baseIndex = null;
    let activeItem = null;
    for (let i = 0; i < currencies.length; i++ ) {
      if (currencies[i] === 'USD'){
        activeItem = {input: 1, select: currencies[i], active: true}
        inputs.push ( activeItem );
        baseIndex = i;
      }
      inputs.push ({input: this.rates[currencies[i]], select: currencies[i], active: false})
    }
    inputs.splice (baseIndex, 1);
    inputs.unshift (activeItem);
    this.inputs = inputs;
    this.activeInputs = inputs.slice(0, 3);
  }

  getRates = async () => {
    await fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(r => r.json())
      .then(action(response => {
        this.ratesKeys = Object.keys (response.rates);
        this.rates = response.rates;
        this.date = response.date;

        this.makeInputs (Object.keys (response.rates)/*JSON.parse(JSON.stringify(this.ratesKeys))*/);
      }))
  };

  changeInput =(text)=>{
    console.log(text)
  }

}

decorate(ConverterStore, {

  inputs : observable,
  activeInputs : observable,
  ratesKeys : observable,
  rates : observable,
  base : observable,
  date : observable,

  getRates : action,
  changeInput: action,
});

let converterStore = new ConverterStore();
converterStore.getRates();
//AsyncStorage.clear()

export default createContext (converterStore);