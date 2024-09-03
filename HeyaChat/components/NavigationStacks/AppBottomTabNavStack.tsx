import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeNavStack from '../NavigationStacks/HomeNavStack'
import MessengerNavStack from './MessengerNavStack'
import ProfileNavStack from '../NavigationStacks/ProfileNavStack'

export type AppStackParams = {
    Home: undefined
    Messenger: undefined
    Profile: undefined
  }
  
const Tab = createBottomTabNavigator<AppStackParams>()

const AppBottomTabNavStack = () => {

    return (
      <Tab.Navigator initialRouteName="Home" 
      screenOptions={{ 
        headerShown: false,
        tabBarHideOnKeyboard: true // Temporary fix
      }}
      >
        <Tab.Screen name="Home" component={HomeNavStack} />
        <Tab.Screen name="Messenger" component={MessengerNavStack} options={{ 
          tabBarBadge: 1 
          }}
        />
        <Tab.Screen name="Profile" component={ProfileNavStack} />
      </Tab.Navigator>
    )
}

export default AppBottomTabNavStack