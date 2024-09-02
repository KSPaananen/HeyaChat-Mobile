import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, TouchableOpacity, ImageBackground, Image, ImageSourcePropType } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'
import { ProfileStackParams } from '../NavigationStacks/ProfileNavStack'
import { profile } from '../../assets/styles/styles'
import { user } from '../../models/user'

import { testUser } from '../../models/testUser'

const ProfilePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>()
  
  // GUI related variables
  const [expandedDescription, setExpandedDescription] = useState<boolean>(false)
  const [fadeHeight, setFadeHeight] = useState<number>(60)

  const [user, setUser] = useState<user>(testUser)

  // User object related variables
  const [icon, setIcon] = useState<ImageSourcePropType>(user.profile?.icon ?? require('../../assets/icons/icon.png'))
  const [banner, setBanner] = useState<ImageSourcePropType>(user.profile?.banner ?? require('../../assets/icons/icon.png'))
  const [displayname, setDisplayname] = useState<string>(user.profile?.displayname ?? "")
  const [username, setUsername] = useState<string>(user.username ?? "")
  const [title, setTitle] = useState<string>(user.profile?.title ?? "")
  const [description, setDescription] = useState<string>(user.profile?.description ?? "")

  const shortDescription: string = description.slice(0, 47)

  return (
    <ScrollView style={profile.container}>
      <View style={profile.descriptionWrapper}>

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

          {title != "" && <View style={profile.titleBackground}>
            <Text style={profile.title}>{title}</Text>
          </View>}

          <View style={{ ...profile.headSection, ...{ marginTop: 55, alignItems: 'center', } }}>
            <Pressable style={{ flexDirection: 'row'}}>
              <Text style={profile.displayname}>{displayname}</Text>
              <Image style={profile.editIcon} source={require('../../assets/icons/icon.png')} />
            </Pressable>
            <Text style={profile.username}>{username}</Text>
          </View>

        </View>

        <View style={profile.headSection}>
              <View style={profile.descriptionContainer}>
                {!expandedDescription && <View>
                    <Text style={profile.descriptionTitle}>About me</Text>
                    <Text style={profile.description}>{shortDescription}...</Text>
                </View>}
                {expandedDescription && <View>
                  <Pressable onPress={() => {setExpandedDescription((value) => !value); setFadeHeight(60)}}>
                    <Text style={profile.descriptionTitle}>About me</Text>
                    <Text style={profile.description}>{description}</Text>
                  </Pressable>
                </View>}
              </View>
            </View>

            {/* Move descriptions expanding pressable here because lineargradient blocks the original */}
            <Pressable onPress={() => {setExpandedDescription((value) => !value); setFadeHeight(0)}}>
              <LinearGradient
                colors={['transparent', `rgba(0, 0, 0, 0.9)`]}
                style={{ ...profile.descriptionFade, ...{ height: fadeHeight } }}
              />
            </Pressable>
          
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