import { Text, View, ScrollView, Pressable } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'
import { ProfileStackParams } from '../NavigationStacks/ProfileNavStack'
import { profile } from '../../assets/styles/styles'

const ProfilePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>()

  return (
    <Pressable style={profile.button} onPress={() => navigation.navigate("LeaderboardsPage")}>
      <Text style={profile.buttonText}>Leaderboards</Text>
    </Pressable>

  );
}

export default ProfilePage