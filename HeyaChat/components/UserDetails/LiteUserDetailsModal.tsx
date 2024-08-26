import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

const LiteUserDetailsModal = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Lite version of user details modal</Text>
    </View>
  );
}

export default LiteUserDetailsModal