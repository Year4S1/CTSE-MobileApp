import { NativeBaseProvider, ScrollView } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";
import tw from 'twrnc';
import image from "../../assets/displayPlansBack.jpg"


const DisplayWorkoutPlans = ({ navigation }) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [currentRecordId, setCurrentRecordId] = useState([]);

  const handleDelete = (index) => {
    firebase
      .firestore()
      .collection("WorkoutPlans")
      .doc(currentRecordId[index])
      .delete()
      .then(() => {
        alert("Plan deleted!");
      });

    const recordCopy = [...workoutPlans];
    recordCopy.splice(index, 1);
    setWorkoutPlans(recordCopy);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("WorkoutPlans").where('UserID', '==', firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
        const workoutPlanData = []
        querySnapshot.forEach((documentSnapshot) => {

          workoutPlanData.push(documentSnapshot.data());
          setWorkoutPlans(workoutPlanData);

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
          workoutPlans.map((item, index) => {
            return (
              <NativeBaseProvider>
  
                <View style={{ marginVertical: 10}}>
            
                  <Card key={index} style={tw`ml-3 max-w-sm rounded overflow-hidden shadow-lg rounded-3xl `}>
                 
                    <Card.Title style={tw`font-black text-xl mb-1`} title={`Workout Plan ${index + 1}`} />
                    <Card.Content>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Workout Plan ID :{item.WorkoutPlanId}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Workout Type :{item.WorkoutType}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Body Type :{item.BodyType}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Intensity :{item.Intensity}</Title>
                      <Title style={tw`inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>{item.WorkoutSchedule}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Added Date :{item.SubDate}</Title>
                    </Card.Content>
                    <Card.Actions>
                      
                      <AntDesign
                        onPress={() => {
                          navigation.navigate("Update Workout Plan", {
                            currentRecordId: currentRecordId[index],
                          });
                        }}
                        name="edit"
                        size={35}
                        color="green"
                        
                      />

                      <AntDesign
                        onPress={() => {
                          handleDelete(index);
                        }}
                        name="delete"
                        size={35}
                        color="red"
                      />
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

export default DisplayWorkoutPlans;

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
