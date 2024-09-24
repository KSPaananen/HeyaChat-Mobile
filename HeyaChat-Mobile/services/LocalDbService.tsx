import * as SQLite from 'expo-sqlite';

export class localDB {
    // Create db and its tables if they don't exist
    setupDB = async (): Promise<void> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS example_table (
                userID INTEGER NOT NULL, 
                username TEXT, 
                email TEXT, 
                phone TEXT,
                localUser INTEGER DEFAULT 0
            );
        `)

        db.closeAsync()
    }

    dropTables = async () => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            DROP TABLE IF EXISTS example_table;
        `)
        
        db.closeAsync()
    }


}