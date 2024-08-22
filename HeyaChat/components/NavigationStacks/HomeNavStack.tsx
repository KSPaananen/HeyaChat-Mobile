import { createStackNavigator } from '@react-navigation/stack'

import HomePage from '../Home/HomePage'
import SummaryModal from '../Summary/SummaryModal'
import UserDetailsModal from '../UserDetails/UserDetailsModal'

const Stack = createStackNavigator();

export default function HomeNavStack() {
    const MessagerNotifications = 0

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }} >
                <Stack.Screen name="HomePage" component={HomePage} />
            </Stack.Group>
            <Stack.Group screenOptions={{ 
                headerShown: false,
                presentation: "transparentModal" 
                
            }} >
                <Stack.Screen name="SummaryModal" component={SummaryModal} options={{
                        headerTitle: "Summary of users seen",
                }}/>
                <Stack.Screen name="UserDetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}