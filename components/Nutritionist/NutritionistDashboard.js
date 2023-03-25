import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../Config";
import { useNavigation } from "@react-navigation/native";

const NutritionistDashboard = () => {
  const image = {
    uri: "https://images.unsplash.com/photo-1587996616596-b714c1c54146?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();

  const createMealPlan = () => {
    navigation.navigate("Create Meal Plan");
  };

  const viewMealPlan = () =>{
    navigation.navigate("My Meal Plans")
  }

  const nutritionFacts =() =>{
    navigation.navigate("Nutrition Facts")
  }

  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.greeting}>Hello {UserName}</Text>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
            onPress={createMealPlan}
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Create Meal Plan</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
          onPress={viewMealPlan}
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>View Meal Plans</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
          onPress={nutritionFacts}
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Find Nutrition Values</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: -150,
    marginBottom: 200,
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

export default NutritionistDashboard;
