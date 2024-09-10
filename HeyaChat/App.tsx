import './gesture-handler';
import { useEffect } from 'react'
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginNavStack from './components/NavigationStacks/LoginNavStack'
import Modal from './components/CommonComponents/Modal'
import FullscreenModal from './components/CommonComponents/FullscreenModal'

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
  Login: undefined
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

const App = () => {

  useEffect(() => {
    

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginNavStack} />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
          <Stack.Screen name="Modal" component={Modal} />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true, presentation: "modal"  }}>
          <Stack.Screen name="FullscreenModal" component={FullscreenModal} 
          
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App