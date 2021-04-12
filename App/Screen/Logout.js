import React from 'react';
import { Modal, StyleSheet, Text, View} from 'react-native';
const Logout = ({ title, isVisible }) => {
return (
<View style={styles.modalContainer}>
 <Modal animationType='fade' transparent={true} visible={isVisible}>
    <View style={styles.modalContainer}>
     <View style={styles.modalView}>
       <Text style={styles.textStyle}>{title}</Text>
      </View>
    </View>
  </Modal>
 </View>
 );
};
const styles = StyleSheet.create({
 modalContainer: {
   alignItems: 'center',
   position: 'absolute',
   height: '100%', width: '100%',
},
 modalView: {
   flexDirection: 'row',
   justifyContent: 'flex-start', alignItems: 'center',
   top: 100,
   width: '85%', height: 50,
   backgroundColor: 'black',
   borderRadius: 8
},
textStyle: {
   color: 'white',
   textAlign: 'center',
   fontSize: 24,
   marginLeft: 20
}
});
export default Logout;