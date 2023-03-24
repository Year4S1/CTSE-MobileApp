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
import React, { useMemo, useState } from "react";
import { Button, Image, ImageBackground, Platform, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "../../Config";
import { useEffect } from "react";
import Footer from "../Common/Footer";
import image from "../../assets/lowOpWorkoutBack.png"
import tw from 'twrnc';

const AddWorkoutPlan = () => {

  const [date, setDate] = useState("");
  const [workoutPlanId, setWorkoutId] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [visibility, setVisibility] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const addTestResults = () => {
    

    firebase
      .firestore()
      .collection("WorkoutPlans")
      .add({
        UserName: userName,
        UserID: userId,
        WorkoutPlanId: workoutPlanId,
        WorkoutType:workoutType,
        BodyType: bodyType,
        SubDate: date,
        Intensity: intensity,
        visibility: visibility,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Workout Plan Added!");
      });
  };
  return (
    <NativeBaseProvider >
  {/* <ImageBackground source={image} resizeMode="cover"> */}
        <View style={{ marginVertical: 30 }}>
       
          <Box w="100%">
            <FormControl>
              <Stack mx="8">
                <FormControl.Label style={{fontWeight:"bold"}}>Workout Plan ID</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setWorkoutId(val);
                  }}
                  type="text"
                  placeholder="Please enter the Test ID"
                />
                <View style={{ marginVertical: 10 }}>
                  <Text style={tw`font-black `} >Workout Type</Text>
                  <Select
                    shadow={2}
                    selectedValue={workoutType}
                    minWidth="200"
                    accessibilityLabel="Choose Workout Type"
                    placeholder="please choose Workout Type"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setWorkoutType(value)}
                  >
                    <Select.Item
                      shadow={2}
                      label="Chest"
                      value="chest"
                    />
                    <Select.Item
                      shadow={2}
                      label="Legs"
                      value="legs"
                    />
                    <Select.Item
                      shadow={2}
                      label="Shoulders"
                      value="shoulders"
                    />
                     <Select.Item
                      shadow={2}
                      label="Triceps"
                      value="triceps"
                    />
                  </Select>
                </View>

                <View>
                  <Text style={tw`font-black`}>Body Type</Text>
                  <Select
                    shadow={2}
                    selectedValue={bodyType}
                    minWidth="200"
                    accessibilityLabel="choose Body Type"
                    placeholder="please choose Body Type"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setBodyType(value)}
                  >
                    <Select.Item
                      shadow={2}
                      label="Skinny"
                      value="skinny"
                    />
                    <Select.Item
                      shadow={2}
                      label="Average"
                      value="Average"
                    />
                       <Select.Item
                      shadow={2}
                      label="Fat"
                      value="fat"
                    />
                  </Select>
                </View>

                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Date of Submitting</FormControl.Label>
                  <Input
                    onPressIn={() => {
                      showDatePicker();
                    }}
                    type="text"
                    placeholder="Please enter the date"
                    value={date}
                  />
                </View>
                <View>
                  <FormControl.Label>Intensity</FormControl.Label>
                </View>
                <Select
                  shadow={2}
                  selectedValue={intensity}
                  minWidth="200"
                  accessibilityLabel="choose Intensity"
                  placeholder="please choose Intensity"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={(value) => setIntensity(value)}
                >
                  <Select.Item shadow={2} label="High" value="high" />
                  <Select.Item shadow={2} label="Medium" value="medium" />
                  <Select.Item shadow={2} label="Low" value="low" />
                </Select>
                <View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>

                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Workout plan visibility</FormControl.Label>
                  <Checkbox
                    onChange={setVisibility}
                    value={visibility}
                    colorScheme="green"
                  >
                    Visibility
                  </Checkbox>
                </View>
                <NativeBaseButton
                  style={{ marginVertical: 35 }}
                  onPress={addTestResults}
                >
                  Add Workout Plan
                </NativeBaseButton>
              </Stack>
            </FormControl>
          </Box>

        </View>
     
        <View><Footer /></View>
        {/* </ImageBackground> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  select: {
    marginTop: "10px",
  },
});

export default AddWorkoutPlan;
