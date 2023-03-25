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
import image from "../../assets/displayPlansBlackandWhite.jpg"
export default function TrainerDashboard({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [highIntensityCount, setHIntensityCount] = useState(0);
  const [mediumIntensityCount, setMIntensityCount] = useState(0);
  const [lowIntensityCount, setLIntensityCount] = useState(0);
  const [totWorkoutCount, setTotWorkoutCount] = useState(0);
  const isFocused=useIsFocused()
  useEffect(() => {
 
    const UserName = firebase.auth().currentUser.displayName;
    console.log("userName", UserName);
    setUserName(UserName);
    const UserId = firebase.auth().currentUser.uid;
    console.log("id",firebase.auth().currentUser.uid);
    setUserId(UserId);

    let hIntensityCount = 0;
    let mIntensityCount = 0;
    let lIntensityCount = 0;
    firebase
      .firestore()
      .collection("WorkoutPlans")
      .where("UserID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        setTotWorkoutCount(querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().Intensity === "high") {
            ++hIntensityCount;
            setHIntensityCount(hIntensityCount);
          }
          else if (documentSnapshot.data().Intensity === "medium") {
            ++mIntensityCount;
            setMIntensityCount(mIntensityCount);
          }
          else if (documentSnapshot.data().Intensity === "low") {
            ++lIntensityCount;
            setLIntensityCount(lIntensityCount);
          }
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
  <ImageBackground source={image} style={{flex:1}}>
      <View  fontStyles >
        <View style={{ marginTop: 10}}>
        
          <Card style={styles.card}>
            <Card.Content>
              <Text style={{color:"white"}} fontSize="2xl" bold>
                {DayType}! {userName}
              </Text>
              <Text style={{ marginTop: 10,color:"white",fontWeight:"bold" }} fontSize="md">
                Total Workouts Added: {totWorkoutCount}
              </Text>
              <Text style={{ marginTop: 10,color:"white",fontWeight:"bold" }} fontSize="md">
                High Intensity Workouts: {highIntensityCount}
              </Text>
              <Text style={{ marginTop: 10,color:"white",fontWeight:"bold" }} fontSize="md">
              Medium Intensity Workouts: {mediumIntensityCount}
              </Text>
              <Text style={{ marginTop: 10,color:"white",fontWeight:"bold" }} fontSize="md">
              Low Intensity Workouts: {lowIntensityCount}
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
                    onPress={() => navigation.navigate("View other Workout Plans")}
                  >
                    <Image
                      shadow={2}
                      source={require("../../assets/viewOtherWorkoutPlan.png")}
                      alt="Alternate Text"
                      size="xl"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Display Stats")}
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
      </ImageBackground>
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
    backgroundColor: "rgba(255, 99, 102, 0.1)",
    // borderRadius: 10,
    marginRight:10,
    marginLeft:10,
    // boxShadow: '0 4px 30px rgba(70, 200, 250, 0.15)',
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
