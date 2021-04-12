import React, { useState ,useEffect} from 'react';
import { View,AsyncStorage,} from 'react-native';
import LocationView from "react-native-location-view";
const map=({ props })=>{
    return(
        <View style={{flex: 1}}>
            <LocationView
            apiKey={"AIzaSyCtMTNvLqOWRQ4NrFjrBCks8SNmt0jh3fA"} 
            initialLocation={{ 
                latitude: 33.5651,
                longitude: 73.0169,
            }}
            markerColor="#02aab0"
            actionText="Select"
            actionButtonStyle={{backgroundColor:"#02aab0"}}
            actionTextStyle={{color:"white"}}
            onLocationSelect={(item=>{
                alert(JSON.stringify(item.address))
            })
          }
            />
         </View>
    )
}
export default map