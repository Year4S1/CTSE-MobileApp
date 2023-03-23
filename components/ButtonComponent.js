import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native'
const ButtonComponent = ({ navigation }) => {
    return (
        <View>
            <Button
                 onPress={() => navigation.navigate("Test")}
                title="Click"
            />
        </View>
    );
};

export default ButtonComponent;