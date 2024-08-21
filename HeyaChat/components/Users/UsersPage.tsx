import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function UserPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Users page</Text>
        <Button title="View users profile" onPress={() => navigation.navigate("UserDetailsPage")} />
        <Button title="Direct message a user" onPress={() => navigation.navigate("DirectMessagePage")} />
    </View>
  );
}
