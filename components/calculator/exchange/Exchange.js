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
import { Marker } from 'react-native-maps';

import { PermissionsAndroid } from 'react-native';


async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const LoadingView = ()=>{
  return <Text>'Loading'</Text>;
}

const MarkersView = (props)=>{
  let [watchCoord, setWatchCoord] = useState(null);
  
  useEffect(() => {
    let watchID = navigator.geolocation.watchPosition((info)=>{
      setWatchCoord (info.coords);
   },(err)=>{console.log (err)},
   {enableHighAccuracy: true}
    );
    
  return () => {
    navigator.geolocation.clearWatch(watchID)
  } 
}), [];
  console.log('render MarkersView')
  return ( <>
    {watchCoord ? (<Marker
    coordinate={{
      latitude: watchCoord.latitude,
      longitude: watchCoord.longitude,
    }}
    title={'Vitali'}
    description={'You are here'}/>) : <Marker
    coordinate={{
      latitude: props.latitude,
      longitude: props.longitude,
    }}
    title={'Vitali'}
    description={'You are here'}/>}
    </>
  )
} 

const MapViewView = ()=>{
  let [coord, setCoord] = useState(null);

  useEffect (()=>{
    navigator.geolocation.getCurrentPosition ((info)=>{
      setCoord (info.coords);
   },(err)=>{console.log (err)},
   {enableHighAccuracy: true}
    ); 
  }, [])

  console.log ('render MapViewView')
  return (
    <View  >
        {/* <Text>Exchange</Text> */}
        {coord ? (<MapView
        style={styles.map}
        initialRegion={{
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
    >
    <MarkersView {...coord}/>
    </MapView>) : (<LoadingView />)}
  </View> )
}

let Exchange = ()=>{
console.log('render Exchange')
 return (<View >
  <MapViewView /> 
  </View>
 );
};

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
