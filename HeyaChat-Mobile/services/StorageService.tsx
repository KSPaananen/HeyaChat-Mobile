import * as SecureStore from 'expo-secure-store'

// Use Sqlite for the following:
// - Messages
// - Met users

// --- How values should be stored --- //
// jsonwebtoken: string
// continent: string
// userdevice: object
// staysignedin: string, either true or false

export class StorageService {
    constructor() {

    }

    StoreValue = async (key: string, value: string): Promise<void> => {
        try {
            await SecureStore.setItemAsync(key, value)
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to store value in StorageService: StoreValue()")
        }
    }

    StoreObject = async (key: string, object: any): Promise<void> => {
        try {
            let jsonString = JSON.stringify(object)
            
            await SecureStore.setItemAsync(key, jsonString)
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to store object in StorageService: StoreObject()")
        }
    }

    ReadValue = async (key: string): Promise<string | null> => {
        try {
            let result = await SecureStore.getItemAsync(key)
    
            if (result !== null && result !== "") {
                return result
            }
    
            return null
        } catch (e) {   
            console.log(e)
            throw new Error("ERROR: Unable to read value in StorageService: ReadValue()")
        }
    }

    // When reading objects, you have to JSON.parse outside of this method to define class due to how funny typescript is
    // Example: let variable = JSON.parse(storageService.ReadObject) as Device
    ReadObject = async (key: string): Promise<string | null> => {
        try {
            let result = await SecureStore.getItemAsync(key)
            
            if (result !== null && result !== "") {
                return result
            }
    
            return null
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to read object in StorageService: ReadObject()")
        }
    }

    Delete = async (key: string): Promise<void> => {
        try {
            let result = await SecureStore.deleteItemAsync(key)
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to delete value in StorageService: Delete()")
        }
    }

    
}