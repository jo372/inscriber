import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from "react-native-paper";
import { FormBuilder } from 'react-native-paper-form-builder';
import Application, { RootStackParamList } from '../../configs/Application';
import Logger from '../../lib/handlers/Logger';
import AccountManager, { AccountLoginCredentials } from '../../lib/managers/AccountManager';
import GlobalTheme from '../../utils/themes/GlobalTheme';
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen(props: LoginScreenProps) {

  const { navigation } = props;
  
  const redirectToHome = React.useCallback(() => {
    navigation.navigate('Home');
  }, []);
  
  const redirectToRegister = React.useCallback(() => {
    navigation.push("Register");
  }, []);

  const redirectToForgotPassword = React.useCallback(() => {
    navigation.push("ForgotPassword");
  }, []);
  
  React.useEffect(() => {
    AccountManager.hasSession(redirectToHome);
  }, []);
  
  const { text, textCentered, link, button, image, heading, contentContainer } = GlobalTheme;
  
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <PaperProvider theme={Application.Themes.PaperNativeTheme}>
      <ScrollView contentContainerStyle={GlobalTheme.scrollViewStyle}>
      <View style={contentContainer}>
          <Text style={heading}>Login</Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: "email",
                name: "email",
                rules: {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                },
                textInputProps: {
                  label: "Email",
                  autoComplete: true,
                },
              },
              {
                type: "password",
                name: "password",
                rules: {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                },
                textInputProps: {
                  label: "Password",
                  autoComplete: true,
                },
              }
            ]}
          />
          <Button
            mode={"contained"}
            style={button}
            onPress={handleSubmit((data: AccountLoginCredentials) => {
              Logger.log("form data", data);
              
              AccountManager.loginWithEmailAndPassword({
                email: data.email,
                password: data.password,
                onSuccess: redirectToHome,
                onError: (error) => {
                  Logger.logError(error.message);
                  alert(error.message);
                }
              });
            })}
          >
            Submit
          </Button>
          <Text style={[text, textCentered]}>
            Need an have account? Register {""}
            <Text style={link} onPress={redirectToRegister}>
              here
            </Text>
          </Text>
          <Text style={[text, textCentered, link]}  onPress={redirectToForgotPassword}>
            Forgot Password?
          </Text>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
