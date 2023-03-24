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



const UpdateWorkoutPlan = ({ route, navigation }) => {
  const { currentRecordId } = route.params;
  const [date, setDate] = useState(new Date());
  const [workoutPlanData, setWorkoutPlanData] = useState([]);
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

  const updateWorkoutPlan = () => {
    console.log("hi q");

    firebase
      .firestore()
      .collection("WorkoutPlans")
      .doc(currentRecordId)
      .update({
        UserName: userName,
        UserID: userId,
        WorkoutPlanId: workoutPlanId,
        BodyType: bodyType,
        SubDate: date,
        Intensity: intensity,
        WorkoutSchedule:workoutSchedule,
        WorkoutType: workoutType,
        visibility: visibility,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("Workout Plan Updated!");
        navigation.navigate("trainer Dashboard");
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("WorkoutPlans")
      .doc(currentRecordId)
      .get()
      .then((documentSnapshot) => setWorkoutPlanData(documentSnapshot.data()));
  }, []);
  return (
    <NativeBaseProvider>
      <>
        <View style={{ marginVertical: 30 }}>
          <Box w="100%">
            <FormControl>
              <Stack mx="8">
                <FormControl.Label>Workout Plan ID</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setWorkoutId(val);
                  }}
                  type="text"
                  placeholder={workoutPlanData.WorkoutPlanId}
                />
                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Workout Type</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={workoutType}
                    minWidth="200"
                    accessibilityLabel="choose type"
                    placeholder={workoutPlanData.WorkoutType}
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
                  <FormControl.Label>Intensity</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={intensity}
                    minWidth="200"
                    accessibilityLabel="choose Intensity"
                    placeholder={workoutPlanData.Intensity}
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
                </View>

                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Date of Submitting</FormControl.Label>
                  <Input
                    onPressIn={() => {
                      showDatePicker();
                    }}
                    type="text"
                    placeholder={workoutPlanData.SubDate}
                    value={date}
                  />
                </View>
                <View>
                  <FormControl.Label>Body Type</FormControl.Label>
                </View>
                <Select
                  shadow={2}
                  selectedValue={bodyType}
                  minWidth="200"
                  accessibilityLabel="choose Body Type"
                  placeholder={workoutPlanData.BodyType}
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
                <TextArea  onChangeText={(val) => {
                    setWorkoutSchedule(val);
                  }} h={20}  placeholder={workoutPlanData?.WorkoutSchedule} w="100%" maxW="500"  />
                </View>

                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Test record visibility</FormControl.Label>
                  <Checkbox
                    onChange={setVisibility}
                    value={visibility}
                    colorScheme="green"
                  >
                    Visibility
                  </Checkbox>
                </View>
                <NativeBaseButton
                  style={{ marginVertical: 40 }}
                  onPress={updateWorkoutPlan}
                >
                  Update Workout Plan
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

export default UpdateWorkoutPlan;
