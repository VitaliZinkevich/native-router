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

let Exchange = (props)=>{
  let [coord, setCoord] = useState(null);
  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((info)=>{
      setCoord (info.coords);
   },()=>{},
   {enableHighAccuracy: true}
);
  })
  const LoadingView = ()=>{
    return <Text>'Loading'</Text>;
  }

  const MapViewView = (props)=>{
    return (<MapView
      style={styles.map}
      initialRegion={{
      latitude: props.latitude,
      longitude: props.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}
  >
  
  </MapView>)
  }

 return (
  <View  >
      {/* <Text>Exchange</Text> */}
      {!!coord ?  (<MapView
      style={styles.map}
      initialRegion={{
      latitude: coord.latitude,
      longitude: coord.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}
  >
  <Marker
      coordinate={{
        latitude: coord.latitude,
        longitude: coord.longitude,
      }}
      title={'Vitali'}
      description={'You are here'}
    />
  </MapView>) : <LoadingView />}
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
