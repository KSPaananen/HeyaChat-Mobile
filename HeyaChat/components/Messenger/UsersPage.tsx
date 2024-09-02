import { View } from 'react-native'
import { MessengerTopTabStackParams } from '../NavigationStacks/MessengerTopTabNavStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { user } from '../../models/user'
import { testUser } from '../../models/testUser'

import UserCard from './UserCard'

type Props = NativeStackScreenProps<MessengerTopTabStackParams, "MetUsers" | "Chat">

const UserPage: React.FC<Props> = ({ navigation }) => {


  return (
    <View>
        <UserCard 
        user={testUser}
        onPress1={(value) => {
          navigation.navigate("Messenger", { screen: "UserProfile", params: { userId: value }})
        }}
        onPress2={(value) => {
          navigation.navigate("Messenger", { screen: "DirectMessagePage", params: { userId: value }})
        }}
        />
    </View>
  );
}

export default UserPage