import {
  API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID,
  STORAGE_BUCKET
} from "@env";
import { getApps, initializeApp } from "@firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import * as React from 'react';
import { useEffect } from "react";
import { RootStackParamList } from "./src/configs/Application";
import { FirebaseConfig } from "./src/configs/FirebaseConfig";
import AccountManager from "./src/lib/managers/AccountManager";
import CreateNoteScreen from "./src/screens/createNote/CreateNoteScreen";
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
const defaultApp = initializeApp(firebaseConfig.toJSON());
export const db = getFirestore(defaultApp);

if(getApps().length === 0) {
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
          <Stack.Screen name="CreateNote" component={CreateNoteScreen} options={defaultStackNavigationOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}