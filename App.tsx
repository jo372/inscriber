import {
  API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID,
  STORAGE_BUCKET
} from "@env";
import { getApps, initializeApp } from "@firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import * as React from 'react';
import { useEffect } from "react";
import { RootStackParamList } from "./src/configs/Application";
import { FirebaseConfig } from "./src/configs/FirebaseConfig";
import DatabaseHelper from "./src/lib/handlers/DatabaseHandler";
import AccountManager from "./src/lib/managers/AccountManager";
import FirstTimeSetupScreen from "./src/screens/firstTimeSetup/FirstTimeSetupScreen";
import ForgotPasswordScreen from "./src/screens/forgotPassword/ForgotPasswordScreen";
import HomeScreen from "./src/screens/home/Home";
import LoginScreen from "./src/screens/login/LoginScreen";
import SignUpScreen from "./src/screens/signup/SignUpScreen";

const firebaseConfig: FirebaseConfig = new FirebaseConfig({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
});

const Stack = createStackNavigator<RootStackParamList>();

if(getApps().length === 0) {
  const defaultApp = initializeApp(firebaseConfig.toJSON());
  initializeAuth(defaultApp, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
}

const defaultStackNavigationOptions : StackNavigationOptions = {
  title: ""
}

export default function App() {
  
  const [initialRouteName, setInitialRouteName] = React.useState<keyof RootStackParamList>("FirstTimeSetup");
 
  useEffect(() => {
    const db = DatabaseHelper.getInstance();
    
    db.setupDatabase();
  
    AccountManager.handleAuthStateChanged({
      hasSession: () => {
        setInitialRouteName("Home");
      }
    })
  }, []);
 
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen name="FirstTimeSetup" component={FirstTimeSetupScreen} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={defaultStackNavigationOptions}/>
          <Stack.Screen name="Register" component={SignUpScreen} options={defaultStackNavigationOptions}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={defaultStackNavigationOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}