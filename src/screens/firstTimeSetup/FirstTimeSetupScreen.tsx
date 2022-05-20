import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button } from "react-native-paper";
import Woman from '../../assets/images/woman.jpg';
import Container from "../../components/container/Container";
import { RootStackParamList } from "../../configs/Application";
import Logger from '../../lib/handlers/Logger';
import URLHandler from "../../lib/handlers/URLHandler";
import AccountManager from '../../lib/managers/AccountManager';
import { fadeInDown, fadeInLeft, fadeInUp } from "../../utils/animations";
import GlobalTheme from '../../utils/themes/GlobalTheme';
type FirstTimeSetupScreenProps = NativeStackScreenProps<RootStackParamList, "FirstTimeSetup">;

export default function FirstTimeSetupScreen(props: FirstTimeSetupScreenProps) {
  
  const {
    slogan,
    signupButton,
    logo,
    link,
  } = styles;
  
  const {
    image 
  } = GlobalTheme;
  
  const { navigation } = props;
 
  const redirectToHome = useCallback(() => {
    navigation.navigate('Home');
  }, []);

  React.useEffect(() => {
    AccountManager.hasSession(redirectToHome);
    Logger.log("hasSession", AccountManager.isUserLoggedIn());
  }, []);

  return (
    <Container style={{
      flex: 1
    }}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Animatable.Text animation={fadeInDown} style={[
        logo, 
      ]}>Inscriber</Animatable.Text>
      <Animatable.Text 
        style={slogan}
        animation={fadeInLeft}
      >The only note editor you'll need</Animatable.Text>
      <Button 
        mode="contained" 
        style={[
          signupButton,
        ]}
        onPress={() => navigation.push('Register')} 
      >
        Sign up
      </Button>
      <Animatable.Text 
        style={link}
        animation={fadeInDown}
        onPress={() => navigation.push('Home')}  
      >Use without an account</Animatable.Text>
      <Animatable.Text animation={fadeInDown}>
        Have an account? Login <Text style={link} onPress={() => navigation.push('Login')}>here</Text>
      </Animatable.Text>
      <Animatable.Image style={image} animation={fadeInUp} source={Woman}/>
      <Animatable.Text onPress={URLHandler.openURL('https://storyset.com/people')} style={[
        link,
      ]}>People illustrations by Storyset</Animatable.Text>
      </ScrollView>
    </Container>
    
  );
}

const styles = StyleSheet.create({
  slogan: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  signupButton: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#2196F3",
    width: "100%",
  },
  logo: {
    textTransform: "uppercase",
    alignSelf: "flex-start"
  },
  link: {
    textDecorationLine: "underline"
  },
  textCenter: {
    textAlign: "center",
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  }
});