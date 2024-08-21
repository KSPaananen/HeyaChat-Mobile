import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function LeaderboardsPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Leaderboards</Text>
        <Button title="Sort by top 100 etc" />
        <Button title="Details" onPress={() => navigation.navigate("LiteDetailsModal")} />
    </View>
  );
}