import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

export default function HomePage() {
  const navigation = useNavigation()

  function EvaluatePress(destination: string) {
    navigation.navigate(destination)
  }

  return (
    <View style={styles.container}>
        <Text>Home page</Text>
        <Text>Here you can see names or characters of the people you've met and 
          click them individually to see more details or click on summary to see them in a list.</Text>
        <View style={styles.ol}>
          <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => EvaluatePress("SummaryModal")}>
            <Image style={styles.olSummaryIcon} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
      </View>
    </View>
  );
}
