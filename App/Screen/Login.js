import React, { Component, useEffect, useState } from 'react';
import { View, Image,Modal,BackHandler, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, ScrollView,ToastAndroid } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Fonts from '../Component/FontFamily';
import {Button,Divider} from "react-native-paper";
import Colors from "../Component/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import firestore from "@react-native-firebase/firestore";
import { fetchUser,storeUser,emailValidation } from "../Services/CommonService";
import QRCode from 'react-native-qrcode-svg';
import FontSizes from '../Component/FontSizes';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
    webClientId: '524884629974-0p6m0ehhgs2ng9kc40eo4mqdmpc5i169.apps.googleusercontent.com',
  });
const Login=(props)=>{
    const checkEmail=async(eml,photoUrl)=>{
     
        await firestore().collection('Users')
        .where('Email','==', eml.toLowerCase())
        .get()
        .then(function(querySnapshot) {
           
            if(querySnapshot.empty){ToastAndroid.show("Your are not registered!",3000)
             GoogleSignin.signOut()
            return;}
            querySnapshot.forEach(function(doc) {
                if(doc.data())
                {
                    console.log(photoUrl)
                    // alert(doc.data().id)
                    firestore().collection("Users").doc(doc.data().id).update(
                        {
                            Img:photoUrl,
                        })
                    if(doc.data().Role==="Organizer")
                    {
                        storeUser(doc.data().id)
                        ToastAndroid.show("Welcome : "+doc.data().Name,3000)
                        props.navigation.navigate('OrganizerHome')
                    }
                    else if(doc.data().Role==="Admin")
                    {
                        storeUser(doc.id)
                        ToastAndroid.show("Welcome : "+doc.data().Name,3000)
                        props.navigation.navigate('tab')
                    }
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    async function onGoogleButtonPress() {
        // Get the users ID token
        try {
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
            alert("error")
    }
      }
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const OrganizerSignIn=async()=>{
       
        if(emailValidation(email)===0){ToastAndroid.show("Invalid email format",3000);return;}
        if(password.length<6){ToastAndroid.show("Password Length Invalid",3000);return;}
        await firestore().collection('Users')
        .where('Email','==', email.toLowerCase())
        .where('Password','==',password)
        .get()
        .then(function(querySnapshot) {
            if(querySnapshot.empty){ToastAndroid.show("Invalid login credentials",3000);return;}
            querySnapshot.forEach(function(doc) {
                if(doc.data())
                {
                    if(doc.data().Role==="Organizer")
                    {
                        storeUser(doc.data().id)
                        ToastAndroid.show("Welcome : "+doc.data().Name,3000)
                        props.navigation.navigate('OrganizerHome')
                    }
                    else if(doc.data().Role==="Admin")
                    {
                        storeUser(doc.id)
                        ToastAndroid.show("Welcome : "+doc.data().Name,3000)
                        props.navigation.navigate('tab')
                    }
                    setEmail("") 
                    setPassword("")
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
  
    return(
        <View style={styles.container}>
            {/* <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.black} onPress={()=>props.navigation.goBack()}/> */}
            <View style={styles.insideContainer}>
                <Text style={{fontSize:FontSizes.heading+10,fontFamily:Fonts.bold}}>Welcome Back</Text>
                <Text>{"\n\n"}</Text>
                <TextInput
                underlineColorAndroid={"silver"}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                />
                <Text>{"\n"}</Text>
                <TextInput
                underlineColorAndroid={"silver"}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                />
                <Text>{"\n"}</Text>
                <View style={{alignSelf:'center',width:responsiveWidth(90),flexDirection:'row'}}>
                <Text style={{flex:0.9,fontSize:FontSizes.heading-2,textAlignVertical:'center',fontFamily:Fonts.regular}}>Forgot Password?</Text>
                <Button mode='contained' onPress={()=>OrganizerSignIn()}  style={{borderRadius:20,backgroundColor:Colors.green,flex:0.1}}><Entypo name="arrow-long-right" size={20} /></Button>
                {/* <AntDesign name="rightcircleo" size={20}/> */}
                </View>
                <Text>{"\n"}</Text>
                <View style={{alignSelf:'center',width:responsiveWidth(90),flexDirection:'row'}}>
                <Text style={{flex:0.1,fontSize:FontSizes.heading,fontFamily:Fonts.bold}}>OR</Text>
                <View style={{flex:0.9,backgroundColor:'silver',height:2,margin:11}}></View>
                </View>
                <Text>{"\n"}</Text>
                <AntDesign color={Colors.black} onPress={() => onGoogleButtonPress().then((s) => checkEmail(s.additionalUserInfo.profile.email,s.additionalUserInfo.profile.picture))} name="google" size={50}/>
                {/* <AntDesign color={Colors.black} onPress={() => onGoogleButtonPress().then(t=>console.log(t))} name="google" size={50}/> */}
                {/* <Button onPress={()=>{
                    auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                }} >logout</Button> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    },
    insideContainer:{
        marginTop:responsiveHeight(18),
        width:responsiveWidth(90),
        alignSelf:'center'
    }
})
export default Login