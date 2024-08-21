import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { Button } from 'react-native'

import UsersPage from '../Users/UsersPage'
import DirectMessagePage from '../Users/DirectMessagePage'
import UserDetailsModal from '../UserDetails/UserDetailsModal'
import UserSearchModal from '../Search/SearchModal'

// Test
import UsersSubNavStack from './UsersSubNavStack'

const Stack = createStackNavigator()

export default function UsersNavStack() {
    const navigation = useNavigation()

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="UsersSubNavStack" component={UsersSubNavStack} options={{
                    headerTitle: "Users",
                    headerRight: () => (
                        <Button title="Search" onPress={() => navigation.navigate("UserSearchModal")} />
                    ),
                }}/>
            </Stack.Group>
            <Stack.Group>
                {/* Keep this Screen so UserDetailsModal works properly */}
                <Stack.Screen name="UsersPage" component={UsersPage} /> 
                <Stack.Screen name="DirectMessagePage" component={DirectMessagePage} options={{
                    headerTitle: "Username DM's",
                    headerRight: () => (
                        <Button title="Profile" onPress={() => navigation.navigate("UserDetailsPage")}/>
                    ),
                }}/>
                <Stack.Screen name="UserDetailsPage" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (page)",
                }}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="UserDetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
                <Stack.Screen name="UserSearchModal" component={UserSearchModal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}