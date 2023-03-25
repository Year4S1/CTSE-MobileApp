
import { NativeBaseProvider, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { firebase } from "../../Config";
import image from "../../assets/displayPlansBack.jpg"
import tw from 'twrnc';
const DisplayOtherWorkoutPlans = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [currentRecordId, setCurrentRecordId] = useState([]);


  useEffect(() => {
    firebase
      .firestore()
      .collection("WorkoutPlans")
      .where("UserID", "!=", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const workoutPlanData = [];
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().visibility === true) {
            setCurrentRecordId(documentSnapshot.id);
            workoutPlanData.push(documentSnapshot.data());
            setWorkoutPlans(workoutPlanData);
          }
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


              <ScrollView >
                <View style={{
                  marginVertical: 10, marginLeft: 30, marginRight: 30, marginTop: 20,
                  backgroundColor: "rgba(78, 235, 250, 0.2)",
                  borderRadius: 20,
                  boxShadow: '0 4px 30px rgba(70, 200, 250, 0.15)',
                }}>
                  <Card key={index} style={tw`ml-3 max-w-sm rounded overflow-hidden shadow-lg rounded-3xl `}>
                    <Card.Title style={tw`font-black text-xl mb-1`}  title={`Workout Plan ${index + 1}`} />
                    <Card.Content>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Workout Plan ID :{item.WorkoutPlanId}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Workout Plan Type :{item.WorkoutType}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Body Type :{item.BodyType}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Intensity :{item.Intensity}</Title>
                      <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Added Date :{item.SubDate}</Title>
                    </Card.Content>
                  </Card>
                </View>
              </ScrollView>

            );
          })
        }
      </ScrollView>
      </ImageBackground>
    </NativeBaseProvider>
  )
};

export default DisplayOtherWorkoutPlans;
