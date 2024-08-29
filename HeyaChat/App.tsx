import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AppBottomTabNavStack from './components/NavigationStacks/AppBottomTabNavStack'
import Modal from './components/CommonComponents/Modal'

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
])

export type RootStackParams = {
  AppBottomTabs: undefined
  Modal: {
    param?: any
    Component: React.ComponentType<any>
  }
}

const Stack = createStackNavigator<RootStackParams>()

// Nav stack structure
// 
//                             -> HomeNavStack
// App -> AppBottomTabNavStack -> UsersNavStack -> UsersTopTabNavStack
//                             -> ProfileNavStack

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppBottomTabs" screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="AppBottomTabs" component={AppBottomTabNavStack} />
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
          <Stack.Screen name="Modal" component={Modal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App