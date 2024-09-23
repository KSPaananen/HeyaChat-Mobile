import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import UsersPage from '../Messenger/UserPage/UsersPage'

export type MessengerTopTabStackParams = {
    MetUsers: undefined
    Chat: undefined
}

const Tab = createMaterialTopTabNavigator<MessengerTopTabStackParams>()

const MessengerTopTabNavStack = () => {

    return (
        <Tab.Navigator>
                <Tab.Screen name="MetUsers" component={UsersPage} options={{
                    tabBarLabel: "Seen users"
                }}/>
                <Tab.Screen name="Chat" component={UsersPage} options={{
                    tabBarLabel: "Chat"
                }}/>
        </Tab.Navigator>
    )
}

export default MessengerTopTabNavStack