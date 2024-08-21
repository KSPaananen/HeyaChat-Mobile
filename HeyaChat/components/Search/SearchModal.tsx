import { Text, View, Button, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function SearchModal() {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
        <Text>Search modal</Text>
        <TextInput placeholder="placeholder for textinput" />
        <Button title="Search icon" />
    </View>
  );
}