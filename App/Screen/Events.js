import React, { Component, useEffect, useState } from 'react';
import { View, Image,Modal, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, ScrollView,ToastAndroid } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import { Button } from "react-native-paper";
import Fonts from '../Component/FontFamily';
import Colors from "../Component/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import { fetchUser,storeUser } from "../Services/CommonService";
import QRCode from 'react-native-qrcode-svg';
import auth from '@react-native-firebase/auth';
import FontSizes from '../Component/FontSizes';
function Events({navigation}){
    const [event,setEvent] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [val,setVal] = useState("")
    const [modal,setModal] = useState(false)
    let logoFromFile = require('../Component/images/bg.jpeg');
    const qrGenrator=(val)=>{
        setVal(val)
        setModalVisible(true)
      }
    function logout() {
        auth().signOut().then(() => console.log('User signed out!'));
        setModal(false)
        storeUser("")
        ToastAndroid.show('Logout successfully',3000)
        props.navigation.navigate('Login')
    }
    const saveData=async()=>{
        const snapshot = await firestore().collection('Events')
        .where('author','==',await fetchUser())
        // .orderBy("id", "desc")
        .get()
        setEvent(snapshot.docs.map(doc => doc.data()))
        // console.log(await fetchUser())
    }
    useEffect(()=> saveData(),[event])
    const list=[
        {id:1,name:"Ali"},
        {id:2,name:"Asim"},
        {id:3,name:"Ahmed"},
        {id:4,name:"Ahmed"}
    ]
    return (
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
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{position:'absolute',alignItems:'center',backgroundColor:Colors.green,top:responsiveHeight(35),left:responsiveWidth(25),height:responsiveHeight(40),width:responsiveWidth(50)}} >
        <Text>{val}</Text>
        <QRCode
            value={val}
            // logo={logoFromFile}
            // logoSize={30}
            size={180}
            logoBackgroundColor='transparent'
            />
        <Text></Text>
        <Button color={'black'}  onPress={()=>setModalVisible(false)} >CLose</Button>
        </View>
      </Modal>
        {/* <AntDesign onPress={()=>props.navigation.navigate('Setting')} style={{}} name='logout' size={15} color={Colors.green} /> */}
        <Feather onPress={()=>navigation.navigate('AddEventName')} style={{alignSelf:'center',position:'absolute',zIndex:20,margin:28,right:0}} name='edit' size={20} color={Colors.green} />
        <View style={{zIndex:1, height:responsiveHeight(4.6),width:responsiveWidth(22),margin:20,marginLeft:22}}>
            <Text onPress={()=>setModal(true)} style={{color:Colors.black,fontSize:FontSizes.heading+6,fontFamily:Fonts.primaryText}}>Events</Text>
        </View>
        {/* <Image style={{width:'100%',opacity:0.7,resizeMode:'stretch',height:'100%',position:'absolute',marginTop:responsiveHeight(10)}} source={require('../Component/images/bg.jpeg')} /> */}
        <View style={{alignSelf:'center',width:responsiveWidth(95),height:responsiveHeight(100)}} >
           <FlatList
           data={event}
           keyExtractor={item=>item.id}
           style={{marginBottom:responsiveHeight(20)}}
           renderItem={({ item }) =>
                // <View  style={{borderWidth:1,borderColor:Colors.white,borderRadius:10,backgroundColor:Colors.white,width:responsiveWidth(90),height:responsiveHeight(50),alignSelf:'center',margin:10}}>
                //     <Text style={{fontSize:FontSizes.heading,margin:5}}numberOfLines={1}>  {item.name}</Text>
                //     <Image style={{width:responsiveWidth(80),alignSelf:'center',height:responsiveHeight(30),borderRadius:10}} resizeMode='cover' source={{uri:item.image}} />
                //     <View style={{flex:1,flexDirection:'row',margin:20}}>
                //     <Text style={{flex:0.9}}></Text>
                //     <FontAwesome  name='edit' style={{position:'absolute',top:10,right:10}} size={30} color={Colors.green} onPress={()=>props.navigation.navigate('EditEvent',{ids:item.id})} />
                //     </View>
                // </View>
                <View  style={{borderWidth:0.01,borderColor:Colors.white,borderRadius:10,backgroundColor:Colors.white,width:responsiveWidth(90),height:responsiveHeight(30),alignSelf:'center',margin:10}}>
                    <Image style={{width:'100%',alignSelf:'center',height:'100%',borderRadius:10}} resizeMode='stretch' source={{uri:item.image}} />
                    {/* {console.log(item.image.split('Images%2F')[1].split('?')[0])} */}
                    <View style={{position:'absolute',bottom:0,width:'100%',height:responsiveHeight(6.6),flexDirection:'row',zIndex:1}}>
                        <Text style={{flex:0.8,margin:10,marginLeft:5,color:Colors.white,fontSize:FontSizes.heading,fontFamily:Fonts.bold}} numberOfLines={1}>{item.name}</Text>
                        {/* <Button style={{flex:0.1,margin:5,marginTop:10,borderRadius:50,opacity:0.6,height:25}}color={Colors.white} mode="contained" onPress={()=>props.navigation.navigate('EditEvent',{ids:item.id})}>Edit</Button> */}
                        {/* <Button style={{flex:0.1,margin:5,borderRadius:50,opacity:0.6,height:responsiveHeight(4)}}  color={Colors.white} mode="contained" >Edit</Button> */}
                        <Text onPress={()=>navigation.navigate('EditEvent',{ids:item.id})} style={{flex:0.2,margin:10,borderRadius:50,opacity:0.5,height:responsiveHeight(3.5),width:10,padding:3,textAlign:'center',backgroundColor:Colors.white,color:Colors.black}} >Edit</Text>
                    </View>
                    <View style={{position:'absolute',bottom:0,width:'100%',height:'100%',borderRadius:10,flexDirection:'row',backgroundColor:'black',zIndex:0,opacity:0.25}}>
                    </View>
                </View>
           }
           />
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})
export default Events