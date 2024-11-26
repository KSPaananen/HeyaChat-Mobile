import * as SQLite from 'expo-sqlite';
import * as Models from '../models/sqlite/models'

export class localRepository {
    // db.closeAsync()

    // -- users table -- //
    
    getExampleModel = async (): Promise<Models.users | null> => {
        const db = await SQLite.openDatabaseAsync('localDB')

        const result: Models.example_model | null = await db.getFirstAsync(`
            SELECT * FROM users WHERE localUser = 1
        `)

        return result
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