import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, ImageSourcePropType, ImageBackground, Pressable, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MessengerStackParams } from '../NavigationStacks/MessengerNavStack'
import { LinearGradient } from 'expo-linear-gradient'
import { profile } from '../../assets/styles/styles'
import { user } from '../../models/user'

import { testUser } from '../../models/testUser'

type Props = NativeStackScreenProps<MessengerStackParams, "UserProfile">

const UserProfile: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params

  // GUI related variables
  const [isFriends, setIsFriends] = useState<boolean>(false)
  const [expandedDescription, setExpandedDescription] = useState<boolean>(false)
  const [fadeHeight, setFadeHeight] = useState<number>(60)

  const [user, setUser] = useState<user>(testUser)

  // User related variables
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

          <ImageBackground style={profile.banner} imageStyle={{ borderRadius: 0 }} source={banner} resizeMode="cover" />

          <View style={{ position: 'absolute', top: 70, left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
            <View style={profile.profileIconBackground} />
            <Image style={profile.profileIcon} source={icon} />
          </View>

          {title != "" && <View style={profile.titleBackground}>
            <Text style={profile.title}>{title}</Text>
          </View>}

          <View style={{ ...profile.headSection, ...{ marginTop: 55, alignItems: 'center', } }}>
            <Text style={profile.displayname}>{displayname}</Text>
            <Text style={profile.username}>{username}</Text>

            {isFriends && <View style={{ flexDirection: 'row'}}>
              <Pressable style={profile.primaryButton} onPress={() => navigation.navigate("Messenger", { screen: "ChatPage", params: { userId: userId }})} >
                <Text style={profile.buttonText}>Send message</Text>
              </Pressable>
              <Pressable style={profile.primaryButton}>
                <Text style={profile.buttonText}>Add friend</Text>
              </Pressable>
            </View>}

            {!isFriends && <View style={{ flexDirection: 'row'}}>
              <Pressable style={profile.primaryButton} onPress={() => navigation.navigate("Messenger", { screen: "ChatPage", params: { userId: userId }})} >
                <Text style={profile.buttonText}>Send message</Text>
              </Pressable>
              <Pressable style={profile.primaryButton}>
                <Text style={profile.buttonText}>Add friend</Text>
              </Pressable>
            </View>}
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

          <Text>Body</Text>
          
        </View>
    </ScrollView>
  );
}

export default UserProfile