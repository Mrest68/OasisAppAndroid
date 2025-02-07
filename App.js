import { Text, View, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { normalize } from "./components/Normalize";
import LandingPage from "./components/Landingpage";
import Home from "./app/Home";
import { Audio } from 'expo-av';
import {SafeAreaProvider} from 'react-native-safe-area-context';


export default function App() {
  const [pressed, setPressed] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: false,
  staysActiveInBackground: false,
        });
      } catch (error) {
        console.warn('Failed to set audio mode:', error);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='LandingPage'
          options={{ headerShown: false }}
          component={LandingPage}
        />
        <Stack.Screen
          name='home'
          options={{ headerShown: false }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
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
