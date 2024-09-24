import './gesture-handler'
import { useState, useEffect } from 'react'
import { View, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SplashScreen from 'expo-splash-screen'
import { ReadValue, ReadObject } from './services/AsyncStorageService'

import LoginNavStack from './components/NavigationStacks/LoginNavStack'
import Modal from './components/CommonComponents/Modals/Modal'
import FullscreenModal from './components/CommonComponents/Modals/FullscreenModal'

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Require cycle:" // This warning goes off from importing styles from parent component
])

//                             - Nav stack structure -
//
//                                                / -> HomeNavStack
//                                               /     
// App -> LoginNavStack -> AppBottomTabNavStack --> MessengerNavStack -> MessengerTopTabNavStack
//                                               \     
//                                                \ -> ProfileNavStack -> SettingsNavStack

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
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [tokenValid, SetTokenValid] = useState<boolean>(false)

  useEffect(() => {
      // Ping backend with token too see if user is still logged in. Navigate to AppBottomTabs if response is 200
      // Also ping backend only if the token expiration time is less than 24 hours or so

    
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