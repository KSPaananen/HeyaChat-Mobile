import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function StatsPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Profile page</Text>
        <Button title="Leaderboards" onPress={() => navigation.navigate("LeaderboardsPage")} />
    </View>
  );
}
