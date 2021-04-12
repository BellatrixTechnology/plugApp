import * as React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import Setting from "./Setting";
import Events from './Events';
import Organizers from "./Organizers";
import Scanner from "./Scanner";
import Colors from '../Component/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                // inactiveBackgroundColor:'red',
                activeBackgroundColor: Colors.green,
                // activeTintColor: Colors.black,
                activeTintColor: 'white',
                inactiveTintColor: 'black',
                keyboardHidesTabBar: true,
                tabBarIcon:{focused: false, color: "black"},
                style: {
                    // borderTopWidth: 1,
                },
            }}
        >
            {/* <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Ionicons style={{ opacity: .9, }} color={Colors.black} name={'home-outline'} size={26} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Events"
                component={Events}
                options={{
                    tabBarLabel: 'Events',
                    tabBarIcon: (tintcolor) => (
                        <Ionicons style={{ opacity: .9 }} color={tintcolor.color} name={'list'} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={Scanner}
                options={{
                    tabBarVisible:false,
                    tabBarLabel: '',
                    // tabBarIcon: () => (
                    //     <View style={{position:'absolute',bottom:15,padding:9.2,borderWidth:10,borderColor:Colors.white,borderRadius:"50%",backgroundColor:Colors.green,width:responsiveWidth(10),height:responsiveHeight(10)}}>
                    //     <Ionicons style={{ opacity: .9,}} color={Colors.black} name={'qr-code-outline'} size={26} />
                    //     </View>
                    // ),
                    tabBarIcon: (tintcolor) => {
                        return(
                        <View
                                style={{
                                    backgroundColor: Colors.white,
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop:-20,
                                }}
                            >
                                <View style={{backgroundColor:Colors.white,height:60,width:60,borderRadius:30,justifyContent:"center",alignItems:"center",elevation:10}}>
                                  <Ionicons name={'qr-code-outline'} size={26} color={Colors.green}/>
                                </View>
                                
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Organizers"
                component={Organizers}
                options={{
                    tabBarLabel: 'Organizers',
                    tabBarIcon: (tintcolor) => (
                        <Ionicons style={{ opacity: .9, }} color={tintcolor.color} name={'people-circle-outline'} size={26} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: () => (
                        <Ionicons style={{ opacity: .9, }} color={Colors.black} name={'settings-outline'} size={26} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}