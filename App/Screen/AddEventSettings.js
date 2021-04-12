import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList,ToastAndroid, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput ,ScrollView, } from 'react-native';
import {Button} from "react-native-paper";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from '../Component/Colors';

const AddEventSettings=(props)=>{
    const [type,setType] = useState("")
    const [guests,setGuests] = useState(0)
    const [fee,setFee] = useState(0)
    function ValidityofInput() {
        if(type==="")
        {
            ToastAndroid.show("Enter Type",3000)
            return;
        }
        if(guests===0)
        {
            ToastAndroid.show("Enter Guest(s)",3000)
            return;
        }
        if(fee===0)
        {
            ToastAndroid.show("Enter Fee",3000)
            return;
        }
        props.navigation.navigate('tab')

    }
    return(
        <View>
            <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.green} onPress={()=>props.navigation.goBack()}/>
            <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Type of Event</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setType}
                underlineColorAndroid={Colors.green}
                value={type}
                placeholder="  Type Here...."
            />
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Number of expected guests</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setGuests}
                underlineColorAndroid={Colors.green}
                value={guests}
                placeholder=" 0"
                keyboardType={'numeric'}
            />
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Events Fee</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setFee}
                underlineColorAndroid={Colors.green}
                value={fee}
                placeholder=" 0"
                keyboardType={'numeric'}

            />
            <Button mode='contained' onPress={()=>ValidityofInput()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginVertical:responsiveHeight(29),alignSelf:'center'}}>Continue</Button>
            </View>
        </View>
    )
}
export default AddEventSettings