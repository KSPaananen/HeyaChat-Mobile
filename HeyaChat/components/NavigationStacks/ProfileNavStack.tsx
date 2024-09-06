import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, Pressable, Image, Button } from 'react-native'
import { header } from '../../assets/styles/stylesheet'

import ProfilePage from '../Profile/ProfilePage'
import LeaderboardsPage from '../Profile/Leaderboards/LeaderboardsPage'
import SettingsNavStack from '../NavigationStacks/SettingsNavStack'

export type ProfileStackParams = {
    ProfilePage: undefined
    LeaderboardsPage: undefined
    SettingsNavStack: undefined
}

const Stack = createStackNavigator<ProfileStackParams>();

export default function HomeNavStack() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>()

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="ProfilePage" component={ProfilePage} options={{
                    headerTitle: "My profile",
                    headerLeft: () => (<View>
                        
                        </View>),
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("SettingsNavStack")}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    ),
                }}/>
                <Stack.Screen name="LeaderboardsPage" component={LeaderboardsPage} options={{
                    headerRight: () => (
                        <Pressable style={header.buttonRight}>
                            <Text style={header.buttonTextRight}>Region</Text>    
                        </Pressable>
                    ),
                }}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SettingsNavStack" component={SettingsNavStack} options={{
                    headerTitle: "Settings",
                    headerRight: () => (
                        <Button title="Settings" onPress={() => navigation.navigate("SettingsNavStack")} />
                    ),
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}