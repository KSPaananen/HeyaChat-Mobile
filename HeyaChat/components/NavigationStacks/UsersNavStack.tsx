import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, View } from 'react-native'
import { TextInput } from "react-native-paper"
import { header } from '../../assets/styles/styles'

import UsersSubNavStack from './UsersSubNavStack'
import DirectMessagePage from '../Users/DirectMessagePage'
import UserDetailsModal from '../UserDetails/UserDetailsModal'
import UserDetailsPage from '../UserDetails/UserDetailsPage'
import SearchModal from '../Search/SearchModal'

export type RootStackParams = {
    UsersSubNavStack: undefined
    DirectMessagePage: {
        userId: string
    }
    UserDetailsPage: {
        userId: string
    }
    UserDetailsModal: {
        userId: string
    }
    SearchModal: {
        query: string
    }
}

const Stack = createStackNavigator<RootStackParams>()

const UsersNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    const [query, setQuery] = useState("")

    function onSubmit() {
        // Open up search modal with text parameter
        navigation.navigate("SearchModal", { query: query })
        // Clear search field
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
                    headerTitle: "Username DM's",
                    headerRight: () => (
                        <Button title="Profile" onPress={() => navigation.navigate("UserDetailsPage", { userId: "0" })}/>
                    ),
                }}/>
                <Stack.Screen name="UserDetailsPage" component={UserDetailsPage} options={{
                    headerTitle: "Username's details (page)",
                }}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false, presentation: "transparentModal"  }}>
                <Stack.Screen name="UserDetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
                <Stack.Screen name="SearchModal" component={SearchModal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UsersNavStack