import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, ImageBackground, Pressable, ImageSourcePropType } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SettingsStackParams } from '../../NavigationStacks/SettingsNavStack'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInput } from "react-native-paper"
import { settings } from '../../../assets/styles/stylesheet'

import { testUser } from '../../../models/testUser'


type Props = NativeStackScreenProps<SettingsStackParams, "AccountSettings">

const AccountSettingsPage: React.FC<Props> = ({ navigation }) => {
  
  return (
    <ScrollView style={settings.container}>
        <Text> Account settings page</Text>
    </ScrollView>
  )
}

export default AccountSettingsPage
