export interface NoteRecord {
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  last_accessed: string;
  is_archived: boolean;
}

export default class SQLQueryHandler {

  public static readonly CREATE_USER_NOTES_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS user_notes (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_accessed TEXT NOT NULL,
      is_archived INTEGER NOT NULL
    );
  `;

  public static readonly CREATE_SEARCH_QUERY_HISTORY_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS search_query_history (
      id INTEGER PRIMARY KEY NOT NULL,
      query TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_visible INTEGER NOT NULL
    );
  `;

  public static readonly CREATE_USER_NOTE_RELATION_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS user_note_relation (
      id INTEGER PRIMARY KEY NOT NULL,
      user_note_id INTEGER NOT NULL,
      sub_note_id INTEGER NOT NULL,
      used_id INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
  `;

  public static readonly generateSQLForInsertionOfNoteRecordIntoUserNotes = (record: NoteRecord) => {
    const { 
      title,
      content,
      created_at,
      updated_at,
      last_accessed,
      is_archived
    } = record;

    return `
      INSERT INTO user_notes(title, content, created_at, updated_at, last_accessed, is_archived)
      VALUES (${title}, ${content}, ${created_at}, ${updated_at}, ${last_accessed}, ${is_archived});
    `;
  }

}