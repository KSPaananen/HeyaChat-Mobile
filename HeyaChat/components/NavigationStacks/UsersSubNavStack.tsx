import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import UsersPage from '../Users/UsersPage'

export type RootStackParams = {
    MetUsers: undefined
    Friendlist: undefined
}

const Tab = createMaterialTopTabNavigator<RootStackParams>();

const UsersSubNavStack = () => {

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