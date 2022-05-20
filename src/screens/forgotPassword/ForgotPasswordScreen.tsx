import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import Application, { RootStackParamList } from "../../configs/Application";
import Logger from "../../lib/handlers/Logger";
import AccountManager from "../../lib/managers/AccountManager";
import GlobalTheme from "../../utils/themes/GlobalTheme";

type forgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen(props: forgotPasswordScreenProps) {
  const { navigation } = props;

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const goToLogin = React.useCallback(() => {
    navigation.push("Login");
  }, []);

  const {
    scrollViewStyle,
    heading,
    button,
    text,
    textCentered,
    link,
    contentContainer,
  } = GlobalTheme;

  return (
    <PaperProvider theme={Application.Themes.PaperNativeTheme}>
      <ScrollView contentContainerStyle={scrollViewStyle}>
        <View style={contentContainer}>
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
            ]}
          />
          <Button
            mode={"contained"}
            style={button}
            onPress={handleSubmit((data: { email: string }) => {
              Logger.log("form data", data);
              AccountManager.forgotPassword({
                email: data.email,
                onSuccess: () => {
                  alert("Password reset email sent");
                  goToLogin();
                },
                onError: (error) => {
                  Logger.logError(error);
                  alert(error);
                },
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
