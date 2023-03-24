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

const UserDashboard = () => {
  const image = {
    uri: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();

  const joinGym = () => {
    navigation.navigate("join gym");
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.greeting}>Hello {UserName}</Text>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
            onPress={joinGym}
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Join a Gym</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Join a Gym</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Join a Gym</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 50, marginTop: 10 }]}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#000000c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Join a Gym</Text>
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

export default UserDashboard;
