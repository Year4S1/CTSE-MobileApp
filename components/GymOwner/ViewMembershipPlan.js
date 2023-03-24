import { NativeBaseProvider } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, Pressable, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";


const ViewMembershipPlan = ({ navigation }) => {
  const [planData, setPlanData] = useState([]);
  const [currentPlanID, setCurrentPlanID] = useState([]);
const role=firebase.auth().currentUser.photoURL
  const handleDelete = (index) => {
    firebase
      .firestore()
      .collection("Membership Plan")
      .doc(currentProductId[index])
      .delete()
      .then(() => {
        alert("Deleted");
      });

    const recordCopy = [...planData];
    recordCopy.splice(index, 1);
    setPlanData(recordCopy);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("Membership Plan")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
       const plans=[]
        querySnapshot.forEach((documentSnapshot) => {
        
            plans.push(documentSnapshot.data());
          setPlanData(plans);

          setCurrentPlanID((prevState) => [
            ...prevState,
            documentSnapshot.id,
          ]);
        });
      });
  }, []);
  return gymData.map((item, index) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Card key={index} style={{ marginVertical: 10,marginLeft:30,marginRight:30,marginTop:20,
    backgroundColor: "rgba(78, 235, 250, 0.2)",
    borderRadius:0,
    boxShadow: '0 4px 30px rgba(70, 200, 250, 0.15)',}}>
          <Card.Title title={`Plan ${index + 1}`} />
          <Card.Content>
            <Title>Gym Name :{item.PlanName}</Title>
            <Title>Location :{item.Price}</Title>
          </Card.Content>
      
          {(role==="gymowner")&& (
        <View style={{display:'flex'}}>
         <Card.Actions>
            <AntDesign
              onPress={() => {
                navigation.navigate("Update Gym", {
                  currentGymID: currentGymID[index],
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
            </View>
          )
  }
      
            
          
        </Card>
      </View>
    );
  });
};

export default ViewMembershipPlan;