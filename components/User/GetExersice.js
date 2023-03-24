import { Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
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

function GetExersice() {
  const image = {
    uri: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80",
  };
  const navigation = useNavigation();
  const [muscle, setMuscle] = useState("biceps");
  const [isOpen, setIsOpen] = useState(true);
  const [exersices, setExersices] = useState([]);

  useEffect(()=>{
    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        method: "GET",
        headers: {
          "X-Api-Key": "hh7ieEBf/bzhoR1lv3Bw9A==pNdhYMaH0MGNiEx0",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
        });
},[])

  const getData = () => {
    
    setIsOpen(false);
   
  };
  return (
    <NativeBaseProvider>
      <View>
        <Center w="100%">
          {isOpen && (
            <>
              <FormControl>
                <Text style={styles.greeting}>
                  Serch exersices for the seleted muscle!
                </Text>
                <Select
                  shadow={2}
                  selectedValue={muscle}
                  minWidth="200"
                  accessibilityLabel="choose Role"
                  placeholder="Select you muscle"
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
                  onValueChange={(value) => setMuscle(value)}
                >
                  <Select.Item
                    shadow={2}
                    label="abdominals"
                    value="abdominals"
                  />
                  <Select.Item shadow={2} label="biceps" value="biceps" />
                  <Select.Item shadow={2} label="calves" value="calves" />
                  <Select.Item shadow={2} label="glutes" value="glutes" />
                  <Select.Item
                    shadow={2}
                    label="hamstrings"
                    value="hamstrings"
                  />
                  <Select.Item shadow={2} label="lats" value="lats" />
                  <Select.Item shadow={2} label="triceps" value="triceps" />
                </Select>
              </FormControl>
              <Button mt="2" onPress={getData}>
                Search
              </Button>
            </>
          )}
        </Center>
        {!isOpen && (
          <ScrollView>
            {exersices.map((exersice, index) => {
              <Card style={styles.card}>
                <Text style={{ fontSize: 22, color: "black", key: { index } }}>
                  Name : {exersice.Name}
                </Text>
                <Text style={{ fontSize: 22, color: "black", key: { index } }}>
                  Type : {exersice.type}
                </Text>
                <Text style={{ fontSize: 22, color: "black", key: { index } }}>
                  Equipment : {exersice.equipment}
                </Text>
                <Text style={{ fontSize: 22, color: "black", key: { index } }}>
                  Difficulty : {exersice.difficulty}
                </Text>
                <Text style={{ fontSize: 22, color: "black", key: { index } }}>
                  Instruction : {exersice.instructions}
                </Text>
              </Card>;
            })}
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 20,
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

export default GetExersice;
