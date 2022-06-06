import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import QuillEditor, { EditorChangeData, QuillToolbar } from "react-native-cn-quill";
import { RootStackParamList } from "../../configs/Application";
import DatabaseHandler from "../../lib/handlers/DatabaseHandler";
import Logger from "../../lib/handlers/Logger";
import AccountManager from "../../lib/managers/AccountManager";

type CreateNoteScreen = NativeStackScreenProps<RootStackParamList, "CreateNote">;

export default function CreateNoteScreen(props: CreateNoteScreen) {

  const redirectToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);
  
  React.useEffect(() => {
    AccountManager.hasNoSession(redirectToLogin);
  }, []);

  const { navigation } = props;

  const _editor : React.RefObject<QuillEditor> = React.createRef();
  
  const [noteId, setNoteId] = React.useState('');
  const [noteMessage, setNoteMessage] = React.useState('');

  useEffect(() => {
      if(!noteId) {
        DatabaseHandler.writeNote({
          title: "New Note",
          content: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_accessed: new Date().toISOString(),
          is_archived: false
        });
      }
  }, []);

  const onChange = useCallback((data: EditorChangeData) => {
    _editor.current && _editor.current.getText().then(text => setNoteMessage(text));
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar />
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml=""
        onEditorChange={onChange}
      />
      <QuillToolbar editor={_editor} options="full" theme="light" />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});