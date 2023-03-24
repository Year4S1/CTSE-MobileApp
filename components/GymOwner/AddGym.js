import {
    Box,
    Checkbox,
    CheckIcon,
    FormControl,
    Input,
    NativeBaseProvider,
    Select,
    Stack,
    WarningOutlineIcon,
    Button as NativeBaseButton
  } from "native-base";
  import React, { useState } from "react";
  import { Button, Platform, StyleSheet, Text, View } from "react-native";
  import {firebase} from "../../Config";
  import { useEffect } from "react";
  import Footer from "../Common/Footer";

  const AddGym = () => {

    const [gymName,setGymName]=useState("");
    const [location,setLocation]=useState("");
    const [contact,setContact]=useState("");
    const [openTime,setOpenTime]=useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const UserName = firebase.auth().currentUser.displayName;
        console.log("userName", UserName);
        setUserName(UserName);
        const UserId = firebase.auth().currentUser.uid;
        console.log("userId", UserId);
        setUserId(UserId);
      }, []);
 
  const addGym=()=>{

    
  
  firebase.firestore()
    .collection('Gym List')
    .add({
      UserName: userName,
      UserID: userId,
      GymName:gymName,
      Location:location,
      Contact:contact,
      OpenTime:openTime,
    })
    .then(() => {
      alert('Gym Details Added!');
    });
  
  
  
  }
    return (
      <NativeBaseProvider>
        <>
  
          <View style={{marginVertical:30}} >
            <Box w="100%">
              <FormControl>
                <Stack mx="8">
                  <FormControl.Label>Gym Name</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setGymName(val)
                  }}
                
                    _light={{
                      bg: "coolGray.100",
                      _hover: {
                        bg: "coolGray.200",
                      },
                      _focus: {
                        bg: "coolGray.200:alpha.70",
                      },
                    }}
                    _dark={{
                      bg: "coolGray.800",
                      _hover: {
                        bg: "coolGray.900",
                      },
                      _focus: {
                        bg: "coolGray.900:alpha.70",
                      },
                    }}
                    shadow={2}
                    type="text"
                    placeholder="Please enter the Product Name"
                  />

                <FormControl.Label>location</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setLocation(val)
                  }}
                
                    _light={{
                      bg: "coolGray.100",
                      _hover: {
                        bg: "coolGray.200",
                      },
                      _focus: {
                        bg: "coolGray.200:alpha.70",
                      },
                    }}
                    _dark={{
                      bg: "coolGray.800",
                      _hover: {
                        bg: "coolGray.900",
                      },
                      _focus: {
                        bg: "coolGray.900:alpha.70",
                      },
                    }}
                    shadow={2}
                    type="text"
                    placeholder="Please enter the Product ID"
                  />

                <FormControl.Label>Contact</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setContact(val)
                  }}
                
                    _light={{
                      bg: "coolGray.100",
                      _hover: {
                        bg: "coolGray.200",
                      },
                      _focus: {
                        bg: "coolGray.200:alpha.70",
                      },
                    }}
                    _dark={{
                      bg: "coolGray.800",
                      _hover: {
                        bg: "coolGray.900",
                      },
                      _focus: {
                        bg: "coolGray.900:alpha.70",
                      },
                    }}
                    shadow={2}
                    type="text"
                    placeholder="Please enter Quantity"
                  />
                  
                  <FormControl.Label>Open Time</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setOpenTime(val)
                  }}
                
                    _light={{
                      bg: "coolGray.100",
                      _hover: {
                        bg: "coolGray.200",
                      },
                      _focus: {
                        bg: "coolGray.200:alpha.70",
                      },
                    }}
                    _dark={{
                      bg: "coolGray.800",
                      _hover: {
                        bg: "coolGray.900",
                      },
                      _focus: {
                        bg: "coolGray.900:alpha.70",
                      },
                    }}
                    shadow={2}
                    type="text"
                    placeholder="Please enter the Price"
                  />
        
  
     
               <NativeBaseButton style={{marginVertical:30}} onPress={addGym}>Add Gym</NativeBaseButton> 
                </Stack>
              </FormControl>
            </Box>
          </View>
        </><View style={{marginTop:200}}><Footer /></View>
      </NativeBaseProvider>
    );
  };
  
  const styles = StyleSheet.create({
    select: {
      marginTop: "10px",
    },
  });
  
  export default AddGym;