
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import Application from '../../configs/Application';
import SQLQueryHandler, { NoteRecord } from './SQLQueryHandler';

export default class DatabaseHandler {
  protected static instance : DatabaseHandler;
  private connection: SQLite.WebSQLDatabase;

  private constructor() {
    this.connection = SQLite.openDatabase(Application.DATABASE_NAME);
    console.log(`location: ${FileSystem.documentDirectory}`)
  }

  public static getInstance() : DatabaseHandler {
    if(!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }

    return DatabaseHandler.instance;
  }

  public getConnection() : SQLite.WebSQLDatabase {
    return DatabaseHandler.getInstance().connection;
  }

  public setupDatabase() {
    const {
      CREATE_USER_NOTES_TABLE_SQL,
      CREATE_SEARCH_QUERY_HISTORY_TABLE_SQL,
      CREATE_USER_NOTE_RELATION_TABLE_SQL
    } = SQLQueryHandler;
    
    DatabaseHandler
    .getInstance()
    .getConnection()
    .transaction(tx => {
      tx.executeSql(CREATE_USER_NOTES_TABLE_SQL);
      tx.executeSql(CREATE_SEARCH_QUERY_HISTORY_TABLE_SQL);
      tx.executeSql(CREATE_USER_NOTE_RELATION_TABLE_SQL);
    });
  }

  public insertNoteRecordIntoUserNotes(record: NoteRecord) {
    const {
      generateSQLForInsertionOfNoteRecordIntoUserNotes
    } = SQLQueryHandler;

    const sql = generateSQLForInsertionOfNoteRecordIntoUserNotes(record);
    
    DatabaseHandler
    .getInstance()
    .getConnection()
    .transaction(tx => {
      tx.executeSql(sql);
    });
  }

  // public static readonly connection = SQLite.openDatabase(Application.DATABASE_NAME);
  // public static readonly hasConnection = DatabaseHandler.connection !== null;
  // public static readonly runQuery = (query: string, params: any[] = []) => {
  //   return new Promise((resolve, reject) => {
  //     if (!DatabaseHandler.hasConnection) {
  //       reject(new Error('Database connection is not available.'));
  //     }

  //     DatabaseHandler.connection.transaction(tx => {
  //       tx.executeSql(query, params, (_, { rows }) => {
  //         resolve(rows);
  //       }, (_, error) => {
  //         reject(error);
  //       });
  //     });
  //   });
  // };

  // public static readonly createTable = async () => {
  //   await DatabaseHandler.connection.transaction(tx => {
  //     tx.executeSql(SQLQueryHandler.CREATE_USER_NOTES_TABLE);
  //   });
  // }
} 