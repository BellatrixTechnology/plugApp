import React, { Component, useEffect, useState } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, Button, ScrollView, } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Fonts from '../Component/FontFamily';
import Colors from "../Component/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { fetchUser } from "../Services/CommonService";
import firestore from "@react-native-firebase/firestore";
import FontSizes from '../Component/FontSizes';

const Organizers=(props)=>{
    const [organizer,setOrganizers] = useState("")
    const allOrganizers=async()=>{
        const snapshot = await firestore().collection('Users')
        .where('BelongsTo','==',await fetchUser())
        .get()
        setOrganizers(snapshot.docs.map(doc => doc.data()))
        // console.log(await fetchUser())
    }
    useEffect(()=> allOrganizers(),[organizer])
    const list=[
        {id:1,name:"Ali"},
        {id:2,name:"Asim"},
        {id:3,name:"Ahmed"},
        {id:4,name:"Ahmed"}

    ]
    return (
    <View style={styles.container}>
        <Feather onPress={()=>props.navigation.navigate('AddOrganizer')} style={{alignSelf:'center',position:'absolute',zIndex:20,margin:28,right:0}} name='edit' size={20} color={Colors.green} />
        <View style={{zIndex:1, height:responsiveHeight(5.5),width:responsiveWidth(40),margin:20,marginLeft:22}}>
            <Text style={{color:Colors.black,fontSize:FontSizes.heading+6,fontFamily:Fonts.primaryText}}>Organizers</Text>
        </View>
        {/* <AntDesign onPress={()=>props.navigation.navigate('AddOrganizer')} style={{alignSelf:'center',position:'absolute',zIndex:20,margin:10,right:0}} name='pluscircleo' size={50} color={Colors.green} />
        <View style={{zIndex:1, height:responsiveHeight(4),width:responsiveWidth(30),margin:20}}>
            <Text style={{color:Colors.green,fontSize:responsiveFontSize(2.6),fontFamily:Fonts.primaryText,fontWeight:'bold'}}>Organizers</Text>
        </View> */}
        {/* <Image style={{width:'100%',opacity:0.7,resizeMode:'stretch',height:'100%',position:'absolute',marginTop:responsiveHeight(10)}} source={require('../Component/images/bg.jpeg')} /> */}
        {/* <View style={{alignSelf:'center',width:responsiveWidth(95),height:responsiveHeight(100)}} > */}
           <FlatList
           style={{alignSelf:'center',width:responsiveWidth(95),height:responsiveHeight(100)}}
           data={organizer}
            showsVerticalScrollIndicator={false}
           keyExtractor={item=>item.id}
           renderItem={({ item }) =>
                // <View style={{borderWidth:1,borderColor:Colors.white,borderRadius:10,backgroundColor:Colors.white,width:responsiveWidth(90),height:responsiveHeight(17),alignSelf:'center',margin:10}}>
                //     <Text style={{fontSize:responsiveFontSize(3),margin:5,color:Colors.green}}>  {item.Name}</Text>
                //     <Text style={{fontSize:responsiveFontSize(3),margin:5,color:Colors.green}}>  {item.Email}</Text>
                //     {/* <Image style={{width:responsiveWidth(80),alignSelf:'center',height:responsiveHeight(30)}} resizeMode='stretch' source={require('../Component/images/bg1.jpeg')} /> */}
                //     <FontAwesome  name='edit' style={{position:'absolute',top:10,right:10}} size={30} color={Colors.green} onPress={()=>props.navigation.navigate('EditOrganizer',{ids:item.id})} />
                // </View>
                <View style={{flex:1,height:responsiveHeight(12),flexDirection:'row',margin:10}}>
                    {/* <View style={{flex:0.35,backgroundColor:'green'}}> */}
                        {item.Img==="" && <Image style={{flex:0.3,height:70,marginTop:5,width:70,borderWidth:0.2,borderColor:Colors.text,borderRadius:10}} source={require('../Component/images/user.png')} />}
                        {item.Img!=="" && <Image style={{flex:0.3,height:70,marginTop:5,width:70,borderWidth:0.2,borderColor:Colors.text,borderRadius:10}} source={{uri:item.Img}} />}
                    {/* </View> */}
                    <View style={{flex:0.05,backgroundColor:'white'}}></View>
                    <View style={{flex:1,flexDirection:'column',}}>
                        <Text style={{flex:0.4,fontFamily:Fonts.regular,fontSize:FontSizes.heading,color:Colors.black}} numberOfLines={1}>{item.Name}</Text>
                        <Text style={{flex:0.3,fontFamily:Fonts.regular,fontSize:FontSizes.paragraph,color:"gray"}} numberOfLines={1}>{item.Email}</Text>
                        <Text style={{flex:0.2,fontFamily:Fonts.regular,fontSize:FontSizes.paragraph,color:Colors.green}} onPress={()=>props.navigation.navigate('AddOrganizer',{ids:item.id})} >Edit</Text>
                        <View style={{flex:0.09,width:'100%',}}></View>
                        <View style={{flex:0.01,width:'100%',backgroundColor:"silver",opacity:0.3}}></View>
                    </View>
                    {/* <View style={{flex:0.09}}><Ionicons name="chevron-forward-outline" style={{height:'100%',textAlignVertical:'center'}} size={30}/></View> */}
                </View>
           }
           />
        {/* </View> */}
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})
export default Organizers