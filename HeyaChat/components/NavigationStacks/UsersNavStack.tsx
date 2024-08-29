import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, View } from 'react-native'
import { TextInput } from "react-native-paper"
import { header } from '../../assets/styles/styles'

import UsersSubNavStack from './UsersSubNavStack'
import DirectMessagePage from '../Users/DirectMessagePage'
import UserProfile from '../Users/../UserDetails/UserProfile'
import Search from '../Users/Search/Search'
import Modal from '../CommonComponents/Modal'

export type UsersStackParams = {
    UsersSubNavStack: undefined
    DirectMessagePage: {
        userId: number
    }
    UserDetailsPage: {
        userId: number
    }
    Modal: {
        param?: any
        Component: React.ComponentType<any>
    }
}

const Stack = createStackNavigator<UsersStackParams>()

const UsersNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<UsersStackParams>>()
    const [query, setQuery] = useState("")

    function onSubmit() {
        // Open search modal with query string & clear search field (query)
        navigation.navigate("Modal", { param: query, Component: Search })
        setQuery("")
    }

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="UsersSubNavStack" component={UsersSubNavStack} options={{
                    headerTitle: "Users",
                    headerRight: () => (
                        <View style={header.headerRight}>
                            <TextInput style={header.input}
                            dense
                            value={query}
                            onChangeText={(value) => setQuery(value)}
                            mode="outlined"
                            activeOutlineColor="#0330fc"
                            placeholder="Search" 
                            right={<TextInput.Icon icon="eye" style={header.inputIcon} />} 
                            onSubmitEditing={() => onSubmit()}
                            />
                        </View>
                    ),
                }}/>
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="DirectMessagePage" component={DirectMessagePage} options={{
                    headerTitle: "Username DM's (needs userId implementation)",
                    headerRight: () => (
                        <Button title="Profile" onPress={() => navigation.navigate("UserDetailsPage", { userId: 10 })}/>
                    ),
                }}/>
                <Stack.Screen name="UserDetailsPage" component={UserProfile} options={{
                    headerTitle: "Username's details (page)",
                }}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
                <Stack.Screen name="Modal" component={Modal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UsersNavStack