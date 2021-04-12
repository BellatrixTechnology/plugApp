import React, { Component, useEffect, useState } from 'react';
import { View, Image, ToastAndroid,FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView, } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Fonts from '../Component/FontFamily';
import Colors from "../Component/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import { Button ,TextInput} from "react-native-paper";
import { storeUser ,emailValidation } from "../Services/CommonService";
import FontSizes from '../Component/FontSizes';
const theme = {
    colors: { primary: Colors.green }
}
const SignIn=(props)=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const OrganizerSignIn=async()=>{
        if(emailValidation(email)===0){ToastAndroid.show("Invalid email format",3000);return;}
        if(password.length<6){ToastAndroid.show("Password Length Invalid",3000);return;}
        await firestore().collection('Users')
        .where('Email','==', email.toLowerCase())
        .where('Password','==',password.toLowerCase())
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                if(doc.data())
                {
                    // alert(JSON.stringify(doc.data()))
                    // alert(doc.data().Name)
                    if(doc.data().Role==="Organizer")
                    {
                        storeUser(doc.data().id)
                        ToastAndroid.show("Welcome : "+doc.data().Name,3000)
                        props.navigation.navigate('OrganizerHome')
                    }
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);

        });
    
    }
    return(
        <View style={{backgroundColor:'#fff',flex:1}}>
            <Image style={{height:responsiveHeight(30),resizeMode:'contain',alignSelf:'center',width:responsiveWidth(45)}} source={require('../Component/images/logo.jpeg')} />
            <View style={{width:responsiveWidth(80),alignSelf:'center'}}>
             <Text style={{fontSize:responsiveFontSize(3),fontWeight:'bold',color:Colors.green}}>Sign in to your account </Text>
             <TextInput
                style={{margin:10}}
                onChangeText={setEmail}
                theme={theme}
                mode='outlined'
                label='Email'
                value={email}
            />
            {/* <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green}}>Password</Text> */}
             <TextInput
                style={{margin:10}}
                onChangeText={setPassword}
                theme={theme}
                mode='outlined'
                label='Password'
                secureTextEntry={true}
                value={password}
            />
            <Text></Text>
            <Button mode='contained' onPress={()=>OrganizerSignIn()}   style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center'}}><Text style={{fontSize:FontSizes.buttonText}} >Sign in</Text></Button>
            <Text style={{alignSelf:'center',margin:20,fontSize:responsiveFontSize(2),color:'gray'}}>Or continue with</Text>

            <Image style={{height:responsiveHeight(10),resizeMode:'contain',alignSelf:'center',width:responsiveWidth(45)}} source={require('../Component/images/google.png')} />

            </View>
        </View>
    )
}
export default SignIn
