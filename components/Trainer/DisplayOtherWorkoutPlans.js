
import { NativeBaseProvider, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { firebase } from "../../Config";
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
                  <Card key={index}>
                    <Card.Title title={`Workout Plan ${index + 1}`} />
                    <Card.Content>
                      <Title>Workout Plan ID :{item.WorkoutPlanId}</Title>
                      <Title>Workout Plan Type :{item.WorkoutType}</Title>
                      <Title>Body Type :{item.BodyType}</Title>
                      <Title>Intensity :{item.Intensity}</Title>
                      <Title>Added Date :{item.SubDate}</Title>
                    </Card.Content>
                  </Card>
                </View>
              </ScrollView>

            );
          })
        }
      </ScrollView>
    </NativeBaseProvider>
  )
};

export default DisplayOtherWorkoutPlans;
