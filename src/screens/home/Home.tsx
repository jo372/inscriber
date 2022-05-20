import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from 'src/configs/Application';
import AccountManager from '../../lib/managers/AccountManager';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen(props: HomeScreenProps) {
  
  const { navigation } = props;

  const signOut = React.useCallback(() => {
    AccountManager.userSignOut();
    navigation.navigate('FirstTimeSetup');
  }, []);

  const redirectToLogin = React.useCallback(() => {
    navigation.navigate('Login');
  }, []);
  
  React.useEffect(() => {
    AccountManager.hasNoSession(redirectToLogin);
  },  []);
  
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Button 
        title="Sign Out"
        onPress={signOut}
        accessibilityLabel="Sign out of account."/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});
