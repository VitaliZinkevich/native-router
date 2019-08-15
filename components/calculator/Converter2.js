import React, {useContext} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Picker
} from 'react-native';

import converterStore from './mobx/converterStore'
import { observer } from "mobx-react"
 
const EmployeeDetails =observer  (() => {

    let {values, rates, onValueChange, onTextCange} = useContext(converterStore);
    // formik

    let 

    return (
    <View style={styles.employee}>
        
        <Picker
            selectedValue={"java"}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>{
                }
            }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
        </Picker>
       
        <Text style={styles.name}>
                { JSON.stringify(rates)}
        </Text>
    </View>
)});
 
// EmployeeDetails.propTypes = {
//     ...View.propTypes,
//     employee: PropTypes.object.isRequired
// };
 
const styles = StyleSheet.create({
    employee: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 40,
        padding: 5,
        backgroundColor: '#FFFFFF'
    },
    cover: {
        flex: 1,
        height: 150,
        marginTop: 40,
        resizeMode: 'contain'
    },
    info: {
        flex: 3,
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },
    name: {
        alignSelf: 'center',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    },
    fontBold: {
        fontWeight: '700'
    }
});
 
export default EmployeeDetails;