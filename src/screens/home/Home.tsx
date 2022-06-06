import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FooterMenu from '../../components/menu/footer-menu/FooterMenu';
import RecentPagesHeader from '../../components/header/recent-pages-header/RecentPagesHeader';
import { RootStackParamList } from '../../configs/Application';
import DatabaseHandler from '../../lib/handlers/DatabaseHandler';
import Logger from '../../lib/handlers/Logger';
import AccountManager from '../../lib/managers/AccountManager';
import { IconButton } from 'react-native-paper';

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

  const redirectToNewNotesPage = React.useCallback(() => {
    navigation.navigate('CreateNote')
  }, [])
  
  React.useEffect(() => {
    AccountManager.hasNoSession(redirectToLogin);
    
    Logger.log(DatabaseHandler.readNotes());
  },  []);
  
  const goToHome = React.useCallback(() => {
    navigation.navigate('Home');
  }, []);

  const goToSearch = React.useCallback(() => {
    // navigation.navigate('Search');
  }, []);

  const goToAccount = React.useCallback(() => {
    // navigation.navigate('Account');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.button}>
            <Button
              title="<"
              onPress={signOut}
              accessibilityLabel="Sign out."
            />
          </View>
        </View>
        <View style={styles.content}>
          <RecentPagesHeader/>
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <Button
              title="+"
              onPress={redirectToNewNotesPage}
              accessibilityLabel="Add a new page."
            />
          </View>
          <FooterMenu>
            <IconButton onPress={goToHome} icon="home-edit"></IconButton>
            <IconButton onPress={goToSearch} icon="magnify"></IconButton>
            <IconButton onPress={goToAccount} icon="account"></IconButton>
          </FooterMenu>
        </View>
      {/* <View style={styles.header}>
          <Button
            title="<"
            onPress={() => signOut}
            accessibilityLabel="Add a new page."
          />
        <View style={styles.button}>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  header: {
    width: '100%',
    height: 'auto'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  button: {
    width: 40,
    height: 40,
  }
});
