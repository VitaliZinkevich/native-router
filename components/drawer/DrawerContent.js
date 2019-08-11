import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    // borderColor: 'skyblue',
  },
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
      <View style={styles.container}>
        {/* <Button onPress={Actions.closeDrawer}>Back</Button> */}
        <TouchableOpacity onPress={Actions.calculator}><Text>Calculator</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.converter}><Text>Converter</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.history}><Text>History</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.drawerClose}><Text>Close</Text></TouchableOpacity>
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
    );
  }
}

export default DrawerContent;
