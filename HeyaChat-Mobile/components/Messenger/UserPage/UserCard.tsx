import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import { user } from '../../../models/sqlite/models'

interface Props {
  user: user
  onPress1: (userId: number) => void // "UserDetailsPage"
  onPress2: (userId: number) => void // "DirectMessagePage"
}

const UserCard: React.FC<Props> = ({user, onPress1, onPress2 }) => {
  let localization: string = "fi-FIN"
  let timeZone: string = "UTC"

  return (
    <TouchableHighlight onPress={() => onPress1(user.userId)}>
      <View style={userCard.card}>
        <View style={userCard.cardItem}>
          <View style={userCard.itemLeft}>
            <Image style={userCard.icon} source={require('../../../assets/icons/icon.png')} />
          </View>
          <View style={userCard.itemMiddle}>
            <Text style={userCard.title}>{user.username}</Text>
            <Text style={userCard.status}>Last message: {user.interactions?.dateMet.toLocaleString(localization, { timeZone: timeZone })}</Text>
            <Text style={userCard.text}>{user.interactions?.lastMessage}</Text>
          </View>
          <View style={userCard.itemRight}>
            <TouchableOpacity onPress={() => onPress2(user.userId)}>
                <Image style={userCard.dmIcon} source={require('../../../assets/icons/icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default UserCard

export const userCard = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginTop: 5,
    height: 75,
    backgroundColor: '#0011',
  },
  cardItem: {
    flex: 1,
    flexDirection: 'row',
  },
  itemLeft: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemMiddle: {
    flex: 1.3,
    paddingLeft: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemRight: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    paddingTop: 5,
  },
  status: {
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  text: {
    fontSize: 13,
    paddingTop: 0
  },
  icon: {
    borderRadius: 100,
    height: 60,
    width: 60,
    marginTop: 7.5,
    marginLeft: 7.5,
  },
  dmIcon: {
    borderRadius: 5,
    height: 75,
    width: 60,
  }
})