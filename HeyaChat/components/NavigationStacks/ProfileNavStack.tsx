import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from 'react-native'

import ProfilePage from '../Profile/ProfilePage'
import LeaderboardsPage from '../Leaderboards/LeaderboardsPage'
import LiteUserDetailsModal from '../UserDetails/LiteUserDetailsModal'
import SettingsPage from '../Settings/SettingsPage'

export type RootStackParams = {
    ProfilePage: undefined
    LeaderboardsPage: undefined
    SettingsPage: undefined
    LiteUserDetailsModal: {
        userId: string
    }
}

const Stack = createStackNavigator<RootStackParams>();

export default function HomeNavStack() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

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
                <Stack.Screen name="LiteUserDetailsModal" component={LiteUserDetailsModal} options={{
                    headerTitle: "Username's details (liteModal)",
                }}/>
            </Stack.Group>
            </Stack.Group>
        </Stack.Navigator>
    )
}