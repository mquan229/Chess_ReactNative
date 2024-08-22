// src/navigation/AppNavigator.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Board from "../components/Board";
import { RootStackParamList, RootTabParamList } from "../navigators/navigation";
import Background from "../screen/Background";
import CreateRoom from "../screen/CreateRoom";
import ForgotPasswordScreen from "../screen/ForgotPass";
import GameScreen from "../screen/GameScreen";
import HomeScreen from "../screen/HomeScreen";
import ListRoom from "../screen/ListRoom";
import LoginScreen from "../screen/LoginScreen";
import ProfileScreen from "../screen/ProfileScreen";
import SettingsScreen from "../screen/SettingsScreen";
import SignupScreen from "../screen/SignupScreen";

// Khai báo loại navigator cho Bottom Tabs
const Tab = createBottomTabNavigator<RootTabParamList>();

// Navigator cho các màn hình có Bottom Tabs
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle : {height : '10%'}}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Room" component={ListRoom} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Background" component={Background} />
      <Tab.Screen name="Board" component={Board} />
    </Tab.Navigator>
  );
};


// Khai báo loại navigator cho Stack
const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="Create" component={CreateRoom} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

// Navigator chính của ứng dụng
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabsNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
