import { fontFamily } from '@/fontFamily/fontFamily';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const ShopItem = () => {
  return (
   
     <LinearGradient colors = {['#00C6FF','#009CFF', '#6A1B9A']}  locations={[0, .1, .8]} start = {{x: 0, y: 0}} end = {{x: 0, y: 1}} style = {styles.container} >
       <View className = 'bg-shopAccent rounded-xl flex-row flex-[1] '>
               <View className = 'flex-1 flex-row items-center justify-center p-3'>
               <Ionicons name = 'pricetag' size = {50} color = {'#FFFFFF'} />
       </View>
               <View className = 'flex-col justify-evenly items-center flex-[3]' >
               <Text className = 'text-white text-xl' style = {{fontFamily: fontFamily.ExoExtraBold}}>DOUBLE DOWN</Text>
               <Text className = 'text-white text-center' style ={{fontFamily: fontFamily.ExoRegular}}>Multiply your rewards at a risk! Earn double or lose the bonus depending on your answer</Text>
               <Text className = 'text-[#00FFBF]'>Multiply or Lose rewards by 2x</Text>
   <TouchableOpacity>
       <View className = 'w-[100px] justify-center items-center bg-[#1ABC9C] px-4 py-1 rounded-xl'>
               <Text className = 'text-white'>$400</Text>
       </View>
   </TouchableOpacity>
   </View>
   
   
       </View>
     </LinearGradient>
  )
}

export default ShopItem

const styles = StyleSheet.create({

        container:{
                borderRadius:10,
                padding: 1,
                height: 200,
                marginVertical: 10,
        }
})