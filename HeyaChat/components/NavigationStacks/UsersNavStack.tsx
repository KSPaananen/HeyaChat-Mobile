import { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TextInput } from "react-native-paper"
import { header } from '../../assets/styles/styles'

import UsersTopTabNavStack from './UsersTopTabNavStack'
import DirectMessagePage from '../Users/DirectMessagePage'
import UserProfile from '../Users/../UserDetails/UserProfile'
import Search from '../Users/Search/Search'

export type UsersStackParams = {
    UsersTopTabNavStack: undefined
    DirectMessagePage: {
        userId: number
    }
    UserProfile: {
        userId: number
    }
}

const Stack = createStackNavigator<UsersStackParams>()

const UsersNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<UsersStackParams>>()
    const [query, setQuery] = useState("")

    function onSubmit() {
        if (query != "") {
            navigation.navigate("Modal", { param: query, Component: Search })
            setQuery("")
        } 
    }

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="UsersTopTabNavStack" component={UsersTopTabNavStack} options={{
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
                        <Button title="Profile" onPress={() => navigation.navigate("UserProfile", { userId: 10 })}/>
                    ),
                }}/>
                <Stack.Screen name="UserProfile" component={UserProfile} options={{
                    headerTitle: "Username's details (page)",
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UsersNavStack