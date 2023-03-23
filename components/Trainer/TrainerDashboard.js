import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HStack,
  NativeBaseProvider,
  Stack,
  Text,
  Button as NativeBaseButton,
  VStack,
  Center,
} from "native-base";
import { Card, Title } from "react-native-paper";
import Footer from "../Common/Footer";
import { useEffect } from "react";
import { firebase } from "../../Config";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
export default function TrainerDashboard({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [lastRecordId, setlastRecordId] = useState("");
  const [subDate, setSubDate] = useState("");
  const [hPriorityCount, setHPriorityCount] = useState(0);
  const [totSampleCount, setTotSampleCount] = useState(0);
  const isFocused=useIsFocused()
  useEffect(() => {
 
    const UserName = firebase.auth().currentUser.displayName;
    console.log("userName", UserName);
    setUserName(UserName);
    const UserId = firebase.auth().currentUser.uid;
    setUserId(UserId);

    let hPriorityCount = 0;
    firebase
      .firestore()
      .collection("TestResults")
      .where("UserID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        setTotSampleCount(querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().Priority === "high") {
            ++hPriorityCount;
            setHPriorityCount(hPriorityCount);
          }
        });
      });

    firebase
      .firestore()
      .collection("TestResults")

      .where("UserID", "==", firebase.auth().currentUser.uid)
     .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data());
          setSubDate(documentSnapshot.data().SubDate);
          setlastRecordId(documentSnapshot.data().TestID);
        });
      });
  }, [isFocused]);

  const date = new Date()
  const hour = date.getHours()
  let DayType;
  console.log(hour);
  if (hour < 12) {
    // setTypeOfDay("Good Morning")
    DayType="Good Morning"
  } else if (hour < 18) {
    // setTypeOfDay("Good afternoon")
    DayType="Good Afternoon"
  } else {
    DayType="Good Evening"
  }

  return (
    <NativeBaseProvider >
      <View  fontStyles style={styles.stackStyles} s>
        <View style={{ marginLeft: 30, marginTop: 10}}>
        <ImageBackground
            blurRadius={0}
            source={require("../../assets/pngSplash.png")}
          >
          <Card style={styles.card}>
            <Card.Content>
              <Text fontSize="2xl" bold>
                {DayType}! {userName}
              </Text>
              <Text style={{ marginTop: 10 }} fontSize="md">
                Total Sample Count: {totSampleCount}
              </Text>
              <Text style={{ marginTop: 10 }} fontSize="md">
                Last Record Sample ID: {lastRecordId}
              </Text>
              <Text style={{ marginTop: 10 }} fontSize="md">
                Last Record Submited Date: {subDate}
              </Text>
              <Text style={{ marginTop: 10 }} fontSize="md">
                High priority samples: {hPriorityCount}
              </Text>
            </Card.Content>
            <Center>
            <Card.Actions
              style={{ marginRight: 60, marginLeft: 60, marginTop: 20 }}
            >
              <NativeBaseButton width="100"onPress={()=>navigation.navigate("User Profile")}>View Profile</NativeBaseButton>
              <NativeBaseButton width="100" colorScheme="danger">
                Logout
              </NativeBaseButton>
            </Card.Actions>
            </Center>
    
          </Card>
          </ImageBackground>
        </View>
        <Stack space={3} alignItems="center">
          <View style={styles.options}>
            <VStack>
              <View style={styles.firstRow}>
                <HStack alignItems="center">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Add Workout Plan")}
                  >
                    <Image
                      shadow={2}
                      source={require("../../assets/addWorkoutPlan.png")}
                      alt="Alternate Text"
                      size="sm"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Display Workout Plans")}
                  >
                    <Image
                      shadow={2}
                      source={require("../../assets/viewWorkoutPlan.png")}
                      alt="Alternate Text"
                      size="xl"
                    />
                  </TouchableOpacity>
                </HStack>
              </View>
              <View>
                <HStack>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("View other Data")}
                  >
                    <Image
                      shadow={2}
                      source={require("../../assets/viewOtherWorkoutPlan.png")}
                      alt="Alternate Text"
                      size="xl"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Display Percentages")}
                  >
                    <Image
                      source={require("../../assets/workoutStats.png")}
                      alt="Alternate Text"
                      size="xl"
                    />
                  </TouchableOpacity>
                </HStack>
              </View>
            </VStack>
          </View>
      
        </Stack>
        <Footer /> 
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card:{
    marginTop:20,
    backgroundColor: "rgba(178, 235, 250, 0.2)",
    borderRadius: 1,
    boxShadow: '0 4px 30px rgba(70, 200, 250, 0.15)',
  },
  stackStyles: {
    marginTop: 0,
    marginRight: 20,
    flex:1
  },
  fontStyles: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  firstRow: {
    marginBottom: 0,
    marginTop: 0,
  },
  options: {
    textAlign: "center",
    marginLeft: 30,
    marginTop: 50,
  },
});
