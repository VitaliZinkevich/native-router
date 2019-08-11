import { createContext } from 'react'
import { observable, action, observer} from 'mobx'
import { task } from 'mobx-task'

import {AsyncStorage} from 'react-native';

import {configure} from "mobx"
//configure({enforceActions: 'always'})
//configure({ enforceActions: "observed" })


class ConverterStore  {

  @observable values = [
    100, 400, 900
    ]
  @observable rates = {};

  @action onValueChange = (val, index)=>{
      this.values[index]= val;
  }

  @action onTextCange = (event, index)=>{
    console.log(event, index);
    this.values[index] = event;
  }
  @task getRates = async () => {
    await fetch('https://api.exchangeratesapi.io/latest')
      .then(r => r.json())
      .then(action(response => this.rates = response))
  };

}

let converterStore = new ConverterStore();
converterStore.getRates();
//AsyncStorage.clear()

export default createContext (converterStore);