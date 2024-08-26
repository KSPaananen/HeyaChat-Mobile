import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/core'

import UsersPage from '../Users/UsersPage'

const Tab = createMaterialTopTabNavigator();

const UsersSubNavStack = () => {
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

export default UsersSubNavStack