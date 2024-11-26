import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'
import { Text, Pressable, Image } from 'react-native'
import { header } from '../../assets/styles/stylesheet'

import ProfileSettingsPage from '../Profile/Settings/ProfileSettingsPage'
import AccountSettingsPage from '../Profile/Settings/AccountSettingsPage'
import AppSettingsPage from '../Profile/Settings/AppSettingsPage'

export type SettingsStackParams = {
    AppSettings: undefined
    AccountSettings: undefined
    ProfileSettings: undefined
}

const Drawer = createDrawerNavigator<SettingsStackParams>()

const SettingsNavStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParams>>()

    return (
        <Drawer.Navigator initialRouteName="AppSettings" screenOptions={{
            drawerPosition: "left",
            drawerType: "front",
            swipeEnabled: true
        }}
        >
            <Drawer.Group>
                <Drawer.Screen name="AppSettings" component={AppSettingsPage} options={{
                    headerTitle: "Application settings",
                    drawerLabel: "Application",
                    headerLeft: () => (
                        <Pressable onPress={() => {
                            navigation.goBack()
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => {
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    )
                }}/>
                <Drawer.Screen name="AccountSettings" component={AccountSettingsPage} options={{
                    headerTitle: "My account",
                    drawerLabel: "My account",
                    headerLeft: () => (
                        <Pressable onPress={() => {
                            navigation.goBack()
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => {
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    )
                }}/>
                <Drawer.Screen name="ProfileSettings" component={ProfileSettingsPage} options={{
                    headerTitle: "My profile",
                    headerLeft: () => (
                        <Pressable onPress={() => {
                            navigation.goBack()
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => {
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}>
                            <Image style={header.iconRight} source={require('../../assets/icons/icon.png')} />
                        </Pressable>
                    )
                }}/>
            </Drawer.Group>
        </Drawer.Navigator>
    )
}

export default SettingsNavStack