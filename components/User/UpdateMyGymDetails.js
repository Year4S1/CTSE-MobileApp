import React, { useEffect, useState } from "react";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  NativeBaseProvider,
  Select,
  Text,
  VStack,
} from "native-base";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../Config";

function UpdateMyGymDetails() {
    const image = {
        uri: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      };
      const UserName = firebase.auth().currentUser.displayName;
      const navigation = useNavigation();
    
      const [gyms, setGymList] = useState([]);
      const [trainers, setTrainers] = useState([]);
      const [currentRecordId, setCurrentRecordId] = useState([]);
    
      const [user, setUser] = useState({});
      const [trainer, setTrainer] = useState("");
      const [gym, setGym] = useState("");
      const [description, setDescription] = useState("");
      const [plan, setPlan] = useState("Yet to be selected");
    
      useEffect(() => {
        firebase
          .firestore()
          .collection("Gym List")
          .get()
          .then((querySnapshot) => {
            const gymlist = [];
            querySnapshot.forEach((documentSnapshot) => {
                gymlist.push(documentSnapshot.data());
                setGymList(gymlist);
              
            });
          });

          firebase
      .firestore()
      .collection("GymUsers")
      .where("UserName", "==", UserName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          setUser(querySnapshot.docs[0].data());
          setCurrentRecordId(querySnapshot.docs[0].id);
        }
      });
    
          firebase
          .firestore()
          .collection("RegistrationDetails")
          .where("Role", "==", 'trainer')
          .get()
          .then((querySnapshot) => {
            const trainersList = [];
            querySnapshot.forEach((documentSnapshot) => {
                trainersList.push(documentSnapshot.data());
                setTrainers(trainersList);
              
            });
          });
    
          
      }, []);

      const updateDetails=()=>{
        firebase
      .firestore()
      .collection("GymUsers")
      .doc(currentRecordId)
      .update({
        UserName: UserName,
        WorkoutPlanID: plan,
        GymName:gym,
        TrainerName:trainer,
        Description: description,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Gym User Updated!");
        navigation.navigate("user Dashboard")
      });
      }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Center w="100%">
          <Card style={styles.card}>
              <Box
                safeArea
                p="2"
                w="90%"
                maxW="290"
                py="8"
                style={{ marginTop: 50, color: "white" }}
              >
                <Heading
                  size="lg"
                  color="coolGray.800"
                  textAlign="center"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  fontWeight="semibold"
                >
                  Update your gym details
                </Heading>
                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>User Name</FormControl.Label>
                    <Input
                      // onChangeText={(val) => {
                      //   setUserName(val);
                      // }}
                      value={UserName}
                      placeholder={UserName}
                      readOnly
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Gym</FormControl.Label>
                    <Select
                      shadow={2}
                      selectedValue={gym}
                      minWidth="200"
                      accessibilityLabel="choose Role"
                      placeholder={user.GymName}
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
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
                      onValueChange={(value) => setGym(value)}
                    >
                      {gyms.map((gym,index)=>
                        <Select.Item shadow={2} key={index} label={gym.GymName} value={gym.GymName} />
                      )}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Trainer</FormControl.Label>
                    <Select
                      shadow={2}
                      selectedValue={trainer}
                      minWidth="200"
                      accessibilityLabel="choose Role"
                      placeholder={user.TrainerName}
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
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
                      onValueChange={(value) => setTrainer(value)}
                    >
                      {trainers.map((trainer,index)=>
                        <Select.Item shadow={2} key={index} label={trainer.UserName} value={trainer.UserName} />
                      )}
                    </Select>
                  </FormControl>
                  
                  <FormControl>
                    <FormControl.Label>Description</FormControl.Label>
                    <Input
                      onChangeText={(val) => {
                         setDescription(val);
                       }}
                      placeholder={user.Description}
                    />
                  </FormControl>
                  <Button mt="2" onPress={updateDetails}>Update</Button>
                </VStack>
              </Box>
            </Card>
          </Center>
        </ImageBackground>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      margin: 5,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
  });

export default UpdateMyGymDetails;
