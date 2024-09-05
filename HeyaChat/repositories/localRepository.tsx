import * as SQLite from 'expo-sqlite';
import * as Models from '../models/localDB/models'

export class localRepository {
    // db.closeAsync()

    // -- users table -- //
    
    getLocalUser = async (): Promise<Models.users | null> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        const result: Models.users | null = await db.getFirstAsync(`
            SELECT * FROM users WHERE localUser = 1
        `)

        return result
    }

    getUser = async (userID: number): Promise<Models.users | null> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        const result: Models.users | null = await db.getFirstAsync(`
            SELECT * FROM users WHERE userID = ${userID}
        `)

        return result
    }

    insertUser = async (object: Models.users) => {
        const db = await SQLite.openDatabaseAsync('localDB')
        await db.execAsync(`
            INSERT INTO users 
                (userID, username, email, phone, localUser) 
            VALUES (
                ${object.userID}, 
                '${object.username}', 
                '${object.email}', 
                '${object.phone}', 
                ${Number(object.localUser)}
            );
        `)
    }

    editUser = async (object: Models.users) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            UPDATE users SET 
                username = '${object.username}', 
                email = '${object.email}', 
                phone = '${object.phone}', 
                localUser = ${object.localUser} 
            WHERE userID = ${object.userID}
        `)
    }

    deleteUser = async (userID: number) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            DELETE FROM users WHERE userID = ${userID}
        `)
    }

    // -- interactions table -- //

    getInteractions = async (userID: number): Promise<Models.interactions | null> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.getFirstAsync(`
            SELECT * FROM interactions WHERE userID = '${userID}
        `).then((result) => {
            return result
        })

        return null
    }

    insertInteractions = async (object: Models.interactions) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        // Format dates to strings with yy-mm-dd hh:mm:ss
        const formattedLastMetDT: string = formatDateForSQLite(object.lastMetDT)
        const formattedLastMessageDT: string = formatDateForSQLite(object.lastMessageDT)

        await db.execAsync(`
            INSERT INTO interactions 
                (lastMetDT, lastMessage, lastMessageDT, userID) 
            VALUES (
                '${formattedLastMetDT}', 
                '${object.lastMessage}', 
                '${formattedLastMessageDT}', 
                ${object.userID}
            );
        `)
    }

    editInteractions = async (object: Models.interactions) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        // Format dates to strings with yy-mm-dd hh:mm:ss
        const formattedLastMetDT: string = formatDateForSQLite(object.lastMetDT)
        const formattedLastMessageDT: string = formatDateForSQLite(object.lastMessageDT)
        
        await db.execAsync(`
            UPDATE interactions SET 
                lastMetDT = '${formattedLastMetDT}', 
                lastMessage = '${object.lastMessage}', 
                lastMessageDT = '${formattedLastMessageDT}' 
            WHERE userID = ${object.userID}
        `)
    }

    deleteInteractions = async (userID: number) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            DELETE FROM interactions WHERE userID = ${userID}
        `)
    }

    // -- profile table -- //

    getProfile = async (userID: number): Promise<Models.profiles | null> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.getFirstAsync(`
            SELECT * FROM profile WHERE userID = '${userID}
        `).then((result) => {
            return result
        })

        return null
    }

    insertProfile = async (object: Models.profiles) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            INSERT INTO profiles 
                (displayname, title, description, iconUrl, bannerUrl, userID) 
            VALUES (
                '${object.displayname}', 
                '${object.title}', 
                '${object.description}', 
                '${object.iconUrl}', 
                '${object.bannerUrl}', 
                ${object.userID}
            );
        `)
    }

    editProfile = async (object: Models.profiles) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            UPDATE profiles SET 
                displayname = '${object.displayname}', 
                title = '${object.title}', 
                description = '${object.description}', 
                iconUrl = '${object.iconUrl}', 
                bannerUrl = '${object.bannerUrl}' 
            WHERE userID = ${object.userID}
        `)
    }

    deleteProfile = async (userID: number) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        await db.execAsync(`
            DELETE FROM profiles WHERE userID = ${userID}
        `)
    }
    
    // -- devices table -- //

    getDevice = async () => {
        const db = await SQLite.openDatabaseAsync('localDB');

        const result = await db.getFirstAsync(`
            SELECT * FROM device
        `)

        return result
    }

    editDevice = async (deviceID: number, deviceName: string) => {
        const db = await SQLite.openDatabaseAsync('localDB')

        // There should only be one row so just replace its value
        await db.execAsync(`
            UPDATE device SET deviceName = '${deviceName}' WHERE deviceID = ${deviceID}
        `)
    }


}

// format dates for SQlite
const formatDateForSQLite = (dt: Date | null): string => {
    if (dt !== null) {
        const formattedDate = dt.toLocaleDateString('en-GB', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }).split('/').reverse().join('-');
          
          // Extract time parts
          const hours = String(dt.getHours()).padStart(2, '0');
          const minutes = String(dt.getMinutes()).padStart(2, '0');
          const seconds = String(dt.getSeconds()).padStart(2, '0');
    
          const formattedDateTime = `${formattedDate} ${hours}:${minutes}:${seconds}`;
    
          return formattedDateTime
    }

    // Return default date value if dt is null
    return "1970-1-1 00:00:00"
}