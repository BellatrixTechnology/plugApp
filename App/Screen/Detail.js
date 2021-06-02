import React ,{useState}from 'react';
import {Modal, Text, View,Image,Button, TouchableOpacity, FlatList ,TextInput } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize 
} from "react-native-responsive-dimensions";
import Fonts from '../Component/FontFamily';
import Colors from "../Component/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Detail = ({route,navigation}) => {
    const [modal,setModal] = useState(false)
    const[profile,setProfile]=useState([
        { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "Ibad", "Book": "Party"}
    ,
    { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109461?alt=media&token=a33bf366-5fea-4470-b06e-160998f2568b", "Name": "Ali", "Book": "Party"}
    ,
    { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "nadeem", "Book": "Party"}
,
{ "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109461?alt=media&token=a33bf366-5fea-4470-b06e-160998f2568b", "Name": "Bk", "Book": "Party"}
    ])
    const[serach,setserach]=useState([
        { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "Ibad", "Book": "Party"}
    ,
    { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "Bk", "Book": "Party"}
    ,
    { "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "nadeem", "Book": "Party"}
,
{ "Email": "ibadqureshiit@gmail.com","id": "id-1618991630342", "image": "https://firebasestorage.googleapis.com/v0/b/plug-ebaea.appspot.com/o/Images%2F16189916109460?alt=media&token=14ccee15-aa0d-4b6d-a0ee-2a0a7a46e460", "Name": "Ali", "Book": "Party"}
    ])
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          console.log(text)
          const newData = serach.filter(
            function (item) {
               
              const itemData = item.Name
                ? item.Name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
             
              return itemData.indexOf(textData) > -1;
          });
          console.log(newData)
          setProfile(newData);
         
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setProfile(profile);
          
        }
      };
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
      const ItemView = ({item}) => {
        return (
          // Flat List Item
          <View style={{padding:10}}>
              <View style={{flexDirection:'row',}}>
<Image style={{width:60,height:60,borderRadius:120}} resizeMode='stretch' source={{uri:item.image}} />
<View style={{justifyContent:'center',paddingLeft:10,}}>
<Text >
           
            {item.Name.toUpperCase()}
          </Text>
          <Text style={{textAlign:'center'}}>
           
            {item.Email}
          </Text>
          <Text >
           
           {item.Book}
         </Text>
          </View>
              </View>
                
          </View>
        
        );
      }; 
    return(
        <View style={{paddingTop:20,flex:1}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',paddingRight:20}}>
                <View></View>
            <TouchableOpacity onPress={()=>setModal(true)}
             style={{backgroundColor:Colors.green,width:100,height:40,justifyContent:'center',borderRadius:20,alignItems:'center'}}>
                <Text>
                    Guset List
                </Text>
            </TouchableOpacity>
            </View>
        <View  style={{borderWidth:0.01,borderColor:Colors.white,borderRadius:10,backgroundColor:Colors.white,width:responsiveWidth(90),height:responsiveHeight(30),alignSelf:'center',margin:10}}>

         <Image style={{width:'100%',alignSelf:'center',height:'100%',borderRadius:10}} resizeMode='stretch' source={{uri:route.params.image.split('`').[0]}} />
                    {/* { console.log(item.image.split('Images%2F')[1].split('?')[0]) */}
                    
                    <View style={{position:'absolute',bottom:0,width:'100%',height:responsiveHeight(6.6),flexDirection:'row',zIndex:1}}>
                        <Text style={{flex:0.8,margin:10,marginLeft:5,color:Colors.white,fontSize:FontSizes.heading,fontFamily:Fonts.bold}} numberOfLines={1}>{route.params.name}</Text>
                       
                    </View>
                   
    </View>
    <View  style={{borderWidth:0.01,borderColor:Colors.white,borderRadius:10,backgroundColor:Colors.white,width:responsiveWidth(90),height:responsiveHeight(30),alignSelf:'center',margin:10}}>

<Image style={{width:'100%',alignSelf:'center',height:'100%',borderRadius:10}} resizeMode='stretch' source={{uri:route.params.image.split('`').[1]}} />
           {/* { console.log(item.image.split('Images%2F')[1].split('?')[0]) */}
           
           <View style={{position:'absolute',bottom:0,width:'100%',height:responsiveHeight(6.6),flexDirection:'row',zIndex:1}}>
               <Text style={{flex:0.8,margin:10,marginLeft:5,color:Colors.white,fontSize:FontSizes.heading,fontFamily:Fonts.bold}} numberOfLines={1}>{route.params.name}</Text>
              
           </View>
          
</View>
<Modal
        animationType="fade"
        transparent={true}
        visible={modal}
      >
                   
          <View style={{backgroundColor:Colors.white,borderColor:Colors.green,borderWidth:0.3,flex:1,}} >
          <MaterialCommunityIcons name='arrow-left' size={30} color={Colors.black}  style={{paddingLeft:10,paddingTop:10}} onPress={()=>setModal(false)}/>
        <View style={{padding:10}}>
          <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            paddingLeft: 20,
            margin: 5,
            borderRadius:20,
            borderColor: '#009688',
            backgroundColor: '#FFFFFF',
          }}
          onChangeText={(text) => searchFilterFunction(text)}
          
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        </View>
         <FlatList
          data={profile}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
    </View>
      </Modal>
    </View>
    
);
}

export default Detail;
