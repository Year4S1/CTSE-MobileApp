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
    Button as NativeBaseButton,
  } from "native-base";
  import React, { useEffect, useState } from "react";
  import {
    Button,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
  } from "react-native";
  import { firebase } from "../../Config";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import Footer from "../Common/Footer";
  
  
  
  const UpdateMembershipPlan = ({ route, navigation }) => {
    const { currentPlanID } = route.params;
    const [planData, setPlanData] = useState([]);
    const [planName, setPlanName] = useState("");
    const [price, setPrice] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
  
    useEffect(() => {
      const UserName = firebase.auth().currentUser.displayName;
      console.log("userName", UserName);
      setUserName(UserName);
      const UserId = firebase.auth().currentUser.uid;
      setUserId(UserId);
    }, []);

    
  
    const updateMembership = () => {
      console.log("hi q");
  
      firebase
        .firestore()
        .collection("Membership Plan")
        .doc(currentPlanID)
        .update({
          UserName: userName,
          UserID: userId,
          PlanName: planName,
          Price: price,
        })
        .then(() => {
          alert("Membership Plan Updated!");
          navigation.navigate("Gym Owner Dashboard");
        });
    };
  
    useEffect(() => {
      firebase
        .firestore()
        .collection("Membership Plan")
        .doc(currentPlanID)
        .get()
        .then((documentSnapshot) => setPlanData(documentSnapshot.data()));
    }, []);
    return (
      <NativeBaseProvider>
        <>
          <View style={{ marginVertical: 30 }}>
            <Box w="100%">
              <FormControl>
                <Stack mx="8">
                  <FormControl.Label>Membership Plan Type</FormControl.Label>
                  <Input
                    onChangeText={(val) => {
                      setPlanName(val);
                    }}
                    type="text"
                    placeholder={planData.PlanName}
                  />

                <FormControl.Label>Price</FormControl.Label>
                  <Input
                    onChangeText={(val) => {
                      setPrice(val);
                    }}
                    type="text"
                    placeholder={planData.Price}
                  />
                  
                  <NativeBaseButton
                    style={{ marginVertical: 40 }}
                    onPress={updateMembership}
                  >
                    Update Plan
                  </NativeBaseButton>
                </Stack>
              </FormControl>
            </Box>
          </View>
        </><Footer />
      </NativeBaseProvider>
    );
  };
  
  const styles = StyleSheet.create({
    select: {
      marginTop: "10px",
    },
  });
  
  export default UpdateMembershipPlan;
  