import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text,TextInput, View,Image,TouchableOpacity } from 'react-native';

import AsyncStorage  from '@react-native-async-storage/async-storage';

export default function App() {

  const [name,setName] = useState("");

  const save =async(value)=>{
    try{

      await AsyncStorage.setItem('@storage_Key', value)
    }catch(err){
      alert(err);
      
    }

    // let user = {
    //   name:"Anwar",
    //   location:"MA"
    // }

    // await AsyncStorage.setItem('@storage_Key', JSON.stringify(user))

  }

  const load = async()=>{
    try{
      const value = await AsyncStorage.getItem('@storage_Key')
      if(name!==null){
        setName(value   )
      } 
        

    }catch(err){
      alert(err)
      console.log(err)
    }
  }


  const remove = async () => {
    try{
      await AsyncStorage.removeItem("@storage_Key")
    }catch(err){
      alert(err)
      console.log(err)
    }finally{
      setName('');
    }


  }

  useEffect(()=>{
    load()
  },[])

  return (
    <View style={styles.container}>
      <Image source={require('./assets/generated.png')} 
      style={{width:"100%",height:200,
      marginTop:64,
      resizeMode:'contain'}}/>
      <Text style={{...styles.name,height:30}}>Your name is : </Text>
      <Text >{name}</Text>
      <TextInput style={styles.inputText} 
        onChangeText={text => setName(text)}
      
      />

      <TouchableOpacity style={styles.save} onPress={()=>save(name)}>
          <Text style={{color:"white"}}>Save Name </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.save} 
        onPress={()=>remove()}
      >
          <Text style={{color:"white"}}>Remove name </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  setname:{
    fontSize:24,
    fontWeight:"300"
  },
  inputText:{
    borderWidth:1,
    borderColor:"#575DD9",
    alignSelf:"stretch",
    margin:32,
    height:64,
    borderRadius:6,
    paddingHorizontal:16,
    fontSize:24,
    fontWeight:"300"
  },
  save:{
    backgroundColor:"#575DD9",
    alignContent:"center",
    justifyContent:"center",
    alignItems:'center',
    margin:32,
    alignSelf:'stretch',
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:6,
  }
});
