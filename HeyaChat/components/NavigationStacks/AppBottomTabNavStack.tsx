import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'

import HomeNavStack from '../NavigationStacks/HomeNavStack'
import ProfileNavStack from '../NavigationStacks/ProfileNavStack'
import UsersNavStack from '../NavigationStacks/UsersNavStack'

export type AppStackParams = {
    Home: undefined
    Users: undefined
    Profile: undefined
  }
  
  const Tab = createBottomTabNavigator<AppStackParams>()

const AppBottomTabNavStack = () => {

    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeNavStack} />
        <Tab.Screen name="Users" component={UsersNavStack} />
        <Tab.Screen name="Profile" component={ProfileNavStack} />
      </Tab.Navigator>
      )
}

export default AppBottomTabNavStack