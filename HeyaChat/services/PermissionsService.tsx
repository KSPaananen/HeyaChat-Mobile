import React from 'react'
import { PermissionsAndroid, Permission, Platform } from 'react-native'

// Android permission checker
const checkPermissions = (permissions: Permission[]): Promise<boolean[]> => {
    return Promise.all(permissions.map((p) => PermissionsAndroid.check(p)))
}

// --- Data requesters --- // 

// Request "dangerous" permissions at runtime
export const requestForGoogleNearbyConnectionsPerms = async (): Promise<boolean> => {
    if (Platform.OS == "android") {
        try {
            let granted = await PermissionsAndroid.requestMultiple([   
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]).then((result) => {
                return result
            })
        } catch (error) {
        }
    } else if (Platform.OS == "ios") {
        
    }

    return false
}  

// Check if permission is granted
export const checkForGoogleNearbyConnectionsPerms = async (): Promise<boolean> => {
    if (Platform.OS == "android") {
        let granted = await checkPermissions([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]).then((result) => {
            return result
        })

    } else if (Platform.OS == "ios") {

    }

    return false
}

