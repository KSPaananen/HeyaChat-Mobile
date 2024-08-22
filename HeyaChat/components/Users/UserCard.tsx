import { useEffect } from 'react';
import { Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { userCard } from '../../assets/styles/styles'

export default function UserCard() {
  const navigation = useNavigation()

  function EvaluatePress(id: string) {
    if (id == "UserDetails") {
        navigation.navigate("UserDetailsPage")
    } else if (id == "DirectMessage") {
        navigation.navigate("DirectMessagePage")
    }
  }

  return (
    <TouchableHighlight onPress={() => EvaluatePress("UserDetails")}>
      <View style={userCard.card}>
        <View style={userCard.cardItem}>
          <View style={userCard.itemLeft}>
            <Image style={userCard.icon} source={require('../../assets/icons/favicon.png')} />
          </View>
          <View style={userCard.itemMiddle}>
            <Text style={userCard.title}>Profile name</Text>
            <Text style={userCard.status}>Last seen: 13:08</Text>
            <Text style={userCard.text}>Last message</Text>
          </View>
          <View style={userCard.itemRight}>
            <TouchableOpacity onPress={() => EvaluatePress("DirectMessage")}>
                <Image style={userCard.dmIcon} source={require('../../assets/icons/icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}