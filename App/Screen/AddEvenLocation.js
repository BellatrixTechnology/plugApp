import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList,ToastAndroid, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput ,ScrollView, KeyboardAvoidingView, } from 'react-native';
import {Button} from "react-native-paper";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from '../Component/Colors';
const AddEvenLocation=(props)=>{
    const [location,setLocation] = useState("")
    function ValidityofInput() {
        if(location==="")
        {
            ToastAndroid.show("Enter Location",3000)
            return;
        }
        props.navigation.navigate('AddEventSettings')
    }
    return(
        <View>
            <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.green} onPress={()=>props.navigation.goBack()}/>
            <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
            <Ionicons name='location'  size={150} style={{margin:50,alignSelf:'center'}} color={Colors.green}/>
            <Text style={{fontSize:responsiveFontSize(2.6),alignSelf:'center',fontWeight:'bold',color:Colors.green}}>Enter Your Location</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setLocation}
                underlineColorAndroid={Colors.green}
                value={location}
                placeholder="  Event Location...."
            />
            {/* <Button mode='contained' style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center',margin:responsiveHeight(5)}} onPress={()=>pickDocument()}>Enable Location</Button> */}
            <Button mode='contained' onPress={()=>ValidityofInput()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginVertical:responsiveHeight(26),alignSelf:'center'}}>Continue</Button>
            </View>
        </View>
    )
}
export default AddEvenLocation