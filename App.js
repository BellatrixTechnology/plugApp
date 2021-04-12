import React from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen from "./App/Screen/HomeScreen";
import TabNavigation from "./App/Screen/TabNavigation";
import AddEventName from "./App/Screen/AddEventName";
import AddEvenLocation from "./App/Screen/AddEvenLocation";
import AddEventSettings from "./App/Screen/AddEventSettings";
// import AdminorOrganizer from "./App/Screen/AdminorOrganizer";
// import AdminSignin from "./App/Screen/AdminSignin";
import SplashScreen from "./App/Screen/SplashScreen";
import Setting from "./App/Screen/Setting";
import AddOrganizer from "./App/Screen/AddOrganizer";
import EditOrganizer from "./App/Screen/EditOrganizer";
import OrganizerHome from "./App/Screen/OrganizerHome";
import EditEvent from "./App/Screen/EditEvent";
// import SignIn from "./App/Screen/SignIn";
import Scanner from "./App/Screen/Scanner";
import Login from "./App/Screen/Login";
import map from "./App/Screen/map";




const Stack = createStackNavigator();
const option={
  title:"", //for login
  headerTintColor:"green",
  headerStyle:{
    backgroundColor:"white"
  }
}
export default function App() {
  return (
      <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={"home"} >
        <Stack.Screen name="home" component={HomeScreen} options={option,{headerShown:false}}/>
      </Stack.Navigator> */}
      <Stack.Navigator initialRouteName={"SplashScreen"} >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={option,{headerShown:false}}/>
        {/* <Stack.Screen name="AdminorOrganizer" component={AdminorOrganizer} options={option,{headerShown:false}}/> */}
        <Stack.Screen name="tab" component={TabNavigation} options={option,{headerShown:false}}/>
        <Stack.Screen name="AddEventName" component={AddEventName} options={option,{headerShown:false}}/>
        <Stack.Screen name="AddEvenLocation" component={AddEvenLocation} options={option,{headerShown:false}}/>
        <Stack.Screen name="AddEventSettings" component={AddEventSettings} options={option,{headerShown:false}}/>
        {/* <Stack.Screen name="signin" component={SignIn} options={option,{headerShown:false}}/> */}
        {/* <Stack.Screen name="adminsignin" component={AdminSignin} options={option,{headerShown:false}}/> */}
        <Stack.Screen name="Setting" component={Setting} options={option,{headerShown:false}}/>
        <Stack.Screen name="AddOrganizer" component={AddOrganizer} options={option,{headerShown:false}}/>
        <Stack.Screen name="EditOrganizer" component={EditOrganizer} options={option,{headerShown:false}}/>
        <Stack.Screen name="OrganizerHome" component={OrganizerHome} options={option,{headerShown:false}}/>
        <Stack.Screen name="EditEvent" component={EditEvent} options={option,{headerShown:false}}/>
        <Stack.Screen name="Scanner" component={Scanner} options={option,{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={option,{headerShown:false}}/>
        <Stack.Screen name="map" component={map} options={option,{headerShown:false}}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // marginTop:Constants.statusBarHeight
  },
});