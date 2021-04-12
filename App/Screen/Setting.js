import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, Button, } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Fonts from '../Component/FontFamily';
import Colors from "../Component/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from "react-native-vector-icons/Ionicons";
const Setting=(props)=>{
    return (
        <View style={styles.container}>
        <View style={{height:responsiveHeight(5),width:responsiveWidth(30),margin:20}}>
            <Text style={{color:Colors.green,fontSize:responsiveFontSize(2.6),fontFamily:Fonts.primaryText,fontWeight:'bold'}}>Settings.</Text>
        </View>
        <View style={{alignSelf:'center',width:responsiveWidth(95),height:responsiveHeight(40)}} >
           <View style={{padding:20,flex:1,flexDirection:'row'}}>
               <AntDesign style={{flex:0.12}} name='setting' size={30} color={Colors.green} />
               <Text style={{flex:0.88,fontSize:responsiveFontSize(2.2),fontWeight:'bold'}} >Profile Setting</Text>
               <AntDesign style={{flex:0.09}} name='right' size={30} color={Colors.green} />
            </View>
            <View style={{padding:20,flex:1,flexDirection:'row'}}>
               <Ionicons style={{flex:0.12}} name='cash-outline' size={30} color={Colors.green} />
               <Text style={{flex:0.88,fontSize:responsiveFontSize(2.2),fontWeight:'bold'}} >Earnings</Text>
               <AntDesign style={{flex:0.09}} name='right' size={30} color={Colors.green} />
            </View>
            <View style={{padding:20,flex:1,flexDirection:'row'}}>
               <Ionicons style={{flex:0.12}} name='close-circle-outline' size={30} color={Colors.green} />
               <Text style={{flex:0.88,fontSize:responsiveFontSize(2.2),fontWeight:'bold'}} >Cancellation Policy</Text>
               <AntDesign style={{flex:0.09}} name='right' size={30} color={Colors.green} />
            </View>
            <View style={{padding:20,flex:1,flexDirection:'row'}}>
               <Ionicons style={{flex:0.12}} name='log-in-outline' size={30} color={Colors.green} />
               <Text style={{flex:0.88,fontSize:responsiveFontSize(2.2),fontWeight:'bold'}} >Logout</Text>
               <AntDesign style={{flex:0.09}} name='right' size={30} color={Colors.green} />
            </View>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})
export default Setting