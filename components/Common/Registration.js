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
import { firebase } from "../../Config";
import { useState } from "react";
const Registration = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegistration =async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
          res.user.updateProfile({
              displayName:userName,
              photoURL:role
          })

          firebase
          .firestore()
          .collection("RegistrationDetails")
          .add({
            UserID:firebase.auth().currentUser.uid,
            UserName: userName,
            Email: email,
            Password: password,
            Role: role,
            PhoneNumber:phoneNumber      
          })
          .then(() => {
            console.log("added to regitration details")
          });

       alert("signed in succsesfully!");
       navigation.navigate("Login")
      
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
         alert("That email address is invalid!");
        }

      });
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box
          safeArea
          p="2"
          w="90%"
          maxW="290"
          py="8"
          style={{ marginTop: 50 }}
        >
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome to My Fitness
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>User Name</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setUserName(val);
                }}
                placeholder="User Name"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Role</FormControl.Label>
              <Select
                shadow={2}
                selectedValue={role}
                minWidth="200"
                accessibilityLabel="choose Role"
                placeholder="Role"
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
                onValueChange={(value) => setRole(value)}
              >
                <Select.Item shadow={2} label="Trainer" value="trainer" />
                <Select.Item shadow={2} label="User" value="user" />
                <Select.Item shadow={2} label="Gym Owner" value="gymowner" />
                <Select.Item shadow={2} label="Nutritionist" value="nutritionist" />
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setEmail(val);
                }}
                placeholder="Email"
              />
            </FormControl>
            <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setPhoneNumber(val);
                }}
                placeholder="Phone Number"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setPassword(val);
                }}
                placeholder="Password"
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input placeholder="Confirm Password" type="password" />
            </FormControl>
            <Button mt="2" onPress={handleRegistration}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Registration;
