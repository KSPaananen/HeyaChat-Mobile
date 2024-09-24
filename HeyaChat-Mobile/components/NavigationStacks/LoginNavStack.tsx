import { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'

import AuthorizationPage from '../Login/AuthorizationPage'
import AppBottomTabNavStack from './AppBottomTabNavStack'

type Props = NativeStackScreenProps<RootStackParams, "Login">

export type LoginStackParams = {
    AuthorizationPage: undefined
    AppBottomTabs: undefined
  }
  
const Stack = createStackNavigator<LoginStackParams>()

const LoginNavStack: React.FC<Props> = ({ route }) => {
  const { loggedIn } = route.params
  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParams>>()

  useEffect(() => {
    // Navigate to AppBottomTabs if loggedIn is true
    if (loggedIn) {
      navigation.navigate("AppBottomTabs")
    } 

    
  }, [])

  return (
    <Stack.Navigator initialRouteName="AuthorizationPage" 
    screenOptions={{ 
      headerShown: false,
    }}
    >
      <Stack.Group>
        <Stack.Screen name="AuthorizationPage" component={AuthorizationPage} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="AppBottomTabs" component={AppBottomTabNavStack} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default LoginNavStack