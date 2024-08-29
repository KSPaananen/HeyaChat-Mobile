import { useEffect } from 'react';
import { Text, View, Button } from 'react-native'
import { StackActions } from '@react-navigation/native'

type Props = {
  userId: number
  navigation: any
  onPress: () => void
}

const UserDetails: React.FC<Props> = ({ userId, navigation, onPress }) => {

  useEffect(() => {
    // Take userId and get user data from db
    
  })

  function Navigate() {
    // Reset Home to first page
    navigation.dispatch(StackActions.popToTop())
    // Navigate first to bottom page and then to direct messages to maintain navigation stack
    navigation.navigate("Users")
    setTimeout(
      () => navigation.navigate("Users", { screen: "DirectMessagePage", params: { userId: userId }}), 
    50)
  }

  return (
    <View>
      <Text>userId: {userId}</Text>
      <Button title="Send a message" onPress={() => Navigate()} />
      <Button title="Add friend" />
      <Button title="Go back" onPress={() => onPress()} />
    </View>
  );
}

export default UserDetails