import { Text, View, Button } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'
import { RootStackParams } from '../NavigationStacks/ProfileNavStack'
import { styles } from '../../assets/styles/styles'

const ProfilePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  return (
    <View style={styles.container}>
        <Text>Profile page</Text>
        <Button title="Leaderboards" onPress={() => navigation.navigate("LeaderboardsPage")} />
    </View>
  );
}

export default ProfilePage