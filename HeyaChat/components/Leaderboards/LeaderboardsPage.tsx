import { Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/ProfileNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "LeaderboardsPage">

const LeaderboardsPage: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Text>Leaderboards</Text>
        <Button title="Sort by top 100 etc" />
        <Button title="Details" onPress={() => navigation.navigate("LiteUserDetailsModal")} />
    </View>
  );
}

export default LeaderboardsPage