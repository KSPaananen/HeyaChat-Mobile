import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { Button } from 'react-native'

import ProfilePage from '../Profile/ProfilePage'
import LeaderboardsPage from '../Leaderboards/LeaderboardsPage'
import UserDetailsModal from '../UserDetails/UserDetailsModal'
import LiteUserDetailsModal from '../UserDetails/LiteUserDetailsModal'
import SettingsPage from '../Settings/SettingsPage'

const Stack = createStackNavigator();

export default function HomeNavStack() {
    const navigation = useNavigation()

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="ProfilePage" component={ProfilePage} options={{
                    headerTitle: "My profile",
                    headerRight: () => (
                        <Button title="Settings" onPress={() => navigation.navigate("SettingsPage")} />
                    ),
                }}/>
                <Stack.Screen name="LeaderboardsPage" component={LeaderboardsPage} options={{
                    headerRight: () => (
                        <Button title="Region" />
                    ),
                }}/>
                <Stack.Screen name="SettingsPage" component={SettingsPage} options={{
                    headerTitle: "Settings",
                }}/>
            <Stack.Group screenOptions={{ presentation: "modal" }} >
                <Stack.Screen name="DetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
                <Stack.Screen name="LiteDetailsModal" component={LiteUserDetailsModal} options={{
                    headerTitle: "Username's details (liteModal)",
                }}/>
            </Stack.Group>
            </Stack.Group>
        </Stack.Navigator>
    )
}