// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from './components/Test';
import ButtonComponent from './components/ButtonComponent';
import Login from './components/Common/Login';
import Registration from './components/Common/Registration';
import TrainerDashboard from './components/Trainer/TrainerDashboard';
import AddWorkoutPlan from './components/Trainer/AddWorkoutPlan';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Registration" component={Registration}/>
    <Stack.Screen name="trainer Dashboard" component={TrainerDashboard}/>
    <Stack.Screen name="Add Workout Plan" component={AddWorkoutPlan}/>
    <Stack.Screen name="Button" component={ButtonComponent}/>
    <Stack.Screen name="Test" component={Test}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
