import AsyncStorage from '@react-native-async-storage/async-storage';
export const tstamp=()=> {
    let date = new Date();
    return (date.getTime());
  }
export const storeUser = async (value) => {
    try {
      // alert("value to be stored=>"+ value)
      await AsyncStorage.setItem('user', value)
      // alert(value)
    } catch (e) {
      // saving error
    }
  }
export const fetchUser = async () => {
  try {
    const data = await AsyncStorage.getItem('user')
    return data;
    // alert(data)
  } catch (e) {
    // saving error
  }
}
export const emailValidation=(email)=>{
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(email) === true){
               return 1;
           }
           else{
               return 0;
           }
}

