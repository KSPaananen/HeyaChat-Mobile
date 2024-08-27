import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { styles } from '../../assets/styles/styles'
import { RootStackParams } from '../NavigationStacks/HomeNavStack'

type Props = NativeStackScreenProps<RootStackParams, "HomePage">

const HomePage: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Text>Home page</Text>
        <Text>Here you can see names or characters of the people you've met and 
          click them individually to see more details or click on summary to see them in a list.</Text>
        <View style={styles.ol}>
          <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => 
            navigation.navigate("SummaryModal")
          }>
            <Image style={styles.olSummaryIcon} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomePage