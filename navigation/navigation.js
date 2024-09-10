import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenForCreatingBlog from "../screens/ScreenForCreatingBlog.js";
import SplashScreen from "../screens/SplashScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import BlogDetailScreen from "../screens/BlogDetailScreen.js";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function navigation() {
  return (
    // <NavigationContainer>
    <NavigationContainer independent={true} theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="BlogEditingScreen"
          component={ScreenForCreatingBlog}
        />
        <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />
      </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
