import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, TouchableOpacity, ImageBackground, Image, ImageSourcePropType } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'
import { ProfileStackParams } from '../NavigationStacks/ProfileNavStack'
import { profile } from '../../assets/styles/styles'
import { user } from '../../models/user'

import { testUser } from '../../models/testUser'

const ProfilePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>()
  
  const [user, setUser] = useState<user>(testUser)

  const [icon, setIcon] = useState<ImageSourcePropType>(user.profile?.icon ?? require('../../assets/icons/icon.png'))
  const [banner, setBanner] = useState<ImageSourcePropType>(user.profile?.banner ?? require('../../assets/icons/icon.png'))
  const [displayname, setDisplayname] = useState<string>(user.username)
  const [username, setUsername] = useState<string>(user.username)

  return (
    <ScrollView style={profile.container}>
        <View style={profile.head}>
          <TouchableOpacity>
            <ImageBackground style={profile.banner} source={banner} resizeMode="cover" />
          </TouchableOpacity>
          <View style={{position: 'absolute', top: 70, left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
            <View style={profile.profileIconBackground} />
            <TouchableOpacity>
              <Image style={profile.profileIcon} source={icon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={{ ...profile.headSection, ...{ marginTop: 50, alignItems: 'center', } }}>
            <Pressable style={{ flexDirection: 'row'}}>
              <Text style={profile.displayname}>{displayname}</Text>
              <Image style={profile.editIcon} source={require('../../assets/icons/icon.png')} />
            </Pressable>
            <Text style={profile.username}>{username}</Text>
          </View>
        </View>

        <View style={profile.body}>
          <View style={profile.section}>
              <Pressable style={profile.primaryButton} onPress={() => navigation.navigate("LeaderboardsPage")}>
                <Text style={profile.buttonText}>Leaderboards</Text>
              </Pressable>
          </View>
        </View>
    </ScrollView>
  );
}

export default ProfilePage