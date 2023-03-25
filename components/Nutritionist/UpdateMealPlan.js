import {
    Box,
    Checkbox,
    CheckIcon,
    FormControl,
    Input,
    NativeBaseProvider,
    Select,
    Stack,
    WarningOutlineIcon,
    Button as NativeBaseButton,
  } from "native-base";
  import React, { useEffect, useState } from "react";
  import {
    Button,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
  } from "react-native";
  import { firebase } from "../../Config";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import Footer from "../Common/Footer";
  
  
  
  const UpdateMealPlan = ({ route, navigation }) => {
  const { currentRecordId } = route.params;
  const [date, setDate] = useState(new Date());
  const [mealPlanData, setMealPlanData] = useState([]);
  const [workoutPlanId, setWorkoutId] = useState("");
  
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [mealType, setMealType] = useState([]);
  const [dishName, setDishName] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [servingSize, setServingSize] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [timeToPrepare, setTimeToPrepare] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (subDate) => {
    const formatDate = new Date(subDate);

    setDate(formatDate.toLocaleDateString());

    hideDatePicker();
  };

  useEffect(() => {
    const UserName = firebase.auth().currentUser.displayName;
    console.log("userName", UserName);
    setUserName(UserName);
    const UserId = firebase.auth().currentUser.uid;
    setUserId(UserId);
  }, []);

  const updateMeal = () => {

    firebase
      .firestore()
      .collection("MealLists")
      .doc(currentRecordId)
      .update({
        Creater: userName,
        MealType: mealType,
        DishName:dishName,
        Ingredients:ingredients,
        ServingSize: servingSize,
        DietaryRestrictions: dietaryRestrictions,
        TimeToPrepare: timeToPrepare,
        TimeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Meal Plan Updated!");
        navigation.navigate("Nutritionist Dashboard");
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("MealLists")
      .doc(currentRecordId)
      .get()
      .then((documentSnapshot) => setMealPlanData(documentSnapshot.data()));
  }, []);
  return (
    <NativeBaseProvider>
      <>
        <View style={{ marginVertical: 30 }}>
          <Box w="100%">
            <FormControl>
              <Stack mx="8">
                <FormControl.Label>Dish Name</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setDishName(val);
                  }}
                  type="text"
                  placeholder={mealPlanData.DishName}
                />
                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Meal Type</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={mealType}
                    minWidth="200"
                    accessibilityLabel="choose type"
                    placeholder={mealPlanData.MealType}
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setMealType(value)}
                  >
                    <Select.Item
                      shadow={2}
                      label="Breakfast"
                      value="Breakfast"
                    />
                    <Select.Item
                      shadow={2}
                      label="Lunch"
                      value="Lunch"
                    />
                    <Select.Item
                      shadow={2}
                      label="Dinner"
                      value="Dinner"
                    />
                    <Select.Item
                      shadow={2}
                      label="Snacks"
                      value="Snacks"
                    />
                  </Select>
                </View>
                <FormControl.Label>Ingredients</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setIngredients(val);
                  }}
                  type="text"
                  placeholder={mealPlanData.Ingredients}
                />
                <View>
                  <FormControl.Label>Dietary Restrictions</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={dietaryRestrictions}
                    minWidth="200"
                    accessibilityLabel="choose dietry restriction"
                    placeholder={mealPlanData.DietaryRestrictions}
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setDietaryRestrictions(value)}
                  >
                    <Select.Item shadow={2} label="vegetarian" value="vegetarian" />
                    <Select.Item shadow={2} label="vegan" value="vegan" />
                    <Select.Item shadow={2} label="gluten-free" value="gluten-free" />
                    <Select.Item shadow={2} label="dairy-free" value="dairy-free" />
                  </Select>
                </View>
                <FormControl.Label>Serving Size</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setServingSize(val);
                  }}
                  type="number"
                  placeholder={mealPlanData.ServingSize}
                />
                <FormControl.Label>Time to Prepare</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setTimeToPrepare(val);
                  }}
                  type="text"
                  placeholder={mealPlanData.TimeToPrepare}
                />

                <NativeBaseButton
                  style={{ marginVertical: 40 }}
                  onPress={updateMeal}
                >
                  Update Meal Plan
                </NativeBaseButton>
              </Stack>
            </FormControl>
          </Box>
        </View>
      </><Footer />
    </NativeBaseProvider>
  );
  
  };
  
  const styles = StyleSheet.create({
    select: {
      marginTop: "10px",
    },
  });

  export default UpdateMealPlan;
  