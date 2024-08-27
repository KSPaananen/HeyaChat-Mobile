import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'

import HomePage from '../Home/HomePage'
import SummaryModal from '../Home/Summary/SummaryModal'
import UserDetailsModal from '../UserDetails/UserDetailsModal'

export type RootStackParams = {
    HomePage: undefined
    SummaryModal: undefined
    UserDetailsModal: {
        userId: string
    }
}

const Stack = createStackNavigator<RootStackParams>();

const HomeNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    const MessagerNotifications = 0

    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Group screenOptions={{ headerShown: false }} >
                <Stack.Screen name="HomePage" component={HomePage} />
            </Stack.Group>
            <Stack.Group screenOptions={{ 
                headerShown: false,
                presentation: "transparentModal" 
            }}>
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

export default HomeNavStack