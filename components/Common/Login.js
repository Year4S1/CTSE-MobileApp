import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { firebase } from "../../Config";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        alert("loged in successfully!");

        const role = firebase.auth().currentUser?.photoURL;

        if (role === "trainer") {
          navigation.navigate("trainer Dashboard");
        } else if (role === "user") {
          navigation.navigate("user Dashboard");
        } else if (role === "donator") {
          navigation.navigate("donator Dashboard");
        } else {
          navigation.navigate("beneficiary Dashboard");
        }
      })

      .catch((error) => alert("invalid email or password!!"));
  };

  return (
    <NativeBaseProvider>
       
      <Center w="100%">
        <Box
          safeArea
          p="2"
          py="8"
          w="90%"
          maxW="290"
          style={{ marginVertical: 100 }}
        >
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome to My Fitness
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setEmail(val);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                onChangeText={(val) => {
                  setPassword(val);
                }}
                type="password"
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button onPress={handleLogin} mt="2">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                onPress={() => {
                  navigation.navigate("Registration");
                }}
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    
    </NativeBaseProvider>
  );
};

export default Login;
