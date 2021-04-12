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
import DocumentPicker from 'react-native-document-picker';
import firestore from "@react-native-firebase/firestore";
import RNFS from "react-native-fs";
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import Swiper from 'react-native-swiper'
import { tstamp,fetchUser } from "../Services/CommonService";
const EditEvent=(props)=>{
    const tstmp = tstamp()
    const [eventname,setEventName] = useState("")
    const [img,setImg] = useState("")
    const [imagedata,setImageData] = useState("")
    const [location,setLocation] = useState("")
    const [type,setType] = useState("")
    const [guests,setGuests] = useState(0)
    const [fee,setFee] = useState(0)
    const [sw,setSw] = useState(1)
    const [path,setPath ] =useState("")
    const { ids } = props.route.params
    const deleteEvent=async()=>{
        await storage().ref('Images/'+img.split('Images%2F')[1].split('?')[0]).delete()
        const snapshot = await firestore().collection('Events').doc(ids)
        .delete()
        .then(ToastAndroid.show("Event deleted",3000))
        .then(props.navigation.navigate("tab"))
    }
    const selectedEvent=async()=>{
        // alert(ids)
        const snapshot = await firestore().collection('Events').doc(ids)
        .get()
        .then(r=>
            {
                // console.log(r.data())}
                setEventName(r.data().name)
                setImg(r.data().image)
                setLocation(r.data().address)
                setType(r.data().type)
                setGuests(r.data().guests)
                setFee(r.data().fee)
                setPath(r.data().BucketPath)
                // setPassword(r.data().Password)
            }
        )
        // console.log(await fetchUser())
    }
    useEffect(()=> selectedEvent(),[])
    const getImage = async() => {
        // await storage().ref(path).delete()
        // return;
        let imageRef = storage().ref('/Images/' + tstmp);
        imageRef
            .getDownloadURL()
            .then((url) => setImageData(url))
        }
    const addImage=async()=>{
        var url = await RNFetchBlob.fs.stat(img)
        try {
            await storage().ref('Images/'+tstmp).putFile(url.path)
            .then(() => {
                getImage()
            }).catch((e) => console.log('uploading image error => ', e));
        } catch (error) {
            console.log(error)
        }

    }
    function ValidityofInput1() {
        if(eventname==="")
        {
            // alert("Enter event name")
            ToastAndroid.show("Enter Event name",3000)
            return;
        }
        if(img==="")
        {
            // alert("Select image")
            ToastAndroid.show("Select image",3000)
            return;
        }
        addImage()
        sw.scrollBy(1,true)
        // props.navigation.navigate('AddEvenLocation')
    }
    function ValidityofInput2() {
        if(location==="")
        {
            ToastAndroid.show("Enter Location",3000)
            return;
        }
        sw.scrollBy(1,true)
        // props.navigation.navigate('AddEventSettings')
    }
    const ValidityofInput3=async()=> {
        if(imagedata===""){ToastAndroid.show("Image is still uploading...",3000); return;}
        if(type==="")
        {
            ToastAndroid.show("Enter Type",3000)
            return;
        }
        if(guests===0)
        {
            ToastAndroid.show("Enter Guest(s)",3000)
            return;
        }
        if(fee===0)
        {
            ToastAndroid.show("Enter Fee",3000)
            return;
        }
        // let id = "id-" + tstamp();
        await firestore().collection("Events").doc(ids).set(
            {
                name:eventname,
                image:imagedata?imagedata:img,
                address:location,
                type:type,
                fee:fee,
                guests:guests,
                id:ids,
                BucketPath:'Images/'+tstmp,
                author:await fetchUser()
            }
        )
        .then(ToastAndroid.show("Event updated successfully",3000))
        .then(props.navigation.navigate("tab"))

    }
    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setImg(res.uri)
            // setImages(res.uri)
            // console.log(res.type)
            // const contents = await RNFS.readFile(res.uri, 'base64')
            // console.log(`data:${res.type};base64,` + contents)
            // setImageData(`data:${res.type};base64,` + contents)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {

            } else {
                throw err;
            }
        }
    }
    return(
        <Swiper style={styles.wrapper} showsPagination={false} loop={false} scrollEnabled={false} ref={(swiper) => {setSw(swiper)}} >
        <View>
             <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.green} onPress={()=>props.navigation.goBack()}/>
             <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
             <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green}}>Name of Event</Text>
             <TextInput
                style={{margin:20}}
                onChangeText={setEventName}
                underlineColorAndroid={Colors.green}
                value={eventname}
                placeholder="  Type Here...."
            />
            <Button mode='contained'   style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center'}} onPress={()=>pickDocument()}>Browse Album</Button>

            {img!=="" && <Image style={{height:200,width:200,alignSelf:'center',resizeMode:'cover',margin:responsiveHeight(10),borderWidth:1,borderRadius:20,borderColor:Colors.green}}  source={{uri:img?img:imagedata}} />}
            <Button mode='contained' onPress={()=>ValidityofInput1()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginVertical:responsiveHeight(10),alignSelf:'center'}}>Continue</Button>
            </View>
        </View>
         

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
            <Button mode='contained' onPress={()=>ValidityofInput2()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginVertical:responsiveHeight(26),alignSelf:'center'}}>Continue</Button>
            </View>
        </View>

        <View>
            <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.green} onPress={()=>props.navigation.goBack()}/>
            <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Type of Event</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setType}
                underlineColorAndroid={Colors.green}
                value={type}
                placeholder="  Type Here...."
            />
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Number of expected guests</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setGuests}
                underlineColorAndroid={Colors.green}
                value={guests}
                placeholder=" 0"
                keyboardType={'numeric'}
            />
            <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green,marginLeft:10}}>Events Fee</Text>
            <TextInput
                style={{margin:20}}
                onChangeText={setFee}
                underlineColorAndroid={Colors.green}
                value={fee}
                placeholder=" 0"
                keyboardType={'numeric'}

            />
            <Button mode='contained' onPress={()=>ValidityofInput3()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center',marginTop:responsiveHeight(22)}}>Update</Button>
            <Text></Text>
            <Button mode='contained'  style={{borderRadius:10,backgroundColor:'red',width:'90%',alignSelf:'center'}} onPress={()=>deleteEvent()} >Delete</Button>

            </View>
        </View>


      </Swiper> 

        // <View>
        //     <Ionicons name='arrow-back-sharp' size={40} style={{margin:10}} color={Colors.green} onPress={()=>props.navigation.goBack()}/>
        //     <View style={{width:responsiveWidth(95),alignSelf:'center'}}>
        //     <Text style={{fontSize:responsiveFontSize(2.6),fontWeight:'bold',color:Colors.green}}>Name of Event</Text>
        //     <TextInput
        //         style={{margin:20}}
        //         onChangeText={setEventName}
        //         underlineColorAndroid={Colors.green}
        //         value={eventname}
        //         placeholder="  Type Here...."
        //     />
        //     <Button mode='contained' style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center'}} onPress={()=>pickDocument()}>Browse Album</Button>

        //     {img!=="" && <Image style={{height:200,width:200,alignSelf:'center',resizeMode:'cover',margin:responsiveHeight(10),borderWidth:1,borderRadius:20,borderColor:Colors.green}}  source={{uri:img}} />}
        //     <Button mode='contained' onPress={()=>ValidityofInput()} style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',marginVertical:responsiveHeight(10),alignSelf:'center'}}>Continue</Button>
        //     </View>
        // </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })
export default EditEvent