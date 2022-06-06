
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import Application from "src/configs/Application";
import { db } from "../../../App";
import AccountManager from "../managers/AccountManager";
import { NoteRecord } from './SQLQueryHandler';

interface docData {
  title: string;
  content: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  last_accessed: Timestamp;
  is_archived: boolean;
}

export default class DatabaseHandler {

  public static async updateNote(note: NoteRecord) {
    const currentLoggedInUser = AccountManager.getUserProfile();
    if(currentLoggedInUser) {
      const docRef = doc(db, 'notes', currentLoggedInUser?.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        const docData : docData = {
          title: note.title,
          content: note.content,
          created_at: Timestamp.fromDate(new Date(note.created_at)),
          updated_at: Timestamp.fromDate(new Date(note.updated_at)),
          last_accessed: Timestamp.fromDate(new Date(note.last_accessed)),
          is_archived: note.is_archived
        };
        return await setDoc(docRef, docData);
      }
    }
    return null;
  }

  public static async readNotes() {
    const currentLoggedInUser = AccountManager.getUserProfile();
    if(currentLoggedInUser) {
      const docRef = doc(db, 'notes', currentLoggedInUser?.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        return docSnap.data();
      }
    }
    return null;
  }

  public static async writeNote(note: NoteRecord) {
    
    const docData : docData = {
      title: note.title,
      content: note.content,
      created_at: Timestamp.fromDate(new Date(note.created_at)),
      updated_at: Timestamp.fromDate(new Date(note.updated_at)),
      last_accessed: Timestamp.fromDate(new Date(note.last_accessed)),
      is_archived: note.is_archived
    };

    const currentLoggedInUser = AccountManager.getUserProfile();
    
    if(currentLoggedInUser) {
      const docRef = doc(db, 'notes', currentLoggedInUser?.uid);
      
      return await setDoc(docRef, docData);
    }

    return null;
  }
}
  // protected static instance : DatabaseHandler;
  // private connection: SQLite.WebSQLDatabase;

  // private constructor() {
  //   this.connection = SQLite.openDatabase(Application.DATABASE_NAME);
  //   console.log(`location: ${FileSystem.documentDirectory}`)
  // }

  // public static getInstance() : DatabaseHandler {
  //   if(!DatabaseHandler.instance) {
  //     DatabaseHandler.instance = new DatabaseHandler();
  //   }

  //   return DatabaseHandler.instance;
  // }

  // public getConnection() : SQLite.WebSQLDatabase {
  //   return DatabaseHandler.getInstance().connection;
  // }

  // public setupDatabase() {
  //   const {
  //     CREATE_USER_NOTES_TABLE_SQL,
  //     CREATE_SEARCH_QUERY_HISTORY_TABLE_SQL,
  //     CREATE_USER_NOTE_RELATION_TABLE_SQL
  //   } = SQLQueryHandler;
    
  //   DatabaseHandler
  //   .getInstance()
  //   .getConnection()
  //   .transaction(tx => {
  //     tx.executeSql(CREATE_USER_NOTES_TABLE_SQL);
  //     tx.executeSql(CREATE_SEARCH_QUERY_HISTORY_TABLE_SQL);
  //     tx.executeSql(CREATE_USER_NOTE_RELATION_TABLE_SQL);
  //   });
  // }

  // public insertNoteRecordIntoUserNotes(record: NoteRecord) {
  //   const {
  //     generateSQLForInsertionOfNoteRecordIntoUserNotes
  //   } = SQLQueryHandler;

  //   const sql = generateSQLForInsertionOfNoteRecordIntoUserNotes(record);
    
  //   DatabaseHandler
  //   .getInstance()
  //   .getConnection()
  //   .transaction(tx => {
  //     tx.executeSql(sql);
  //   });
  // }
// } 