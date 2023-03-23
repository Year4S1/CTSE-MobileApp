import { NativeBaseProvider, ScrollView } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, Pressable, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";
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
      <ScrollView>
        {
          workoutPlans.map((item, index) => {
            return (
              <NativeBaseProvider>

                <View style={{ marginVertical: 10 }}>
                  <Card key={index} style={{
                    marginVertical: 10, marginLeft: 30, marginRight: 30, marginTop: 20,
                    backgroundColor: "rgba(78, 235, 250, 0.2)",
                    borderRadius: 0,
                    boxShadow: '0 4px 30px rgba(70, 200, 250, 0.15)',
                  }}>
                    <Card.Title title={`Test Sample ${index + 1}`} />
                    <Card.Content>
                      <Title>Workout Plan ID :{item.WorkoutPlanId}</Title>
                      <Title>Workout Plan Type :{item.WorkoutType}</Title>
                      <Title>Body Type :{item.BodyType}</Title>
                      <Title>Intensity :{item.Intensity}</Title>
                      <Title>Added Date :{item.SubDate}</Title>
                    </Card.Content>
                    <Card.Actions>
                      {/* <Button
                color="#FF0000"
                onPress={() => {
                  handleDelete(index);
                }}
                title="Delete"
              >
            
              </Button> */}

                      {/* <Button
                color="#00FF00"0

                
                onPress={() => {
                  navigation.navigate("Update Test Record",
                    {currentRecordId:currentRecordId[index]});
                }}
                title="Update"
              >

              </Button> */}
                      <AntDesign
                        onPress={() => {
                          navigation.navigate("Update Test Record", {
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
    </NativeBaseProvider>
  )
};

export default DisplayWorkoutPlans;
