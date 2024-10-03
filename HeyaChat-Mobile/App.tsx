// Links to documentations
// Expo: https://docs.expo.dev/
// React native: https://reactnative.dev/docs/environment-setup
// React navigation: https://reactnavigation.org/docs/getting-started
// React native paper: https://callstack.github.io/react-native-paper/
// react-native-uuid https://github.com/eugenehp/react-native-uuid/blob/HEAD/docs/modules.md
// ip-api https://ip-api.com/docs/

import './gesture-handler'
import { useState, useEffect } from 'react'
import { View, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SplashScreen from 'expo-splash-screen'
import { StorageService } from './services/StorageService'
import { DeviceService } from './services/DeviceService'
import { AuthorizationAPI } from './services/APIService'

import LoginNavStack from './components/NavigationStacks/LoginNavStack'
import Modal from './components/CommonComponents/Modals/Modal'
import FullscreenModal from './components/CommonComponents/Modals/FullscreenModal'

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
  Modal: {
    param?: any
    Component: React.ComponentType<any>
  }
  FullscreenModal: {
    param?: any
    Component: React.ComponentType<any>
  }
}

const Stack = createStackNavigator<RootStackParams>()

// Prevent the splashscreen from auto hiding while we fetch resources
// SplashScreen is hidden in either AppBottomTabNavStacks home page or LoginNavStacks Authorization page
SplashScreen.preventAutoHideAsync()

const App = () => {
  const [tokenValid, setTokenValid] = useState<boolean>(false)

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

      if (storedToken !== null) {
        // Ping backend to see if token is still valid
        await apiService.PingBackend().then((res) => {
          if (res !== null && res.status === 200) {
            setTokenValid(true)
          }
        })
      }
    }

    HandleDeviceInformation()
    HandleLoginState()
  }, [])

  return (
    <View style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginNavStack} initialParams={{ loggedIn: tokenValid }} 
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
          <Stack.Screen name="Modal" component={Modal} 
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