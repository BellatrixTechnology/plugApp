import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, Button, } from 'react-native';
import Colors from '../Component/Colors'
import Fonts from '../Component/FontFamily';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/AntDesign'

const HomeScreen=(props)=> {
    return (
    <View style={styles.container}>
        <View style={{height:responsiveHeight(4),width:responsiveWidth(15),margin:20}}>
            <Text style={{color:Colors.green,fontSize:responsiveFontSize(2.6),fontFamily:Fonts.primaryText,fontWeight:'bold'}}>PLUG.</Text>
        </View>
        <View style={{alignSelf:'center',marginVertical:responsiveHeight(30)}}>
            <Text style={{color:Colors.green}}>You haven't organized any event yet .</Text>
            <Text style={{alignSelf:'center',color:Colors.green}}>Organize it now.{"\n"}</Text>
            <AntDesign style={{alignSelf:'center'}} name='pluscircle' size={50} color={Colors.green} />
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})
export default HomeScreen