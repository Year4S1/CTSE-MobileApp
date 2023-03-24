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

    const [planName,setPlanName]=useState("");
    const [price,setPrice]=useState("");
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
 
  const addMembershipPlan=()=>{

    
  
  firebase.firestore()
    .collection('Membership Plan')
    .add({
      UserName: userName,
      UserID: userId,
      PlanName:planName,
      Price:price,
    })
    .then(() => {
      alert('Membership Plan Added!');
    });
  
  
  
  }
    return (
      <NativeBaseProvider>
        <>
  
          <View style={{marginVertical:30}} >
            <Box w="100%">
              <FormControl>
                <Stack mx="8">
                  <FormControl.Label>Membership Type</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setPlanName(val)
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
                    placeholder="Please enter the type"
                  />

                <FormControl.Label>Price</FormControl.Label>
                  <Input
                  onChangeText={val=>{
                    setPrice(val)
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
     
               <NativeBaseButton style={{marginVertical:30}} onPress={addMembershipPlan}>Add Plan</NativeBaseButton> 
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