import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { Button, Image, TouchableOpacity, View } from 'react-native'
import { TextInput } from "react-native-paper"
import { header } from '../../assets/styles/styles'

import UsersSubNavStack from './UsersSubNavStack'
import UsersPage from '../Users/UsersPage'
import DirectMessagePage from '../Users/DirectMessagePage'
import UserDetailsModal from '../UserDetails/UserDetailsModal'
import UserDetailsPage from '../UserDetails/UserDetailsPage'
import SearchModal from '../Search/SearchModal'

const Stack = createStackNavigator()

const UsersNavStack = () => {
    const navigation = useNavigation()
    const [query, setQuery] = useState("")

    function onSubmit(text: string) {
        // Open up search modal with text parameter
        navigation.navigate("SearchModal")
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
                            onSubmitEditing={(value) => onSubmit(value.nativeEvent.text)}
                            />
                        </View>
                    ),
                }}/>
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="DirectMessagePage" component={DirectMessagePage} options={{
                    headerTitle: "Username DM's",
                    headerRight: () => (
                        <Button title="Profile" onPress={() => navigation.navigate("UserDetailsPage")}/>
                    ),
                }}/>
                <Stack.Screen name="UserDetailsPage" component={UserDetailsPage} options={{
                    headerTitle: "Username's details (page)",
                }}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="UserDetailsModal" component={UserDetailsModal} options={{
                    headerTitle: "Username's details (modal)",
                }}/>
                <Stack.Screen name="SearchModal" component={SearchModal} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UsersNavStack