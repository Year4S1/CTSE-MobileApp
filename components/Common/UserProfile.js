import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { firebase } from "../../Config";
import { Card, Text, Title } from "react-native-paper";
import { Button, Center, NativeBaseProvider } from "native-base";
import Footer from "./Footer";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleDelete=()=>{
    firebase.auth().currentUser.delete()
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection("RegistrationDetails")
      .where("UserID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
        const testResults = [];
        querySnapshot.forEach((documentSnapshot) => {
          testResults.push(documentSnapshot.data());
          setEmail(documentSnapshot.data().Email);
          setPhoneNumber(documentSnapshot.data().PhoneNumber);

          setCurrentRecordId((prevState) => [
            ...prevState,
            documentSnapshot.id,
          ]);
        });
      });
  }, []);

  const UserName = firebase.auth().currentUser.displayName;
  const role = firebase.auth().currentUser.photoURL;

  return (
    <NativeBaseProvider>
      <View>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={15}
            source={require("../../assets/user.png")}
          >
            <View style={styles.headerColumn}>
              <Image
                style={styles.userImage}
                source={require("../../assets/user.png")}
              />
              <Text style={styles.userNameText}>{UserName}</Text>
              <View style={styles.userAddressRow}>
                <View>
                  {/* <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                //   onPress={this.onPressPlace}
                /> */}
                </View>
                <View style={styles.userCityRow}>
                  <Text style={styles.userRoleText}>{role}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={{ marginVertical: 50, marginLeft: 20, marginRight: 20 }}>
          <Card style={{ borderRadius: 30, paddingTop: 10 }}>
            <Card.Content>
              <Text style={{ marginVertical: 10, fontSize: 18 }} fontSize="md">
                User Name :{UserName}
              </Text>
              <Text style={{ marginVertical: 10, fontSize: 18 }} fontSize="md">
                Email :{email}
              </Text>
              <Text style={{ marginVertical: 10, fontSize: 18 }} fontSize="md">
                Role :{role}
              </Text>
              <Text style={{ marginVertical: 10, fontSize: 18 }} fontSize="md">
                Phone Number :{phoneNumber}
              </Text>
            </Card.Content>
            <Center>
              <Card.Actions
                style={{
                  marginRight: 60,
                  marginLeft: 60,
                  marginTop: 20,
                  paddingBottom: 50,
                }}
              >
                <Button onPress={
                  handleDelete
                } colorScheme="danger">Delete Profile</Button>
              </Card.Actions>
            </Center>
          </Card>
        </View>
      </View>
      <Footer />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userRoleText: {
    color: "#fff",
    fontSize: 25,

    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
    
  },
});

export default UserProfile;
