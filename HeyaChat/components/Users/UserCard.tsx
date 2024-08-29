import { useEffect } from 'react';
import { Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import { user } from '../Users/UsersPage'
import { userCard } from '../../assets/styles/styles'

interface Props {
  user: user
  onPress1: (userId: string) => void // "UserDetailsPage"
  onPress2: (userId: string) => void // "DirectMessagePage"
}

const UserCard: React.FC<Props> = ({user, onPress1, onPress2 }) => {

  return (
    <TouchableHighlight onPress={() => onPress1(user.userId)}>
      <View style={userCard.card}>
        <View style={userCard.cardItem}>
          <View style={userCard.itemLeft}>
            <Image style={userCard.icon} source={require('../../assets/icons/favicon.png')} />
          </View>
          <View style={userCard.itemMiddle}>
            <Text style={userCard.title}>{user.username}</Text>
            <Text style={userCard.status}>Last message: {user.lastMessageDT}</Text>
            <Text style={userCard.text}>{user.lastMessage}</Text>
          </View>
          <View style={userCard.itemRight}>
            <TouchableOpacity onPress={() => onPress2(user.userId)}>
                <Image style={userCard.dmIcon} source={require('../../assets/icons/icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default UserCard