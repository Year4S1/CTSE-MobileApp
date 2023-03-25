import { NativeBaseProvider, ScrollView } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';


const CallClients = ({ navigation }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [currentRecordId, setCurrentRecordId] = useState([]);
  const handleCall = (phoneNumber) => {

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber);

  };
  const image = {
    uri: "https://images.unsplash.com/photo-1569420077790-afb136b3bb8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  console.log(UserName);

  useEffect(() => {
    firebase
      .firestore()
      .collection("RegistrationDetails")
      .get()
      .then((querySnapshot) => {
        console.log("Total meal plans: ", querySnapshot.size);
        const mealPlanData = []
        querySnapshot.forEach((documentSnapshot) => {

          mealPlanData.push(documentSnapshot.data());
          setMealPlans(mealPlanData);

          setCurrentRecordId((prevState) => [
            ...prevState,
            documentSnapshot.id,
          ]);
        });
      });
  }, []);

 

  return (
    <NativeBaseProvider>
        <ImageBackground source={image} style={{flex:1}} resizeMode="cover">
      <ScrollView>
        {
          mealPlans.map((item, index) => {
            return (
              <NativeBaseProvider>
  
                <View style={{ marginVertical: 10}}>
            
                  <Card key={index} style={tw`ml-3 max-w-sm rounded overflow-hidden shadow-lg rounded-3xl `}>
                 
                    <Card.Title style={tw`font-black text-xl mb-1`} title={`Meal Plan ${index + 1}`} />
                    <Card.Content>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Client Name :{item.UserName}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Contact No :{item.PhoneNumebr}</Title>
                    </Card.Content>
                    
                    <Card.Actions>
                    <Feather name="phone-call"    onPress={() => {
                        handleCall(item.PhoneNumber);
                    }} size={35} color="green" />
                      
                    </Card.Actions>
                  </Card>
                  
                </View>
                
              </NativeBaseProvider>
            );

          })
        }
      </ScrollView>
      </ImageBackground>
    </NativeBaseProvider>
  )
};

export default CallClients;

const styles = StyleSheet.create({
  container: {
    maxWidth: "500px",
    height: "300px",
    padding: "35px",
    display:"flex",
    flexDirection: "column",   
     justifyContent: "space-between",
    // backgroundColor: rgba(255, 255, 255, .45),
    bordeRadius: "20px",
    border: "1px solid rgba(255, 255, 255, .25)",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, .25)",
    backdropFilter: "blur(15px)"
  },
 
});
