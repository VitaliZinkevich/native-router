import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Picker,
    Button, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';

// import { Formik, FieldArray, Form } from 'formik';
// import FormikObserver from 'formik-observer';

// import converterStore from './mobx/converterStore'
// import { observer } from "mobx-react"

import MapView from 'react-native-maps';

let Exchange = (props)=>{
  
 return (
  <View  >
      {/* <Text>Exchange</Text> */}
      <MapView
        style={styles.map}
        initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
    />
    
  </View> 
 );
};

// const styles = StyleSheet.create({
//     container: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     map: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//     },
//   });

const styles = StyleSheet.create({
  activeInput:{
    backgroundColor: 'grey',
    fontSize: 16,
    fontWeight: '700',
    color: '#cc2016'
  },
  map: {
    height: 500
  }
});

export default Exchange;
