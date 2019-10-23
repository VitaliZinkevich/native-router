import { createContext } from 'react'
import { decorate, observable, action} from 'mobx'
import { task } from 'mobx-task'

import { AsyncStorage } from 'react-native';
import buttons from '../buttons'

let buttonsText = buttons;
                    
import {configure} from "mobx"
configure({ enforceActions: "observed" })

class Store  {

  action =  []
  answer = null
  quote =  ''
  operations= []
  debugger = undefined
  resLast = false;

  getKennyQuote = task (async () => {
    await fetch('https://api.kanye.rest')
      .then(r => r.json())
      .then(answer => this.quote = answer)
  });

  storeData = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify (item));
  } catch (error) {
    this.debugger = JSON.stringify (error);
  }
};

retrieveData = (async (key, item) => {
  try {
    const value = await AsyncStorage.getItem(`${key}`);
    if (value) {

      let parsed = JSON.parse (value);
      if (!!parsed && parsed.length > 0 && this.operations.length === 0) {
        this.operations = parsed;
      }
      this.debugger = value
      this.storeData('operations', this.operations);
      
    } else {
      this.debugger = value;
      this.storeData('operations', []);
    }
  } catch (error) {
      // Error retrieving data
      // no storage at all
  }
  
});



  addOperation = action ((row, i) => {

  if (this.resLast){
    this.action = [];
    this.resLast = false;
  }

  let ind = !!row ? 
  !!i ? 4*row+i : 4*row+i
  : 
  !!i ? 4*row+i : 4*row + i;
  let action = buttonsText[ind];

  switch(action) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '.':
    case '-':
    case '+':
    case '*':
    case '/':
      this.action.push(action);
      break;
    case '=':
      let answer = eval (this.action.join(''));
      this.operations.push(
        {action: this.action, 
          answer: answer, 
          date: Date.now()})
      
      this.retrieveData('operations');
      
      this.resLast = true;
      this.answer = answer;
    break;
    case 'C':
        this.action = [];
        this.answer = null;
    break;
    case '<-':
        this.action.pop();
    break;
    case '+/-':
        //this.action.unshift('-');
    break;
    default:
    }
  })
}

decorate(Store, {
  answer: observable,
  action: observable,
  quote: observable,
  operations: observable,
  debugger: observable,

});

let appStore = new Store();
appStore.retrieveData('operations');
//AsyncStorage.clear()

export default createContext (appStore);