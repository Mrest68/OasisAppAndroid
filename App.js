import { Text, View, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { normalize } from "./components/Normalize";
import LandingPage from "./components/Landingpage";
import Home from "./app/Home";

export default function App() {

  const [pressed, setPressed] = useState(false);
  const changeColorButton = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LandingPage' options={{headerShown:false}} component={LandingPage}
        />
        <Stack.Screen name='home' options={{headerShown:false}} component={Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(100),
  },
  OasisLogo: {
    height: normalize(200, "height"),
    width: normalize(200),
    marginBottom: normalize(50, "height"),
  },
  GetStarted: {
    fontSize: normalize(15),
    color: 'white',
  },
  GSButton: {
    backgroundColor: 'black',
    width: normalize(200),
    paddingVertical: normalize(20, 'height'),
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  GSButtonPressed: {
    backgroundColor: 'blue',
  },
});
