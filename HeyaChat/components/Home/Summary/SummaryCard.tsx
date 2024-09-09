import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/localDB/models'

interface Props {
  user: user
  onPress: (userId: number) => void
}

const SummaryCard: React.FC<Props> = ({ user, onPress }) => {
  let localization: string = "fi-FIN"
  let timeZone: string = "UTC"

  useEffect(() => {

  }, [])

  return (
    <TouchableHighlight onPress={() => onPress(user.userId)}>
      <View style={summaryCard.card}>
        <View style={summaryCard.cardItem}>
          <View style={summaryCard.itemLeft}>
            <Text style={summaryCard.username}>{user.username}</Text>
            <Text style={summaryCard.date}>{user.interactions?.dateMet.toLocaleString(localization, { timeZone: timeZone })}</Text>
          </View>
          <View style={summaryCard.itemRight}>
            <Image style={summaryCard.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default SummaryCard

export const summaryCard = StyleSheet.create({
  card: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
    height: 65,
    backgroundColor: '#0011',
  },
  cardItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  itemLeft: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemRight: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 5
  },
  date: {
    fontSize: 11,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingLeft: 5
  },
  title: {
    fontSize: 14,
    fontStyle: 'italic',
    paddingTop: 2,
    paddingLeft: 5
  },
  icon: {
    height: 50,
    width: 50, 
    marginRight: 7.5,
    borderRadius: 100,
  }
})