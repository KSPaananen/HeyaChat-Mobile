import { useEffect, useState } from 'react';
import { Text, View, Image, ImageSourcePropType, TouchableOpacity, ImageBackground, Pressable, Button } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { profile } from '../../assets/styles/styles'
import { user } from '../../models/user'

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
  const [fadeValue, setFadeValue] = useState<number>(0.9)

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
    navigation.navigate("Users")
    setTimeout(
      () => navigation.navigate("Users", { screen: "DirectMessagePage", params: { userId: userId }}), 
    50)
  }

  return (
    <View>
      <View style={profile.descriptionWrapper}>
        <View style={profile.head}>

          <ImageBackground style={profile.banner} imageStyle={{ borderRadius: 15 }} source={banner} resizeMode="cover" />

          {title != "" && <View style={profile.titleBackground}>
            <Text style={profile.title}>{title}</Text>
          </View>}
        
          <View style={{ position: 'absolute', top: 70, left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
            <View style={profile.profileIconBackground} />
            <Image style={profile.profileIcon} source={icon} />
          </View>

          <View style={{ ...profile.headSection, ...{ marginTop: 50, alignItems: 'center', } }}>
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
                  <Pressable onPress={() => {setExpandedDescription(false); setFadeValue(0.9)}}>
                    <Text style={profile.descriptionTitle}>About me</Text>
                    <Text style={profile.description}>{description}</Text>
                  </Pressable>
                </View>}
              </View>
            </View>

            {/* Move descriptions expanding pressable here because lineargradient blocks the original */}
            <Pressable onPress={() => {setExpandedDescription(true); setFadeValue(0)}}>
              <LinearGradient
                colors={['transparent', `rgba(0, 0, 0, ${fadeValue})`]}
                style={profile.descriptionFade}
              />
            </Pressable>
      </View>
      
        <View style={profile.body}>
          <Text>Body</Text>
        </View>
    
      <View style={{ justifyContent: 'flex-end'}}>
        <Button title="Go back" onPress={() => onPress()} />
      </View>
    </View>
  );
}

export default UserDetails