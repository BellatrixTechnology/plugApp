import React, { Component, useEffect, useState } from 'react';
import { View,Modal, Image, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput ,ScrollView,ToastAndroid } from 'react-native';
import {Button} from "react-native-paper";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from '../Component/Colors';
import FontSizes from "../Component/FontSizes";
import Fonts from "../Component/FontFamily";
import firestore from "@react-native-firebase/firestore";
import { tstamp,fetchUser,emailValidation } from "../Services/CommonService";
const AddOrganizer=(props)=>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [modal,setModal] = useState(false)
    const { ids } =  props.route.params?props.route.params:""
    // console.log(ids)
    const updOrg=async()=>{
        if(emailValidation(email)===0){ToastAndroid.show("Invalid email format",3000);return;}
        if(password.length<6){ToastAndroid.show("Password Length Invalid",3000);return;}
        if(name===""){ToastAndroid.show("Enter name",3000);return;}
        if(email===""){ToastAndroid.show("Enter email",3000);return;}
        if(password===""){ToastAndroid.show("Enter password",3000);return;}
        if(password.length<6){ToastAndroid.show("Password should be six character long",3000);return;}
        await firestore().collection("Users").doc(ids).update(
            {
                Name:name,
                Email:email,
                Password:password,
            }
        )
        .then(ToastAndroid.show("Updated successfully",3000))
        .then(props.navigation.navigate("tab"))
    }
    const deleteOrganizer=async()=>{
        const snapshot = await firestore().collection('Users').doc(ids)
        .delete()
        .then(ToastAndroid.show("Organizer deleted",3000))
        .then(props.navigation.navigate("tab"))
        
    }
    const selectedOrganizer=async()=>{
        if(ids!==""||ids!==null){
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
        }
    }
    useEffect(()=>{
        if(ids!==""||ids!==null)
        {
            selectedOrganizer()
        }
        else
        return;
    },[])
    const addOrg=async()=>{
        if(emailValidation(email)===0){ToastAndroid.show("Invalid email format",3000);return;}
        if(password.length<6){ToastAndroid.show("Password Length Invalid",3000);return;}
        if(name===""){ToastAndroid.show("Enter name",3000);return;}
        if(email===""){ToastAndroid.show("Enter email",3000);return;}
        if(password===""){ToastAndroid.show("Enter password",3000);return;}
        if(password.length<6){ToastAndroid.show("Password should be six character long",3000);return;}
        let id = "id-" + tstamp();
        await firestore().collection("Users").doc(id).set(
            {
                Name:name,
                Email:email.toLowerCase(),
                Password:password,
                BelongsTo:await fetchUser(),
                id:id,
                Role:"Organizer",
                Img:""
            }
        )
        .then(ToastAndroid.show("Organizer added successfully",3000))
        .then(props.navigation.navigate("tab"))
    }
    return(
        <View>
            <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
      >
          <View style={{position:'absolute',backgroundColor:'white',zIndex:1,height:'100%',width:'100%'}}>
          <View style={{position:'absolute',alignItems:'center',backgroundColor:Colors.white,borderColor:Colors.green,borderWidth:0.3,top:responsiveHeight(35),left:responsiveWidth(25),height:responsiveHeight(20),width:responsiveWidth(50),borderRadius:10}} >
              <Text style={{fontSize:FontSizes.paragraph,margin:'5%',marginLeft:0,marginRight:0}}>Are you sure you want to delete organizer?</Text>
              <MaterialCommunityIcons name='delete' size={30} color={"red"} />
              <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
              <Button color={"red"} style={{flex:0.5}}  onPress={()=>setModal(false)} >No</Button>  
              <Button color={"green"} style={{flex:0.5}} onPress={()=>deleteOrganizer()} >Yes</Button>  
              </View> 
          </View>
          </View>
      </Modal>
             <View style={{width:50}}>
             <Ionicons name='chevron-back-outline' size={40} style={{margin:10,marginLeft:15,opacity:0.6}}  color={Colors.text} onPress={()=>props.navigation.goBack()}/>
             </View>
             {ids?<Text style={{position:'absolute',top:responsiveHeight(2.5),alignSelf:'center',fontSize:FontSizes.heading,fontFamily:Fonts.regular}}>Edit Organizer</Text>:<Text style={{position:'absolute',top:responsiveHeight(2.5),alignSelf:'center',fontSize:FontSizes.heading,fontFamily:Fonts.regular}}>Add Organizer</Text>}
             <View style={{width:responsiveWidth(90),alignSelf:'center'}}>
             {/* <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:responsiveWidth(5)}}>Name</Text> */}
             <Text style={[styles.mainText,{marginTop:30}]}>Organizer Name</Text>
             <TextInput
                style={{marginTop:responsiveHeight(1)}}
                onChangeText={setName}
                underlineColorAndroid={Colors.text}
                value={name}
                placeholder="Name"
            />
            <Text></Text>
            <Text style={styles.mainText}>Organizer Email</Text>
             <TextInput
                style={{marginTop:responsiveHeight(1)}}
                onChangeText={setEmail}
                underlineColorAndroid={Colors.text}
                value={email}
                placeholder="Email"
            />
            <Text></Text>
            {/* <Text style={{fontSize:responsiveFontSize(2.6),marginTop:responsiveHeight(3),fontWeight:'bold',color:Colors.green,marginLeft:responsiveWidth(5)}}>Password</Text> */}
            <Text style={styles.mainText}>Password</Text>
             <TextInput
                style={{marginTop:responsiveHeight(1)}}
                onChangeText={setPassword}
                underlineColorAndroid={Colors.text}
                value={password}
                placeholder="Password"
            />
            {/* <Button mode='contained' onPress={()=>addOrg()}  style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginTop:responsiveHeight(5),alignSelf:'center'}}>Save</Button> */}
            {ids?<View style={[styles.button,{marginVertical:responsiveHeight(20)}]}><Button color={Colors.white} onPress={()=>updOrg()} >Update</Button></View>:<Button mode='contained' onPress={()=>addOrg()} style={[styles.button,{marginVertical:responsiveHeight(30)}]}>Add</Button>}
            {ids?<View style={[styles.button,{marginVertical:responsiveHeight(-17),backgroundColor:'red'}]}><Button color={Colors.white} onPress={()=>setModal(true)} >Delete</Button></View>:<Text></Text>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainText:{fontSize:FontSizes.heading,fontFamily:Fonts.regular,color:Colors.text},
    button:{
        borderRadius:5,height:responsiveHeight(8.5),backgroundColor:Colors.green,width:'100%',padding:10,marginVertical:responsiveHeight(30)
    },
})
export default AddOrganizer