import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import Application, { RootStackParamList } from "../../configs/Application";
import Logger from '../../lib/handlers/Logger';
import AccountManager, { AccountRegisterCredentials } from "../../lib/managers/AccountManager";
import GlobalTheme from "../../utils/themes/GlobalTheme";
type signUpScreenProps = NativeStackScreenProps<RootStackParamList, "Register">;

export default function SignUpScreen(props: signUpScreenProps) {
  const { navigation } = props;
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  
  const { text, textCentered, link, button, image, heading, scrollViewStyle } = GlobalTheme;
  
  const goToLogin = React.useCallback(() => {
    navigation.push("Login");
  }, []);

  return (
    <PaperProvider theme={Application.Themes.PaperNativeTheme}>
      <ScrollView contentContainerStyle={scrollViewStyle}>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: 25
          }}
        >
          <Text style={heading}>Register</Text>
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
              },
              {
                type: "password",
                name: "confirmPassword",
                rules: {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                },
                textInputProps: {
                  label: "Confirm Password",
                  autoComplete: true,
                },
              }
            ]}
          />
          <Button
            mode={"contained"}
            style={button}
            onPress={handleSubmit((data: AccountRegisterCredentials) => {
              Logger.log("form data", data);
              
              if(data.password !== data.confirmPassword) {
                alert("Passwords do not match");
                return;
              }

              AccountManager.createUserWithEmailAndPassword({
                email: data.email,
                password: data.password,
                onSuccess: () => {
                  alert("Account created successfully");
                  navigation.push("Home");
                },
                onError: (error) => {
                  alert(error.message);
                }
              });
            })}
          >
            Submit
          </Button>
          <Text style={[text, textCentered]}>
            Already have account? Log in {""}
            <Text style={link} onPress={goToLogin}>
              here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

