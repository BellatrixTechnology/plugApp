import React, { Component, useEffect, useState } from 'react';
import { View, Image,Modal, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView,ToastAndroid } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Colors from '../Component/Colors';
import { Button } from "react-native-paper";
import auth, { firebase } from '@react-native-firebase/auth';
import FontSizes from '../Component/FontSizes';
import AntDesign from "react-native-vector-icons/AntDesign";
import { fetchUser,storeUser } from "../Services/CommonService";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
GoogleSignin.configure({
    webClientId: '895715110197-mt19l2arm7t7gmmj6bjfue95nkmu05ik.apps.googleusercontent.com',
  });
const OrganizerHome=(props)=>{
    const [modal,setModal] = useState(false)
    const logout = async () => {
        try {
         await GoogleSignin.clearCachedAccessToken((await GoogleSignin.getTokens()).idToken)
         await GoogleSignin.signOut()
         await AsyncStorage.clear()
        // await auth().signOut().then((t)=>console.log(t))
        // await firebase.auth().signOut()
        setModal(false)
        storeUser("")
        ToastAndroid.show('Logout successfully',3000)
        props.navigation.navigate('Login')                
        } catch (error) {
            ToastAndroid.show('Error occured',3000)
        }
    }
    return(
        <View style={[modal?{opacity:0}:styles.container]}>
             <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
      >
          <View style={{position:'absolute',alignItems:'center',backgroundColor:Colors.white,borderColor:Colors.green,borderWidth:0.3,top:responsiveHeight(35),left:responsiveWidth(25),height:responsiveHeight(20),width:responsiveWidth(50),borderRadius:10}} >
              <Text style={{fontSize:FontSizes.paragraph,margin:'10%',marginLeft:0,marginRight:0}}>Do you really want to logout ?</Text>
              <MaterialCommunityIcons name='logout' size={30} color={Colors.black} />
              <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
              <Button color={"red"} onPress={()=>setModal(false)} >No</Button>  
              <Button color={"green"} onPress={()=>logout()} >Yes</Button>  
              </View> 
          </View>
      </Modal>
            <Image style={styles.image}  source={require('../Component/images/bg.jpeg')} resizeMode={'stretch'} />
            <View style={styles.viewDesign} >
            <View onTouchStart={()=>props.navigation.navigate('Scanner')} style={styles.buttonDesign} >
                <Text style={styles.textDesign}>Scan QR</Text>
            </View>
            <View onTouchStart={()=>setModal(true)} style={styles.buttonDesign}>
                <Text style={styles.textDesign} >Logout</Text>
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
        color:Colors.white
    },
})
export default OrganizerHome