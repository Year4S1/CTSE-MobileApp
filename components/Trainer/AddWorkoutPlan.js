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

const AddWorkoutPlan = () => {

  

  const [date, setDate] = useState("");
  const [testId, setTestId] = useState("");
  const [testType, setTestType] = useState("");
  const [province, setProvince] = useState("");
  const [priority, setPriority] = useState("");
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
    console.log(testId, testType, province, visibility);

    firebase
      .firestore()
      .collection("TestResults")
      .add({
        UserName: userName,
        UserID: userId,
        TestID: testId,
        TestType: testType,
        SubDate: date,
        Province: province,
        Priority: priority,
        visibility: visibility,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Results Added!");
      });
  };
  return (
    <NativeBaseProvider >

        <View style={{ marginVertical: 30 }}>
       
          <Box w="100%">
            <FormControl>
              <Stack mx="8">
                <FormControl.Label>Test ID</FormControl.Label>
                <Input
                  onChangeText={(val) => {
                    setTestId(val);
                  }}
                  type="text"
                  placeholder="Please enter the Test ID"
                />
                <View style={{ marginVertical: 10 }}>
                  <FormControl.Label>Test Sample Type</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={testType}
                    minWidth="200"
                    accessibilityLabel="choose type"
                    placeholder="please choose Test Type"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setTestType(value)}
                  >
                    <Select.Item
                      shadow={2}
                      label="Heavy Metal Test"
                      value="heavyMetal"
                    />
                    <Select.Item
                      shadow={2}
                      label="Microrganisms Test"
                      value="microTest"
                    />
                    <Select.Item
                      shadow={2}
                      label="Chemical Test"
                      value="chemTest"
                    />
                  </Select>
                </View>

                <View>
                  <FormControl.Label>Povince</FormControl.Label>
                  <Select
                    shadow={2}
                    selectedValue={province}
                    minWidth="200"
                    accessibilityLabel="choose Province"
                    placeholder="please choose Province"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={(value) => setProvince(value)}
                  >
                    <Select.Item shadow={2} label="central" value="central" />
                    <Select.Item
                      shadow={2}
                      label="NorthCentral"
                      value="North central"
                    />
                    <Select.Item
                      shadow={2}
                      label="NorthWestern"
                      value="North Western"
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
                  <FormControl.Label>Priority</FormControl.Label>
                </View>
                <Select
                  shadow={2}
                  selectedValue={priority}
                  minWidth="200"
                  accessibilityLabel="choose Priority"
                  placeholder="please choose Priority"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={(value) => setPriority(value)}
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
                  style={{ marginVertical: 35 }}
                  onPress={addTestResults}
                >
                  Add Test Data
                </NativeBaseButton>
              </Stack>
            </FormControl>
          </Box>

        </View>
     
        <View><Footer /></View>
 
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  select: {
    marginTop: "10px",
  },
});

export default AddWorkoutPlan;
