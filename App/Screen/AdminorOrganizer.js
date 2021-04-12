import React, { Component, useEffect, useState } from 'react';
import { View, Image,BackHandler, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView, } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Colors from '../Component/Colors';
import FontSizes from '../Component/FontSizes';
import AntDesign from "react-native-vector-icons/AntDesign";
import { fetchUser } from "../Services/CommonService";
import firestore from "@react-native-firebase/firestore";
import Fonts from '../Component/FontFamily';
const AdminorOrganizer=(props)=>{
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
  
    return(
        <View>
            <Image style={styles.image}  source={require('../Component/images/bg.jpeg')} resizeMode={'stretch'} />
            <View style={styles.viewDesign} >
            <View onTouchStart={()=>props.navigation.navigate('adminsignin')} style={styles.buttonDesign} >
                <Text style={styles.textDesign}>Admin</Text>
            </View>
            <Text></Text>
            <View onTouchStart={()=>props.navigation.navigate('OrganizerLogin')} style={styles.buttonDesign}>
                <Text style={styles.textDesign} >Organizer</Text>
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    image:{
        width:responsiveWidth(100),
        height:responsiveHeight(100),
        opacity:0.4,
        position:'absolute'
    },
    buttonDesign:{
        width:'100%',
        backgroundColor:Colors.green,
        borderRadius:40,
        height:responsiveHeight(7),
        marginTop:responsiveHeight(5)
    },
    viewDesign:{
        width:responsiveWidth(80),
        height:responsiveHeight(50),
        alignSelf:'center',
        margin:responsiveWidth(50)
    },
    textDesign:{
        fontSize:FontSizes.buttonText,
        alignSelf:'center',
        padding:responsiveHeight(2),
        color:Colors.white,
        fontFamily:Fonts.bold,
    },
})
export default AdminorOrganizer