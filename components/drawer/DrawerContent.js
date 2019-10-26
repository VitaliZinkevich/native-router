import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { green } from 'ansi-colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  text: {
    fontSize: 24
  },
  button: {
    alignSelf: 'stretch',
  }
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  render() {
    return (
    

      <GestureRecognizer
      onSwipe={()=>{console.log ('swipe')}}
      onSwipeLeft={()=> {Actions.drawerClose()}}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      }}
      style={{
        flex: 1,
      }}
>       
        <View style={styles.container}>
          
          {/* <Button onPress={Actions.closeDrawer}>Back</Button> */}
          <TouchableOpacity style={styles.button} onPress={Actions.calculator}><Text style={styles.text}>Calculator</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Actions.converter}><Text style={styles.text}>Converter</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Actions.history}><Text style={styles.text}>History</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Actions.drawerClose}><Text style={styles.text}>Close</Text></TouchableOpacity>
          {/* <Button onPress={Actions.tab_1}>Switch to tab1</Button>
          <Button onPress={Actions.tab_2}>Switch to tab2</Button>
          <Button onPress={Actions.tab_3}>Switch to tab3</Button>
          <Button onPress={Actions.tab_4_1}>Switch to tab4</Button> */}
          {/* <Button
            onPress={() => {
              Actions.___tab_5({ data: 'test!' });
            }}
          >
            Switch to tab5 with data
          </Button> */}
          {/* <Button onPress={Actions.echo}>Push Clone Scene (EchoView)</Button>
          <Button onPress={Actions.launch}>Reset back to launch</Button> */}
          
        </View>
      </GestureRecognizer>
    
    );
  }
}

export default DrawerContent;
