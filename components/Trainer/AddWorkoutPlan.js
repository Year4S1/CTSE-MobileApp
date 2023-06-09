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
  TextArea,
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
import { Linking } from "react-native";

const AddWorkoutPlan = () => {

  const [date, setDate] = useState("");
  const [workoutPlanId, setWorkoutId] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [visibility, setVisibility] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [workoutSchedule, setWorkoutSchedule] = useState("");
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
        WorkoutType: workoutType,
        BodyType: bodyType,
        SubDate: date,
        Intensity: intensity,
        WorkoutSchedule: workoutSchedule,
        visibility: visibility,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Workout Plan Added!");
      });
    sendMail()
  };


  return (
    <NativeBaseProvider >
      {/* <ImageBackground source={image} resizeMode="cover"> */}
      <View style={{ marginVertical: 30 }}>

        <Box w="100%">
          <FormControl>
            <Stack mx="8">
              <Text style={tw`font-black mb-3`}>Workout Plan ID</Text>
              <Input
                onChangeText={(val) => {
                  setWorkoutId(val);
                }}
                type="text"
                placeholder="Please enter the Test ID"
              />
              <View style={{ marginVertical: 10 }}>
                <Text style={tw`font-black mb-3 `} >Workout Type</Text>
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
                <Text style={tw`font-black mb-3`}>Body Type</Text>
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
                <Text style={tw`font-black mb-3`} >Date of Submitting</Text>
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
                <Text style={tw`font-black mb-3`} >Workout Intensity</Text>
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
                <Text style={tw`font-black mb-3`} >Workout plan Schedule</Text>
                <TextArea onChangeText={(val) => {
                  setWorkoutSchedule(val);
                }} h={20} placeholder="Please enter the Workout plan Schedule" w="100%" maxW="500" />
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={tw`font-black mb-3`} >Workout plan visibility</Text>
                <Checkbox
                  onChange={setVisibility}
                  value={visibility}
                  colorScheme="green"
                >
                  Visibility
                </Checkbox>
              </View>
              <NativeBaseButton
                style={{ marginVertical: 15 }}
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
