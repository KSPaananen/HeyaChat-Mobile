import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

import UserCard from './UserCard'

export type user = {
  userId: string
  username: string
  lastMessage: string
  lastMessageDT: string
  icon: string
}

const UserPage = () => {
  const navigation = useNavigation()

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
        onPress1={() => {
          navigation.navigate("UserDetailsPage", { userId: user.userId })
        }}
        onPress2={() => {
          navigation.navigate("DirectMessagePage", { userId: user.userId })
        }}
        />
    </View>
  );
}

export default UserPage