import React, { Component, useEffect, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
  } from 'react-native';
import {Button} from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Colors from "../Component/Colors";
import { responsiveHeight } from 'react-native-responsive-dimensions';
const Scanner=(props)=>{
    const onSuccess = e => {
      console.log(e.data)
        Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err)
        );
      };
    return(
        <QRCodeScanner
        containerStyle={{position:'absolute',top:0,left:0,height:responsiveHeight(100),width:'100%'}}
        onRead={(onSuccess)}
        flashMode={RNCamera.Constants.FlashMode.off}
        // topViewStyle={{display:'none'}}
        topContent={
            <View style={{position:'absolute',top:0.5,right:5}}>
                <Entypo name="cross" color={Colors.green} size={40} onPress={()=>props.navigation.goBack()} />
            </View>
        }
        reactivate={true}
        reactivateTimeout={3000}
        // bottomContent={
        //   <TouchableOpacity  style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK</Text>
        //   </TouchableOpacity>
        // }
      />
    )
}
const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });
  
export default Scanner