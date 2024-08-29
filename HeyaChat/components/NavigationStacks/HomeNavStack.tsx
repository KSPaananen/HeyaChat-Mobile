import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'

import HomePage from '../Home/HomePage'
import Modal from '../CommonComponents/Modal'

export type HomeStackParams = {
    HomePage: undefined
    Modal: {
        param?: any
        Component: React.ComponentType<any>
    }
}

const Stack = createStackNavigator<HomeStackParams>();

const HomeNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>()
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
                <Stack.Screen name="Modal" component={Modal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default HomeNavStack