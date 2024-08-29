import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from 'react-native'

import ProfilePage from '../Profile/ProfilePage'
import LeaderboardsPage from '../Profile/Leaderboards/LeaderboardsPage'
import SettingsPage from '../Profile/Settings/SettingsPage'
import Modal from '../CommonComponents/Modal'

export type ProfileStackParams = {
    ProfilePage: undefined
    LeaderboardsPage: undefined
    SettingsPage: undefined
    Modal: {
        param?: any
        Component: React.ComponentType<any>
    }
}

const Stack = createStackNavigator<ProfileStackParams>();

export default function HomeNavStack() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>()

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
            </Stack.Group>
            <Stack.Group screenOptions={{ 
                headerShown: false,
                presentation: "transparentModal" 
            }}>
                <Stack.Screen name="Modal" component={Modal} options={{
                    headerTitle: "",
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}