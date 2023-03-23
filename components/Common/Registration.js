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
                <Select.Item shadow={2} label="CEO" value="ceo" />
                <Select.Item shadow={2} label="Tester" value="tester" />
                <Select.Item shadow={2} label="Beneficiary" value="beneficiary" />
                <Select.Item shadow={2} label="Donator" value="donator" />
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
