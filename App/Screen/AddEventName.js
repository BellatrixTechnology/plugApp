import React, { Component, useEffect, useState } from 'react';
import { View, Image,PermissionsAndroid, FlatList, Text, StyleSheet,Modal, TouchableOpacity, ActivityIndicator, StatusBar, TextInput ,ScrollView,ToastAndroid } from 'react-native';
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
import storage from '@react-native-firebase/storage';
import RNFS from "react-native-fs";
import RNFetchBlob from 'rn-fetch-blob';
import Swiper from 'react-native-swiper'
import { tstamp,fetchUser } from "../Services/CommonService";
import Fonts from '../Component/FontFamily';
import FontSizes from '../Component/FontSizes';
import LocationView from "react-native-location-view";
const AddEventName=(props)=>{ 
    const [eventname,setEventName] = useState("")
    const [img,setImg] = useState([])
    const [imagedata,setImageData] = useState("")
    const [location,setLocation] = useState("")
    const [type,setType] = useState("")
    const [guests,setGuests] = useState(0)
    const [fee,setFee] = useState(0)
    const [sw,setSw] = useState(1)
    const [path,setPath] = useState("")
    const [modal,setModal] = useState(false)
    const tstmp = tstamp()
    // const { ids } = props.route.params?props.route.params:""
    // useEffect(()=>{if(ids!==""||ids!==null){alert(ids)}},[])
    const getImage = async(index) => {
        // alert(index)
        let imageRef = await storage().ref('/Images/' + tstmp+index);
        imageRef
            .getDownloadURL()
            .then((url) => setImageData(imagedata=>imagedata+=(url+'`')))
            // setSelected(selected => selected += (index + ","))
        }
    const addImage=async()=>{
        for (let index = 0; index < img.length; index++) {
            // alert(img[index])
            var url = await RNFetchBlob.fs.stat(img[index])
            try {
                await storage().ref('Images/'+tstmp+index).putFile(url.path)
                .then((k) => {
                    console.log(k)
                    getImage(index)
                    setPath(k.metadata.fullPath)
                }).catch((e) => console.log('uploading image error => ', e));
            } catch (error) {
                console.log(error)
            }          
        }
    }

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setImg([...img, res.uri])

            // setImg(res.uri)
            // setImg(img[ind]=res.uri)
            // setImg([...img, res.uri])
            // console.log(res)
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
    function ValidityofInput1() {
        if(eventname==="")
        {
            // alert("Enter event name")
            ToastAndroid.show("Enter Event name",3000)
            return;
        }
        if(img.length===0)
        {
            // alert("Select image")
            ToastAndroid.show("Select at least one image",3000)
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
        if(imagedata.split('`').length===img.length+1){
        }
        else{
            // alert(imagedata.split('`').length+" and "+img.length);
             ToastAndroid.show("Image is still uploading...",3000); return;}
        // console.log(imagedata)
        // return;
        let id = "id-" + tstamp();
        await firestore().collection("Events").doc(id).set(
            {
                name:eventname,
                image:imagedata,
                address:location,
                type:type,
                fee:fee,
                guests:guests,
                id:id,
                BucketPath:path,
                author:await fetchUser(),
                createdAt: firestore.FieldValue.serverTimestamp()
            }
        )
        .then(ToastAndroid.show("Event added successfully",3000))
        .then(props.navigation.navigate("tab"))

    }
    return(
        <Swiper style={styles.wrapper} showsPagination={false} loop={false} scrollEnabled={false} ref={(swiper) => {setSw(swiper)}} >
        <View>
            <View style={{width:50}}>
             <Ionicons name='chevron-back-outline' size={40} style={{margin:10,opacity:0.6}} color={Colors.text} onPress={()=>props.navigation.goBack()}/>
             </View>
             <View style={{width:responsiveWidth(90),alignSelf:'center'}}>
             <Text style={styles.mainText}>Name of Event</Text>
             <Text style={styles.subText}>Enter the name of the event to continue.</Text>
             <TextInput
                style={{marginTop:30}}      
                onChangeText={setEventName}
                underlineColorAndroid={Colors.text}
                value={eventname}
                placeholder="Name"
            />
            <Text style={{fontSize:FontSizes.heading,fontFamily:Fonts.regular,color:Colors.text,marginTop:30}}>Event Photos</Text>
             <Text style={{marginTop:5,fontSize:FontSizes.paragraph,fontFamily:Fonts.regular,color:Colors.text}}>Select Event Photos, you can select upto 4 photos.</Text>
            <View style={{height:responsiveHeight(10),marginTop:15,flexDirection:'row',justifyContent:'space-evenly'}}>
            {img&&img.map((image,index)=>{ 
                return <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}><Image style={{alignSelf:'center',marginVertical:'25%',height:'100%',width:'100%',resizeMode:'cover',marginVertical:0,borderWidth:0.5,borderRadius:10}} source={{uri:image}} />
                <Button
                color={Colors.green}
                style={{top:-10, right: -15,position:'absolute',}}
                onPress={()=>{
                    const imgs = img.filter(im => im!==img[index])
                    setImg(imgs);
                }}>
                    X
            </Button>
                
                </View>
                // return <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}>{img[index]==="" ? <Ionicons onPress={()=>pickDocument(index)} size={30} color={"gray"} style={{alignSelf:'center',marginVertical:'25%'}} name="camera" />:<Image style={{alignSelf:'center',marginVertical:'25%',height:'100%',width:'100%',resizeMode:'cover',marginVertical:0,borderWidth:0.5,borderRadius:10}} source={{uri:image}} />}</View>
            })}   
               {img&&img.length<4&& <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}><Ionicons onPress={()=>pickDocument()} size={30} color={"gray"} style={{alignSelf:'center',marginVertical:'25%'}} name="camera" /></View>}
                 {/* <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}><Ionicons size={30} color={"gray"} style={{alignSelf:'center',marginVertical:'25%'}} name="camera" /></View>
                 <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}><Ionicons size={30} color={"gray"} style={{alignSelf:'center',marginVertical:'25%'}} name="camera" /></View>
                 <View style={{borderWidth:0.5,borderRadius:10,borderStyle:'dashed',flex:0.20}}><Ionicons size={30} color={"gray"} style={{alignSelf:'center',marginVertical:'25%'}} name="camera" /></View> */}
            
            </View>
            {/* <Button mode='contained'   style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center'}} onPress={()=>pickDocument()}>Browse Album</Button> */}
            <Text></Text>
            {/* {img!=="" && <Image style={{height:200,width:200,alignSelf:'center',resizeMode:'cover',margin:responsiveHeight(10),borderWidth:1,borderRadius:20,borderColor:Colors.green}}  source={{uri:img}} />} */}
            <Button mode='contained' onPress={()=>ValidityofInput1()} style={styles.button}>Next</Button>
            </View>
        </View>
         

        <View>
        <View style={{width:50}}>
            <Ionicons name='chevron-back-outline' size={40} style={{margin:10,opacity:0.6}} color={Colors.text} onPress={()=>sw.scrollBy(-1,true)}/>
        </View>  
            <View style={{width:responsiveWidth(90),alignSelf:'center'}}>
            <Text style={styles.mainText}>Event Location</Text>
            <Text style={styles.subText}>Please specify the event location, so people can find It easily.</Text>
            {/* <Ionicons name='location' onPress={()=>setModal(true)} size={150} style={{alignSelf:'center',marginTop:responsiveHeight(10),borderRadius:75,borderWidth:1}} color={Colors.green}/> */}
            <View onTouchStart={()=>setModal(true)}>
            <Image style={{alignSelf:'center',marginTop:responsiveHeight(5)}} source={require('../Component/images/location.png')} />
            </View>
            {/* <Text style={{fontSize:responsiveFontSize(2.6),alignSelf:'center',fontWeight:'bold',color:Colors.green}}>Enter Your Location</Text> */}
            {/* <TextInput
                style={{margin:20,marginLeft:0}}      
                onChangeText={setLocation}
                underlineColorAndroid={Colors.green}
                value={location}
                placeholder="  Event Location...."
            /> */}
            <Modal
            animationType="fade"
            transparent={true}
            visible={modal}
            >
            {/* <View style={{position:'absolute',width:responsiveWidth(100),height:responsiveHeight(100),top:0,left:0}}> */}
            <LocationView
            apiKey={"AIzaSyCtMTNvLqOWRQ4NrFjrBCks8SNmt0jh3fA"} 
            initialLocation={{ 
                latitude: 33.5651,
                longitude: 73.0169,
            }}
            markerColor="#02aab0"
            actionText="Select Location"
            actionButtonStyle={{backgroundColor:"#02aab0"}}
            actionTextStyle={{color:"white"}}
            onLocationSelect={(item=>{
                setLocation(item.address)
                setModal(false)
            })
          }
            />
         {/* </View> */}
            </Modal>
            <Text style={{marginTop:5,fontSize:FontSizes.paragraph,fontFamily:Fonts.regular,color:Colors.text}} numberOfLines={1} >{location?location:"Select location by pressing location Icon"}</Text>
            {/* <Button mode='contained' style={{borderRadius:10,backgroundColor:Colors.green,width:'90%',alignSelf:'center',margin:responsiveHeight(5)}} onPress={()=>pickDocument()}>Enable Location</Button> */}
            <Button mode='contained' onPress={()=>ValidityofInput2()} style={[styles.button,{marginVertical:responsiveHeight(22)}]}>Next</Button>
            </View>
        </View>

        <View>
        <View style={{width:50}}>
            <Ionicons name='chevron-back-outline' size={40} style={{margin:10,opacity:0.6}} color={Colors.text} onPress={()=>sw.scrollBy(-1,true)}/>
        </View>
            <View style={{width:responsiveWidth(90),alignSelf:'center'}}>
            <Text style={styles.mainText}>Type of Event</Text>
             <Text style={styles.subText}>Please specify the event type, so your guest can find It easily.</Text>
            <TextInput
                style={{margin:20,marginLeft:0,marginRight:0}}      
                onChangeText={setType}
                underlineColorAndroid={Colors.text}
                value={type}
                placeholder="Event Type"
            />
            <Text style={styles.mainText}>Number of Guests</Text>
             <Text style={styles.subText}>Please specify the number of guests.</Text>
            <TextInput
                style={{margin:20,marginLeft:0,marginRight:0}}      
                onChangeText={setGuests}
                underlineColorAndroid={Colors.text}
                value={guests}
                placeholder="Number of Guests"
                keyboardType={'numeric'}
            />
            <Text style={styles.mainText}>Event Entry Fee </Text>
             <Text style={styles.subText}>Please specify the event fee, (if you set it zero the Event will be free)</Text>
            <TextInput
                style={{margin:20,marginLeft:0,marginRight:0}}      
                onChangeText={setFee}
                underlineColorAndroid={Colors.text}
                value={fee}
                placeholder="Enter Fee"
                keyboardType={'numeric'}

            />
            <Button mode='contained' onPress={()=>ValidityofInput3()} style={[styles.button,{marginVertical:responsiveHeight(12)}]}>Continue</Button>
            </View>
        </View>
      </Swiper> 
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
    },
    button:{
        borderRadius:5,height:responsiveHeight(8.5),backgroundColor:Colors.green,width:'100%',padding:10,marginVertical:responsiveHeight(30)
    },
    mainText:{fontSize:FontSizes.heading,fontFamily:Fonts.regular,color:Colors.text},
    subText:{marginTop:5,fontSize:FontSizes.paragraph,fontFamily:Fonts.regular,color:Colors.text}
  })
export default AddEventName