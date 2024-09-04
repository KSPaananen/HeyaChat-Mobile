import React from 'react'
import { PermissionsAndroid, Platform } from 'react-native'

// Request "dangerous" permissions at runtime
export const requestForGoogleNearbyConnectionsPerms = async () => {
    if (Platform.OS == "android") {
        try {
            const granted = await PermissionsAndroid.requestMultiple([   
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                ]).then((result) => {
                    if (result["android.permission.BLUETOOTH_SCAN"]
                        && result["android.permission.BLUETOOTH_ADVERTISE"]
                        && result["android.permission.BLUETOOTH_CONNECT"]
                        && result["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
                            
                    } else if (result["android.permission.BLUETOOTH_SCAN"]
                    && result["android.permission.BLUETOOTH_ADVERTISE"]
                    && result["android.permission.BLUETOOTH_CONNECT"]
                    && result["android.permission.ACCESS_FINE_LOCATION"] === "never_ask_again") {
                        
                    }
                }
            )
        } catch (error) {
            return 
        }
    } else if (Platform.OS == "ios") {
        
    }
}  

