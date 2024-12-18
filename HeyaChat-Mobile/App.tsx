// Links to documentations
// Expo: https://docs.expo.dev/
// React native: https://reactnative.dev/docs/environment-setup
// React navigation: https://reactnavigation.org/docs/getting-started
// React native paper: https://callstack.github.io/react-native-paper/
// React-native-vector-icons https://github.com/oblador/react-native-vector-icons
// react-native-uuid https://github.com/eugenehp/react-native-uuid/blob/HEAD/docs/modules.md
// ip-api https://ip-api.com/docs/

import './gesture-handler'
import { useState, useEffect } from 'react'
import { View, LogBox } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SplashScreen from 'expo-splash-screen'
import { StorageService } from './services/StorageService'
import { DeviceService } from './services/DeviceService'
import { AuthorizationAPI } from './services/APIService'

import LoginNavStack from './components/NavigationStacks/LoginNavStack'
import FullscreenModal from './components/Reusables/Modals/FullscreenModal'
import LargeModal from './components/Reusables/Modals/LargeModal'
import MediumModal from './components/Reusables/Modals/MediumModal'
import SmallModal from './components/Reusables/Modals/SmallModal'
import PopupNotification from './components/Reusables/Notifications/PopupNotification'

//                             - Nav stack structure -
//
//                                                / -> HomeNavStack
//                                               /     
// App -> LoginNavStack -> AppBottomTabNavStack --> MessengerNavStack -> MessengerTopTabNavStack
//                                               \     
//                                                \ -> ProfileNavStack -> SettingsNavStack

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Require cycle:" // This warning goes off from importing styles from parent component
])

export type RootStackParams = {
  Login: {
    loggedIn: boolean
  }
  FullscreenModal: {
    Props?: any[]
    Component: React.ComponentType<any>
  }
  LargeModal: {
    Props?: any[]
    Component: React.ComponentType<any>
  }
  MediumModal: {
    Props?: any[]
    Component: React.ComponentType<any>
  }
  SmallModal: {
    Props?: any[]
    Component: React.ComponentType<any>
  }
  PopupNotification: {
    message: string
  }
}

const Stack = createStackNavigator<RootStackParams>()

// Prevent the splashscreen from auto hiding while we fetch resources
// SplashScreen is unhidden in either AppBottomTabNavStacks home page or LoginNavStacks Authorization page
SplashScreen.preventAutoHideAsync()

const App = () => {
  const [tokenValid, setTokenValid] = useState<boolean>(true)

  useEffect(() => {
    const storageService = new StorageService()
    const deviceService = new DeviceService()
    const apiService = new AuthorizationAPI()
    
    // Store basic information about device into application storage
    const HandleDeviceInformation = async () => {
      await deviceService.SetDevicesBasicInformation()
    }

    // Check if stored token is valid. Set boolean to tokenValid to dictate whether app navigates to Login or Home
    const HandleLoginState = async () => {
      let storedToken = await storageService.ReadValue("jsonwebtoken")
      let staySignedIn = await storageService.ReadValue("staysignedin")

      if (storedToken !== null) {
        // Ping backend to see if token is still valid
        let res = await apiService.PingBackend()

        if (res !== null && res.status === 200 && staySignedIn === "true") {
          setTokenValid(true)
        } else {
          // Set staysignedin back to false if pinging backend failed
          await storageService.StoreValue("staysignedin", "false")
          // Also delete invalid token from storage
          await storageService.Delete("staysignedin")
        }
      }
    }

    HandleDeviceInformation()
    HandleLoginState()
  }, [])

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(63, 118, 198)',
    },
  };

  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginNavStack} initialParams={{ loggedIn: tokenValid }} 
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
          <Stack.Screen name="LargeModal" component={LargeModal} options={{ animationEnabled: false }}
          />
          <Stack.Screen name="MediumModal" component={MediumModal} options={{ animationEnabled: false }}
          />
          <Stack.Screen name="SmallModal" component={SmallModal} options={{ animationEnabled: false }}
          />
          <Stack.Screen name="PopupNotification" component={PopupNotification} 
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true, presentation: "modal"  }}>
          <Stack.Screen name="FullscreenModal" component={FullscreenModal} 
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}

export default App