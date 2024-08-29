import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'

import HomePage from '../Home/HomePage'

export type HomeStackParams = {
    HomePage: undefined
}

const Stack = createStackNavigator<HomeStackParams>();

const HomeNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>()

    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Group screenOptions={{ headerShown: false }} >
                <Stack.Screen name="HomePage" component={HomePage} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default HomeNavStack