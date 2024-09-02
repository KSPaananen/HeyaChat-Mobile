import { View } from 'react-native'
import { MessengerTopTabStackParams } from '../NavigationStacks/MessengerTopTabNavStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import UserCard from './UserCard'

export type user = {
  userId: string
  username: string
  lastMessage: string
  lastMessageDT: string
  icon: string
}

type Props = NativeStackScreenProps<MessengerTopTabStackParams, "MetUsers" | "Chat">

const UserPage: React.FC<Props> = ({ navigation }) => {

  let user: user = {
    userId: "0",
    username: "username0",
    lastMessage: "lastMessage0",
    lastMessageDT: "13:22",
    icon: ""
  }

  return (
    <View>
        <UserCard 
        user={user}
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