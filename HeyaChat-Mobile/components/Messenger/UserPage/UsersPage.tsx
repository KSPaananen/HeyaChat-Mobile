import { View, StyleSheet } from 'react-native'
import { MessengerTopTabStackParams } from '../../NavigationStacks/MessengerTopTabNavStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { testUser } from '../../../models/testUser'

import UserCard from './UserCard'

type Props = NativeStackScreenProps<MessengerTopTabStackParams, "MetUsers" | "Chat">

const UserPage: React.FC<Props> = ({ navigation }) => {


  return (
    <View style={userPage.container}>
        <UserCard 
        user={testUser}
        onPress1={(value) => {
          navigation.navigate("Messenger", { screen: "UserProfile", params: { userIds: value }})
        }}
        onPress2={(value) => {
          navigation.navigate("Messenger", { screen: "ChatPage", params: { userIds: value }})
        }}
        />
    </View>
  );
}

export default UserPage

export const userPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)'
  }
})