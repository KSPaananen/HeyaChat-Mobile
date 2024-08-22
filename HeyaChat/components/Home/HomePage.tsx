import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function HomePage() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text>Home page</Text>
        <Text>Here you can see names or characters of the people you've met and 
          click them individually to see more details or click on summary to see them in a list.</Text>
        <Button title="Summary" onPress={() => navigation.navigate("SummaryModal")} />
    </View>
  );
}
