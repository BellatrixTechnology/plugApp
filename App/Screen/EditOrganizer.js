import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput ,ScrollView,ToastAndroid } from 'react-native';
import {Button} from "react-native-paper";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from '../Component/Colors';
import firestore from "@react-native-firebase/firestore";
import { tstamp,fetchUser,emailValidation } from "../Services/CommonService";
const AddOrganizer=(props)=>{
    const { ids } = props.route.params
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const deleteOrganizer=async()=>{
        const snapshot = await firestore().collection('Users').doc(ids)
        .delete()
        .then(ToastAndroid.show("Organizer deleted",3000))
        .then(props.navigation.navigate("tab"))
        
    }
    const selectedOrganizer=async()=>{
        // alert(ids)
        const snapshot = await firestore().collection('Users').doc(ids)
        .get()
        .then(r=>
            {
                // console.log(r.data())}
                setName(r.data().Name)
                setEmail(r.data().Email)
                setPassword(r.data().Password)
            }
        )
        // console.log(await fetchUser())
    }
    useEffect(()=> selectedOrganizer(),[])
    const addOrg=async()=>{
        if(emailValidation(email)===0){ToastAndroid.show("Invalid email format",3000);return;}
        if(password.length<6){ToastAndroid.show("Password Length Invalid",3000);return;}
        if(name===""){ToastAndroid.show("Enter name",3000);return;}
        if(email===""){ToastAndroid.show("Enter email",3000);return;}
        if(password===""){ToastAndroid.show("Enter password",3000);return;}
        if(password.length<6){ToastAndroid.show("Password should be six character long",3000);return;}
        await firestore().collection("Users").doc(ids).set(
            {
                Name:name,
                Email:email,
                Password:password,
                BelongsTo:await fetchUser(),
                id:ids,
                Role:"Organizer"
            }
        )
        .then(ToastAndroid.show("Updated successfully",3000))
        .then(props.navigation.navigate("tab"))
    }
    return(
        <View>
             <Ionicons name='arrow-back-sharp' size={40} style={{margin:10,}}  color={Colors.green} onPress={()=>props.navigation.goBack()}/>
             <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
             <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:responsiveWidth(5)}}>Name</Text>
             <TextInput
                style={{marginLeft:responsiveWidth(5)}}
                onChangeText={setName}
                underlineColorAndroid={Colors.green}
                value={name}
                placeholder="  Name of Organizer"
            />
            <Text style={{fontSize:responsiveFontSize(2.6),marginTop:responsiveHeight(3),fontWeight:'bold',color:Colors.green,marginLeft:responsiveWidth(5)}}>Email</Text>
             <TextInput
                style={{marginLeft:responsiveWidth(5)}}
                onChangeText={setEmail}
                underlineColorAndroid={Colors.green}
                value={email}
                placeholder="  Email...."
            />
            <Text style={{fontSize:responsiveFontSize(2.6),marginTop:responsiveHeight(3),fontWeight:'bold',color:Colors.green,marginLeft:responsiveWidth(5)}}>Password</Text>
             <TextInput
                style={{marginLeft:responsiveWidth(5)}}
                onChangeText={setPassword}
                underlineColorAndroid={Colors.green}
                value={password}
                placeholder="  Password"
            />
            <Button mode='contained' onPress={()=>addOrg()}  style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginTop:responsiveHeight(5),alignSelf:'center'}}>update</Button>
            <Text></Text>
            <Button mode='contained' onPress={()=>deleteOrganizer()}  style={{borderRadius:10,backgroundColor:'red',width:'90%',marginTop:responsiveHeight(5),alignSelf:'center'}}>delete</Button>
            </View>
        </View>
    )
}
export default AddOrganizer