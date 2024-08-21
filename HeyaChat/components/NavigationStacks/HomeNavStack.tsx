import { createStackNavigator } from '@react-navigation/stack'

import HomePage from '../Home/HomePage'
import SummaryPage from '../Home/SummaryPage'
import UserDetailsModal from '../UserDetails/UserDetailsModal'

const Stack = createStackNavigator();

export default function HomeNavStack() {
    const MessagerNotifications = 0

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }} >
                <Stack.Screen name="HomePage" component={HomePage} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }} >
                <Stack.Screen name="SummaryPage" component={SummaryPage} options={{
                        headerTitle: "Summary of users seen",
                }}/>
                <Stack.Screen name="UserDetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}