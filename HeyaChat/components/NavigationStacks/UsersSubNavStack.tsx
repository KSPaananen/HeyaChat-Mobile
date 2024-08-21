import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/core'

import UsersPage from '../Users/UsersPage'

const Tab = createMaterialTopTabNavigator();

export default function UsersSubNavStack() {
    const navigation = useNavigation()

    return (
        <Tab.Navigator>
                <Tab.Screen name="MetUsers" component={UsersPage} options={{
                    tabBarLabel: "Seen users"
                }}/>
                <Tab.Screen name="Friendlist" component={UsersPage} options={{
                    tabBarLabel: "Friends"
                }}/>
        </Tab.Navigator>
    )
}