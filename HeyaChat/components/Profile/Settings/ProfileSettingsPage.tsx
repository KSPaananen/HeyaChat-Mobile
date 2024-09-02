import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, ImageBackground, Pressable, ImageSourcePropType } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SettingsStackParams } from '../../NavigationStacks/SettingsNavStack'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInput } from "react-native-paper"
import { settings } from '../../../assets/styles/styles'

import { testUser } from '../../../models/testUser'


type Props = NativeStackScreenProps<SettingsStackParams, "ProfileSettings">

const ProfileSettingsPage: React.FC<Props> = ({ navigation }) => {
  // GUI state stuff
  const [profileButtons, setProfileButtons] = useState<boolean>(false)
  const [mfaStatus, setMfaStatus] = useState<boolean>(false)

  // New values
  const [displayname, setDisplayname] = useState<string>(testUser.username)
  const [description, setDescription] = useState<string>(testUser.profile?.description ?? "")
  const [title, setTitle] = useState<string>(testUser.profile?.title ?? "")
  const [username, setUsername] = useState<string>(testUser.username)
  const [email, setEmail] = useState<string>(testUser.email)
  const [phone, setPhone] = useState<string>(testUser.phone)
  const [icon, setIcon] = useState<ImageSourcePropType>(testUser.profile?.icon ?? require('../../../assets/icons/icon.png'))
  const [banner, setBanner] = useState<ImageSourcePropType>(testUser.profile?.banner ?? require('../../../assets/icons/icon.png'))

  // Old values
  const [oldDisplayname, setOldDisplayname] = useState<string>(displayname)
  const [oldDescription, setOldDescription] = useState<string>(description)
  const [oldTitle, setOldTitle] = useState<string>(title)
  const [oldUsername, setOldUsername] = useState<string>(username)
  const [oldEmail, setOldEmail] = useState<string>(email)
  const [oldPhone, setOldPhone] = useState<string>(phone)
  const [oldIcon, setOldIcon] = useState<ImageSourcePropType>(icon)
  const [oldBanner, setOldBanner] = useState<ImageSourcePropType>(banner)

  const titleList = [
    {key: "0", value: "Title 0"},
    {key: "1", value: "Title 1"},
    {key: "2", value: "Title 2"},
    {key: "3", value: "Title 3"},
  ]

  useEffect(() => {

    // TextInputs trigger OnChangeText when default values are loaded so manually set profileButtons to false
    setProfileButtons(false)
  }, [])

  function CancelChanges(type: string) {
    // Restore old values
      setDisplayname(oldDisplayname)
      setTitle(oldTitle)
      setDescription(oldDescription)
      setUsername(oldUsername)
      setEmail(oldEmail)
      setPhone(oldPhone)
      setIcon(oldIcon)
      setBanner(oldBanner)
    
    // Hide buttons
    setProfileButtons(false)
  }

  function SaveChanges(type: string) {
    // Save changes to DB

    // Hide buttons
    setProfileButtons(false)
  }

  return (
    <ScrollView style={settings.container}>

      <View style={settings.wrapper}>
        <View style={settings.head}>
          <TouchableOpacity>
            <ImageBackground style={settings.banner} imageStyle={{ borderRadius: 10 }} source={banner} resizeMode="cover">

            </ImageBackground>
          </TouchableOpacity>
            <TouchableOpacity>
              <View style={settings.profileIconBackground} />
              <Image style={settings.profileIcon} source={icon} />
            </TouchableOpacity>
        </View>
        <View style={settings.body}>
          <View style={settings.section}>
            <Text style={settings.h3}>Display name</Text>
            <TextInput style={settings.input} 
              dense
              mode="outlined"
              contentStyle={{ paddingLeft: 10 }}
              value={displayname} 
              onChangeText={(value) => {setDisplayname(value); setProfileButtons(true)}}
              underlineStyle={{ height: 0}}
            />
          </View>
          <View style={settings.section}>
            <Text style={settings.h3}>Title</Text>
            <View style={{ marginRight: 100, paddingTop: 5 }}>
              <SelectList 
                search={false}
                save="value"
                maxHeight={250}
                notFoundText="No titles found"
                data={titleList}
                setSelected={() => {setTitle; setProfileButtons(true)}} 
                defaultOption={{key: 0, value: title}}
              />
            </View>
          </View>
          <View style={settings.section}>
            <Text style={settings.h3}>Description</Text>
            <TextInput style={{ ...settings.input, ...{ height: 100 }}} 
              dense
              multiline={true}
              mode="outlined"
              contentStyle={{ paddingTop: 10, paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'flex-start',}}
              value={description} 
              onChangeText={(value) => {setDescription(value); setProfileButtons(true)}}
              underlineStyle={{ height: 0}}
            />
          </View>
          <View style={settings.section}>
            {profileButtons && <View style={{ flexDirection: 'row' }}>
              <Pressable style={{ ...settings.button }} onPress={() => SaveChanges("Profile")}>
                <Text style={settings.buttonText}>Save</Text>
              </Pressable>
              <Pressable style={{ ...settings.button }} onPress={() => CancelChanges("Profile")}>
                <Text style={settings.buttonText}>Cancel</Text>
              </Pressable>
            </View>}
          </View>
        </View>
      </View>

      <View style={settings.wrapper}>
        <View style={settings.head}>
          <View style={{ flexDirection: 'row' }}>
            <View style={settings.separator}></View>
              <Text style={settings.h1}> Account </Text>
            <View style={settings.separator}></View>
          </View>
        </View>
        <View style={settings.body}>
          <View style={settings.section}>
            <Text style={settings.h3}>Username</Text>
            <TextInput style={settings.input} 
              dense
              mode="outlined"
              contentStyle={{ paddingLeft: 10 }}
              value={username} 
              onChangeText={(value) => {setUsername(value); setProfileButtons(true)}}
              underlineStyle={{ height: 0}}
            />
            </View>
            <View style={settings.section}>
              <Text style={settings.h3}>Email</Text>
              <TextInput style={settings.input} 
                dense
                mode="outlined"
                contentStyle={{ paddingLeft: 10 }}
                value={email} 
                onChangeText={(value) => {setUsername(value); setProfileButtons(true)}}
                underlineStyle={{ height: 0}}
              />
            </View>
            <View style={settings.section}>
              <Text style={settings.h3}>Phone number</Text>
              <TextInput style={settings.input} 
                dense
                mode="outlined"
                contentStyle={{ paddingLeft: 10 }}
                value={phone} 
                onChangeText={(value) => {setUsername(value); setProfileButtons(true)}}
                underlineStyle={{ height: 0}}
              />
          </View>
          <View style={{ ...settings.section, ...{paddingTop: 10} }}>
            {mfaStatus && <View>
              <Text style={settings.bodyTitle}>Multi-factor authentication <Text style={{ ...settings.bodyTitle, ...{ color: 'green' }}}>Enabled</Text></Text>
              <Pressable style={{ ...settings.button,  ...{marginLeft: 25, borderColor: 'red'} }}>
                <Text style={settings.buttonText}>Disable</Text>
              </Pressable>
            </View>}
            {!mfaStatus && <View>
              <Text style={settings.bodyTitle}>Multi-factor authentication <Text style={{ ...settings.bodyTitle, ...{ color: 'red' }}}>Disabled</Text></Text>
              <Pressable style={{ ...settings.button,  ...{ backgroundColor: 'green' } }}>
                <Text style={settings.buttonText}>Enable</Text>
              </Pressable>
            </View>}
          </View>
          <View style={settings.section}>
            
          </View>
        </View>
      </View>

      <View style={settings.wrapper}>
        <View style={settings.head}>
        <View style={{ flexDirection: 'row' }}>
            <View style={settings.separator}></View>
              <Text style={settings.h1}> Your data </Text>
            <View style={settings.separator}></View>
          </View>
        </View>
        <View style={settings.body}>

        </View>
      </View>

    </ScrollView>
  )
}

export default ProfileSettingsPage
