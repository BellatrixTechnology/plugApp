import React, { Component, useEffect, useState } from 'react';
import { View, Image,ToastAndroid } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { fetchUser ,storeUser} from "../Services/CommonService";
import firestore from "@react-native-firebase/firestore";
import Colors from '../Component/Colors';
const SplashScreen=(props)=>{
    const _redirect=async()=>{
        const user = await fetchUser()
        if(user&&user!==null)
        {
            await firestore().collection("Users").doc(user).get()
            .then(r=>{
                    if(r.data().Role==="Admin")
                        {
                            ToastAndroid.show("Welcome : "+r.data().Name,3000)
                            props.navigation.navigate('tab')
                        }
                    else if(r.data().Role==="Organizer")
                        {
                            ToastAndroid.show("Welcome : "+r.data().Name,3000)
                            props.navigation.navigate('OrganizerHome')
                        }
                }
                )
            // alert("User available")
        }
        else
            props.navigation.navigate('Login')
    }
    useEffect(()=>{
        setTimeout(() => {
            _redirect()
        }, 3000);
    },[])
    return(
        <View>
            <Image style={{position:'absolute',height:responsiveHeight(100),width:responsiveWidth(100)}} resizeMode={'cover'} source={require('../Component/images/bg.jpeg')} />
            {/* <Text style={{color:Colors.white,fontSize:responsiveFontSize(4),position:'absolute',top:responsiveHeight(50),borderRadius:10,borderWidth:0.001,alignSelf:'center',backgroundColor:Colors.green}} >Loading...</Text> */}
        </View>
    )
}
export default SplashScreen