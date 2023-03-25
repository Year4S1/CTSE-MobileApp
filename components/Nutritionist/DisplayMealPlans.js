import { NativeBaseProvider, ScrollView } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";
import tw from 'twrnc';


const DisplayMealPlans = ({ navigation }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [currentRecordId, setCurrentRecordId] = useState([]);

  const image = {
    uri: "https://images.unsplash.com/photo-1569420077790-afb136b3bb8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  console.log(UserName);
  const handleDelete = (index) => {
    firebase
      .firestore()
      .collection("MealLists")
      .doc(currentRecordId[index])
      .delete()
      .then(() => {
        alert("Meal Plan deleted!");
      });

    const recordCopy = [...mealPlans];
    recordCopy.splice(index, 1);
    setMealPlans(recordCopy);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("MealLists").where('Creater', '==', UserName)
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
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Dish Name :{item.DishName}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Meal Type :{item.MealType}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Ingredients :{item.Ingredients}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Dietary Restrictions :{item.DietaryRestrictions}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>ServingSize :{item.ServingSize}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>TimeToPrepare :{item.TimeToPrepare}</Title>
                    </Card.Content>
                    <Card.Actions>
                      
                      
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

export default DisplayMealPlans;

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
