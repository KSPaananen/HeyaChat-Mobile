import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function UserDetailsPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>User details page</Text>
        <Button title="Send a message" onPress={() => navigation.navigate("Users", { screen: "DirectMessagePage"})} />
        <Button title="Add friend" />
    </View>
  );
}