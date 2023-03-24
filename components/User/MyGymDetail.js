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

function MyGymDetail() {
  const image = {
    uri: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();

  const [user, setUser] = useState({});
  const [currentRecordId, setCurrentRecordId] = useState([]);

  useEffect(() => {
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
  }, []);

  const deleteDetails = () => {
    firebase
      .firestore()
      .collection("GymUsers")
      .doc(currentRecordId)
      .delete()
      .then(() => {
        alert("Details deleted!");
        navigation.navigate("user Dashboard");
      });
  };

  const handleAddDetails = () => {
    navigation.navigate("join gym");
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Center w="100%">
            {user.UserName && (
              <Card style={styles.card}>
                <Text style={{ fontSize: 22, color: "black", margin: 20 }}>
                  Name : {user.UserName}
                </Text>
                <Text style={{ fontSize: 22, color: "black", margin: 20 }}>
                  Gym : {user.GymName}
                </Text>
                <Text style={{ fontSize: 22, color: "black", margin: 20 }}>
                  Trainer : {user.TrainerName}
                </Text>
                <Text style={{ fontSize: 22, color: "black", margin: 20 }}>
                  Workout Plan : {user.WorkoutPlanID}
                </Text>
                <Text style={{ fontSize: 22, color: "black", margin: 20 }}>
                  Description : {user.Description}
                </Text>
                <Button mt="2">Update</Button>
                <Button mt="3" onPress={deleteDetails}>
                  Delete
                </Button>
              </Card>
            )}
            {!user.UserName && (
              <>
                <Text style={styles.greeting}>OOps!</Text>
                <Text style={styles.greeting}>
                  Looks like you Dont have any added details yet. Click the
                  below button to add your details.
                </Text>
                <Button mt="3" onPress={handleAddDetails}>
                  Add Details
                </Button>
              </>
            )}
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
    height: 500,
    width: 300,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 0,
  },
  text: {
    color: "whiteb",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default MyGymDetail;
