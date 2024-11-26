import { View, StyleSheet } from 'react-native'
import { MessengerTopTabStackParams } from '../../NavigationStacks/MessengerTopTabNavStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import UserCard from './UserCard'

type Props = NativeStackScreenProps<MessengerTopTabStackParams, "MetUsers" | "Chat">

const UserPage: React.FC<Props> = ({ navigation }) => {
  const tempUser = {
    userId: 0,
    username: 'tempUser',
    profile: {
      icon: require('../../../assets/icons/icon.png'),
      banner: require('../../../assets/icons/icon.png'),
      title: "testTitle",
      displayname: 'displayName',
      description: 'test description'
    },

  }

  return (
    <View style={userPage.container}>
        <UserCard 
          user={tempUser}
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