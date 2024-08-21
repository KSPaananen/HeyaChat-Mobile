import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function SummaryPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Summary page of users seen</Text>
        <Button title="Users details" onPress={() => navigation.navigate("UserDetailsModal")} />
    </View>
  );
}
