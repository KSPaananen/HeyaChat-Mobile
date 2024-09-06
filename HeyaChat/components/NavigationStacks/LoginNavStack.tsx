import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import MainPage from '../Login/MainPage'
import AppBottomTabNavStack from './AppBottomTabNavStack'

export type LoginStackParams = {
    MainPage: undefined
    AppBottomTabs: undefined
  }
  
const Stack = createStackNavigator<LoginStackParams>()

const LoginNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<LoginStackParams>>()

    return (
      <Stack.Navigator initialRouteName="MainPage" 
      screenOptions={{ 
        headerShown: false,
      }}
      >
        <Stack.Group>
            <Stack.Screen name="MainPage" component={MainPage} />
       </Stack.Group>
       <Stack.Group>
            <Stack.Screen name="AppBottomTabs" component={AppBottomTabNavStack} />
       </Stack.Group>
      </Stack.Navigator>
    )
}

export default LoginNavStack