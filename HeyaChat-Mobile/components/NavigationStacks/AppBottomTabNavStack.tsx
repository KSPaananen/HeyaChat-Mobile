import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'

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
      }}
      >
        <Tab.Screen name="Home" component={HomeNavStack} options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Octicons name="home" size={20} color="rgb(63, 118, 198)" />
          ),
          }}
        />
        <Tab.Screen name="Messenger" component={MessengerNavStack} options={{ 
          tabBarBadge: 1,
          tabBarLabel: 'Messenger',
          tabBarIcon: () => (
            <Octicons name="comment" size={20} color="rgb(63, 118, 198)" />
          ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileNavStack} options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Octicons name="person" size={20} color="rgb(63, 118, 198)" />
          ),
          }}
        />
      </Tab.Navigator>
    )
}

export default AppBottomTabNavStack