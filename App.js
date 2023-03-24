// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from './components/Test';
import ButtonComponent from './components/ButtonComponent';
import Login from './components/Common/Login';
import Registration from './components/Common/Registration';
import TrainerDashboard from './components/Trainer/TrainerDashboard';
import UserDashboard from './components/User/UserDashboard'
import AddWorkoutPlan from './components/Trainer/AddWorkoutPlan';
import DisplayWorkoutPlans from './components/Trainer/DisplayWorkoutPlans';
import UserProfile from './components/Common/UserProfile';
import DisplayOtherWorkoutPlans from './components/Trainer/DisplayOtherWorkoutPlans';
import JoinGym from './components/User/JoinGym'
import MyGym from './components/User/MyGymDetail'
import UpdateMyGym from './components/User/UpdateMyGymDetails'
import UpdateWorkoutPlan from './components/Trainer/UpdateWorkoutPlan';
import WorkoutStats from './components/Trainer/WorkoutStats';
import GymownerDashboard from './components/GymOwner/GymOwnerDashboard';
import AddGym from './components/GymOwner/AddGym';
import ViewGym from './components/GymOwner/ViewGym';
import AddMembershipPlan from './components/GymOwner/AddMembershipPlan';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Registration" component={Registration}/>
    <Stack.Screen name="Trainer Dashboard" component={TrainerDashboard}/>
    <Stack.Screen name="user Dashboard" component={UserDashboard}/>
    <Stack.Screen name="join gym" component={JoinGym}/>
    <Stack.Screen name="my gym details" component={MyGym}/>
    <Stack.Screen name="update gym details" component={UpdateMyGym}/>
    <Stack.Screen name="Add Workout Plan" component={AddWorkoutPlan}/>
    <Stack.Screen name="Display Workout Plans" component={DisplayWorkoutPlans}/>
    <Stack.Screen name="View other Workout Plans" component={DisplayOtherWorkoutPlans}/>
    <Stack.Screen name="User Profile" component={UserProfile}/>
    <Stack.Screen name="Button" component={ButtonComponent}/>
    <Stack.Screen name="Test" component={Test}/>
    <Stack.Screen name="Update Workout Plan" component={UpdateWorkoutPlan}/>
    <Stack.Screen name="Display Stats" component={WorkoutStats}/>

    <Stack.Screen name="Gym Owner Dashboard" component={GymownerDashboard}/>
    <Stack.Screen name="Add Gym" component={AddGym}/>
    <Stack.Screen name="View Gym" component={ViewGym}/>
    <Stack.Screen name="Add Membership Plan" component={AddMembershipPlan}/>

  
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
