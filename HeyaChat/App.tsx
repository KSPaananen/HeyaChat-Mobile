import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeNavStack from './components/NavigationStacks/HomeNavStack'
import ProfileNavStack from './components/NavigationStacks/ProfileNavStack'
import UsersNavStack from './components/NavigationStacks/UsersNavStack'

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
])

const Tab = createBottomTabNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeNavStack} />
        <Tab.Screen name="Users" component={UsersNavStack} />
        <Tab.Screen name="Profile" component={ProfileNavStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
