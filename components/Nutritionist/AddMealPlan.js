import React, { useEffect, useState } from "react";
import { Card, Title } from "react-native-paper";
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
import { useNavigation } from "@react-navigation/native";

function AddMealPlan() {
  const image = {
    uri: "https://images.unsplash.com/photo-1569420077790-afb136b3bb8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  };
  const UserName = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();

  const [mealType, setMealType] = useState([]);
  const [dishName, setDishName] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [servingSize, setServingSize] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [timeToPrepare, setTimeToPrepare] = useState("");

  

  const createDetails = () =>{
    firebase
      .firestore()
      .collection("MealLists")
      .add({
        Creater: UserName,
        MealType: mealType,
        DishName:dishName,
        Ingredients:ingredients,
        ServingSize: servingSize,
        DietaryRestrictions: dietaryRestrictions,
        TimeToPrepare: timeToPrepare,
        TimeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Meal Plan Added!");
        navigation.navigate("Nutritionist Dashboard")
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
                  Select Meal Details to Create a Meal
                </Heading>
                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>Dish Nane</FormControl.Label>
                    <Input
                      onChangeText={(val) => {
                        setDishName(val);
                       }}
                      placeholder="Dish Name"
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Meal Type</FormControl.Label>
                    <Select
                      shadow={2}
                      selectedValue={mealType}
                      minWidth="200"
                      accessibilityLabel="choose Role"
                      placeholder="Select Meal Type"
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
                      onValueChange={(value) => setMealType(value)}
                    >
                      <Select.Item shadow={2} label="Breakfast" value="Breakfast" />
                      <Select.Item shadow={2} label="Lunch" value="Lunch" />
                      <Select.Item shadow={2} label="Dinner" value="Dinner" />
                      <Select.Item shadow={2} label="Snacks" value="Snacks" />
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Ingredients</FormControl.Label>
                    <Input
                      onChangeText={(val) => {
                        setIngredients(val);
                       }}
                      placeholder="Ingredients"
                    />
                  </FormControl>
                  {/* <FormControl>
                    <FormControl.Label>Serving Size</FormControl.Label>
                    <Input
                      onChangeText={(val) => {
                        setServingSize(val);
                       }}
                      placeholder="Serving Size"
                    />
                  </FormControl> */}
                  <FormControl>
                    <FormControl.Label>Dietary Restrictions</FormControl.Label>
                    <Select
                      shadow={2}
                      selectedValue={dietaryRestrictions}
                      minWidth="200"
                      accessibilityLabel="choose Role"
                      placeholder="Select the Dietry Restriction"
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
                      onValueChange={(value) => setDietaryRestrictions(value)}
                    >
                      <Select.Item shadow={2} label="vegetarian" value="vegetarian" />
                      <Select.Item shadow={2} label="vegan" value="vegan" />
                      <Select.Item shadow={2} label="gluten-free" value="gluten-free" />
                      <Select.Item shadow={2} label="dairy-free" value="dairy-free" />
                    </Select>
                  </FormControl>
                  
                  {/* <FormControl>
                    <FormControl.Label>Time to Prepare</FormControl.Label>
                    <Input
                      onChangeText={(val) => {
                        setTimeToPrepare(val);
                       }}
                      placeholder="Time to Preapare"
                    />
                  </FormControl> */}
                  <Button mt="2" onPress={createDetails}>Create</Button>
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

export default AddMealPlan;
