import React from 'react'
import {
    HStack,
    NativeBaseProvider,
    Stack,
    Button as NativeBaseButton,
    VStack,
    Center,
  } from "native-base";
  import {ImageBackground, StyleSheet, Text, View} from 'react-native';

function UserDashboard() {
    const image = {uri: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80'};
  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 42,
      lineHeight: 84,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
    },
  });

export default UserDashboard