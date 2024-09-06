import { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TextInput } from "react-native-paper"
import { header } from '../../assets/styles/stylesheet'

import MessengerTopTabNavStack from './MessengerTopTabNavStack'
import ChatPage from '../Messenger/Chat/ChatPage'
import UserProfile from '../UserDetails/UserProfile'
import Search from '../Messenger/Search/Search'

export type MessengerStackParams = {
    MessengerTopTabNavStack: undefined
    ChatPage: {
        userIds?: Array<number> // Pass one for direct messages and multiple for group chats
    }
    UserProfile: {
        userId: number
    }
}

const Stack = createStackNavigator<MessengerStackParams>()

const MessengerNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MessengerStackParams>>()
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
                <Stack.Screen name="MessengerTopTabNavStack" component={MessengerTopTabNavStack} options={{
                    headerTitle: "Messenger",
                    headerLeft: () => (<View>
                        
                    </View>),
                    headerRight: () => (
                        <View style={header.textInputRight}>
                            <TextInput style={header.textInput}
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
                <Stack.Screen name="ChatPage" component={ChatPage} options={{
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

export default MessengerNavStack