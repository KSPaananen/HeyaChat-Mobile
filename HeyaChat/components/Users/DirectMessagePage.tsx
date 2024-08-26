import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

const DirectMessagePage = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Direct message page</Text>
    </View>
  );
}

export default DirectMessagePage