import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function SettingsPage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Settings page</Text>
    </View>
  );
}
