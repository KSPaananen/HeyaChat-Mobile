import { useEffect, useState } from 'react';
import { Text, View, Image, ImageSourcePropType, ImageBackground, Pressable, Button } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { profile } from '../../assets/styles/profileSheet'
import { user } from '../../models/sqlite/models'

import { testUser } from '../../models/testUser'

type Props = {
  userId: number
  navigation: any
  onPress: () => void
}

const UserDetails: React.FC<Props> = ({ userId, navigation, onPress }) => {
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

  useEffect(() => {
    // Take userId and get user data from db
    
  })

  function Navigate() {
    // Reset Home to first page
    navigation.dispatch(StackActions.popToTop())
    // Navigate first to bottom page and then to direct messages to maintain navigation stack
    navigation.navigate("Messenger")
    setTimeout(
      () => navigation.navigate("Messenger", { screen: "ChatPage", params: { userId: userId }}), 
    50)
  }

  return (
    <View style={profile.container}>
      <View style={profile.descriptionWrapper}>
        <View style={profile.head}>

          <ImageBackground style={profile.banner} imageStyle={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} source={banner} resizeMode="cover" />
        
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
              <Pressable style={profile.primaryButton} onPress={() => Navigate()} >
                <Text style={profile.buttonText}>Send message</Text>
              </Pressable>
              <Pressable style={profile.primaryButton}>
                <Text style={profile.buttonText}>Add friend</Text>
              </Pressable>
            </View>}

            {!isFriends && <View style={{ flexDirection: 'row'}}>
              <Pressable style={profile.primaryButton} onPress={() => Navigate()} >
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

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
          <Button title="Go back" onPress={() => onPress()} />
        </View>

    </View>
  );
}

export default UserDetails