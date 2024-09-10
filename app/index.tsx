import React from "react";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from '../navigation/navigation.js'; // Import the navigator component

export default function Index() {
  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
          <AppNavigator />
    </GestureHandlerRootView>
  );
}
