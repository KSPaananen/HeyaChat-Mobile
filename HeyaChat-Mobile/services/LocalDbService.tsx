import * as SQLite from 'expo-sqlite';

export class localDB {
    // Create db and its tables if they don't exist
    setupDB = async (): Promise<void> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
                userID INTEGER NOT NULL, 
                username TEXT, 
                email TEXT, 
                phone TEXT,
                localUser INTEGER DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS interactions (
                lastMetDT TEXT DEFAULT '1970-1-1 00:00:00', 
                lastMessage TEXT, 
                lastMessageDT TEXT DEFAULT '1970-1-1 00:00:00', 
                userID INTEGER NOT NULL,
	            CONSTRAINT UsersFK FOREIGN KEY(userID) REFERENCES users(userID)
            );
            CREATE TABLE IF NOT EXISTS profiles (
                profileID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                displayname TEXT,
                title TEXT,
                description TEXT,
                iconUrl BLOB,
                bannerUrl BLOB,
                userID INTEGER NOT NULL,
                CONSTRAINT UsersFK FOREIGN KEY(userID) REFERENCES users(userID)
            );
            CREATE TABLE IF NOT EXISTS certificates (
                certificateID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                certificate TEXT NOT NULL,
                dateGranted TEXT NOT NULL DEFAULT '1970-1-1 00:00:00',
                userID INTEGER NOT NULL,
                CONSTRAINT UsersFK FOREIGN KEY(userID) REFERENCES users(userID)
            );
            CREATE TABLE IF NOT EXISTS device (
                deviceID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                deviceName TEXT
            );
        `)

        db.closeAsync()
    }

    dropTables = async () => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS interactions;
            DROP TABLE IF EXISTS profiles;
            DROP TABLE IF EXISTS certificates;
            DROP TABLE IF EXISTS device;
        `)
        
        db.closeAsync()
    }


}
