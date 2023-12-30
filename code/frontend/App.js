import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { useState, useEffect } from 'react';
import LaunchScreen from './screens/OnBoarding/LaunchScreen';
import SignInScreen from './screens/OnBoarding/SignInScreen';
import SignUpScreen from './screens/OnBoarding/SignUpScreen';
import Main from './screens/Main/Main';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from './screens/Profile/Profile';
import Recommendation from './screens/Recommendation/Recommendation';
import * as React from "react";
import * as Font from "expo-font";
// import mainFont from "./assets/Fonts";

export default function App() {
  // Disable all warnings
  LogBox.ignoreAllLogs();

  const [isLoaded, setIsLoaded] = useState(false);

  // Wait until the font is loaded.
  useEffect(() => {
    (async () => {await Font.loadAsync({
      "font-Regular": require('./assets/Fonts/Pretendard-Regular.otf'),
      "font-Medium": require('./assets/Fonts/Pretendard-Medium.otf'),
      "font-Light": require('./assets/Fonts/Pretendard-Light.otf'),
      "font-Bold": require('./assets/Fonts/Pretendard-Bold.otf'),
      "font-SemiBold": require('./assets/Fonts/Pretendard-SemiBold.otf'),
      "font-ExtraBold": require('./assets/Fonts/Pretendard-ExtraBold.otf'),
    })
    setIsLoaded(true);
    }
    )(); 
  }, []);

  const Stack = createStackNavigator();

  if(isLoaded){
    return (
      // for changing pages
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LaunchScreen" screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={Main} screenOptions={{gestureEnabled: false}} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
