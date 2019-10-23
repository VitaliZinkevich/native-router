import { createContext } from 'react'
import { observable, action, observer, decorate} from 'mobx'
import { task } from 'mobx-task'

import {AsyncStorage} from 'react-native';

import {configure} from "mobx"

configure({ enforceActions: "observed" })

class ConverterStore  {

  inputs = [];
  ratesKeys = [];
  rates = {};
  base = '';
  date = '';
  
  makeInputs = (currencies)=>{
    let inputs = [];
    let added = ['USD', 'EUR', 'RUB'];
    for (let i = 0; i < currencies.length; i++ ) {
      if (added.findIndex ( (el)=>{return el === currencies[i]})  >=  0){
        activeItem = {input: this.rates[currencies[i]], select: currencies[i], active: false, added: true};
        inputs.push (activeItem);
      } else {
        inputs.push ({input: this.rates[currencies[i]].toFixed(2), select: currencies[i], active: false, added: false});
      }
    this.inputs = inputs;
    }
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

  addNewCurrency = (currency)=>{
    if(currency){
      let inpCopy = JSON.parse(JSON.stringify(this.inputs))
      for (let i = 0; i< inpCopy.length; i++) {
          if (inpCopy[i].select === currency) {
            inpCopy[i].added = true;
            break;
          }
      }
      this.inputs = inpCopy;
    }
      
  }

  countRates = (array, activeInput)=>{
    let activenum = parseInt (activeInput.input ,10)
    let activeToUsd = activenum / this.rates[activeInput.select]/*за 1 долл*/
    
    array.forEach(el=>{
      if (el.added && el.select !== activeInput.select && activeToUsd) {
        el.input = (this.rates[el.select] * activeToUsd).toFixed(2);
      }
    })
    return array;
  }

  changeInput =  action (({value, input, picker}) => {
    let inpCopy = JSON.parse(JSON.stringify(this.inputs))
    if (picker) {
      let activeInputIndex = this.inputs.findIndex (el=>{
        return el.select === value;
      });
      let oldActive = this.inputs.findIndex (el=>{
        return el.select === input.select;
      });
      inpCopy[oldActive].added = false;
      inpCopy[activeInputIndex].added = true;
      inpCopy[activeInputIndex].input = inpCopy[oldActive].input;
      let currActive = this.inputs.findIndex (el=>{
        return el.active === true;
      });
      if ( currActive!== -1 ) {
        inpCopy[currActive].active = false;
      }
      inpCopy[activeInputIndex].active = true;
      inpCopy = this.countRates(inpCopy, inpCopy[activeInputIndex])
    } else {
      let currentInputIndex = this.inputs.findIndex (el=>{
        return el.select === input.select;
      });
      
      inpCopy[currentInputIndex].input = value;
      
      let currActive = this.inputs.findIndex (el=>{
        return el.active === true;
      });
      if ( currActive!== -1 ) {
        inpCopy[currActive].active = false;
      }
      inpCopy[currentInputIndex].active = true;

      // inpCopy[currentInputIndex].autoFocus = true;
      //inpCopy[currActive].autoFocus = false;

      inpCopy = this.countRates(inpCopy, inpCopy[currentInputIndex])
    }
    
    this.inputs = inpCopy;
  })

  delInput =(currency)=>{
    
    let inpCopy = JSON.parse(JSON.stringify(this.inputs))
    for (let i = 0; i<inpCopy.length; i++) {
      if(inpCopy[i].select === currency){
        inpCopy[i].added = false;
        break;
      }
    }
    this.inputs = inpCopy;
  }
}

decorate(ConverterStore, {

  inputs : observable,
  ratesKeys : observable,
  rates : observable,
  base : observable,
  date : observable,

  getRates : action,
  // changeInput: action,
});

let converterStore = new ConverterStore();
converterStore.getRates();

export default createContext (converterStore);