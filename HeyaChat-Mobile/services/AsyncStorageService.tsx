import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreValue = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // Log error
    }
}

export const StoreObject = async (key: string, object: object) => {
    try {
        let jsonString = JSON.stringify(object)
        await AsyncStorage.setItem(key, jsonString)
    } catch (e) {
        // Log error
    }
}

export const ReadValue = async (key: string) => {
    try {
        let value = await AsyncStorage.getItem(key)

        if (value !== null) {
            return value;
        }
    } catch (e) {
        // Log error
    }
}

export const ReadObject = async (key: string) => {
    try {
        let jsonValue = await AsyncStorage.getItem(key)
        
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // Log error
    }
}
