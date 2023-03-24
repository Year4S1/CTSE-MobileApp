import { NativeBaseProvider, ScrollView } from "native-base";
import React, { cloneElement, useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { firebase } from "../../Config";
import { AntDesign } from "@expo/vector-icons";
import tw from 'twrnc';
import image from "../../assets/displayPlansBack.jpg"


const ViewGym = ({ navigation }) => {
  const [gymData, setGymData] = useState([]);
  const [currentGymID, setCurrentGymID] = useState([]);
const role=firebase.auth().currentUser.photoURL
  const handleDelete = (index) => {
    firebase
      .firestore()
      .collection("Gym List")
      .doc(currentProductId[index])
      .delete()
      .then(() => {
        alert("Deleted");
      });

    const recordCopy = [...gymData];
    recordCopy.splice(index, 1);
    setGymData(recordCopy);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("Gym List")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
       const products=[]
        querySnapshot.forEach((documentSnapshot) => {
        
            products.push(documentSnapshot.data());
          setGymData(products);

          setCurrentGymID((prevState) => [
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
          gymData.map((item, index) => {
            return (
              <NativeBaseProvider>
  
                <View style={{ marginVertical: 10}}>
            
                  <Card key={index} style={tw`ml-3 max-w-sm rounded overflow-hidden shadow-lg rounded-3xl `}>
                 
                    <Card.Title style={tw`font-black text-xl mb-1`} title={`Workout Plan ${index + 1}`} />
                    <Card.Content>
            <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Gym Name :{item.GymName}</Title>
            <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Location :{item.Location}</Title>
            <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Contact :{item.Contact}</Title>
            <Title style={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>Open Time :{item.OpenTime}</Title>
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



export default ViewGym;