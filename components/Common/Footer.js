import { Box, Center, HStack, Icon, NativeBaseProvider, Pressable, Text, View } from 'native-base';
import React, { useState } from 'react';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {firebase} from "../../Config"

const Footer = () => {
  const navigation = useNavigation();
    const [selected, setSelected] = useState(1);
    const role=firebase.auth().currentUser?.photoURL;

    return (
        
          <NativeBaseProvider>
              <View style={{marginVertical:40,bottom:0}}>
                <Center>
      <Box flex={1}  safeAreaTop width="100%" maxW="300px" alignSelf="center">
        
        <HStack alignItems="center" safeAreaBottom shadow={6}>
      
        <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
            <Center>
              <TouchableOpacity onPress={() => navigation.navigate("User Profile")} >
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="black" size="4xl" />
              </TouchableOpacity>
              <Text color="black" fontSize="12">
                Account
              </Text>
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
            <Center>
              <TouchableOpacity  onPress={() => navigation.navigate(`${role} Dashboard`)}>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="black" size="4xl"></Icon>
              </TouchableOpacity>
              <Text color="black" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
            <Center>
              <TouchableOpacity  onPress={() => navigation.navigate("User Profile")}>

              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'menu' : "menu"} />} color="black" size="4xl"></Icon>
              </TouchableOpacity>
              <Text color="black" fontSize="12">
                Cart
              </Text>
            </Center>
          </Pressable>
     
        </HStack>
      </Box>
      </Center>
      </View>
    </NativeBaseProvider>
       
    );
};

export default Footer;