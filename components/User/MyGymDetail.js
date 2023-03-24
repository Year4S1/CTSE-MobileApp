import React from 'react'
import {
    Box,
    Button,
    Center,
    CheckIcon,
    FormControl,
    Heading,
    HStack,
    Input,
    Link,
    NativeBaseProvider,
    Select,
    Text,
    VStack,
  } from "native-base";
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
  } from "react-native";
  import { firebase } from "../../Config";

function MyGymDetail() {
    const image = {
        uri: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      };
      const UserName = firebase.auth().currentUser.displayName;
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Center w="100%">
        </Center>
        </ImageBackground>
        </View>
        </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      margin: 5,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
  });

export default MyGymDetail