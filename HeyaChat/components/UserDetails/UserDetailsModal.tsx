import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native'
import { styles } from '../../assets/styles/styles'

export default function UserDetailsModal() {
  const navigation = useNavigation()

  function Navigate() {
    // Reset Home to first page
    navigation.dispatch(StackActions.popToTop())
    // Navigate first to bottom page and then to direct messages to maintain navigation stack
    navigation.navigate("Users", { screen: "UsersPage"})
    navigation.navigate("Users", { screen: "DirectMessagePage"})
  }

  return (
    <View style={styles.container}>
        <Text>User details modal</Text>
        <Button title="Send a message" onPress={() => Navigate()} />
        <Button title="Add friend" />
    </View>
  );
}