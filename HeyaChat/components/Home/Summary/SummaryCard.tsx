import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/localDB/models'
import { modalCard } from '../../../assets/styles/stylesheet'

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
      <View style={modalCard.card}>
        <View style={modalCard.cardItem}>
          <View style={modalCard.itemLeft}>
            <Text style={modalCard.username}>{user.username}</Text>
            <Text style={modalCard.date}>{user.interactions?.dateMet.toLocaleString(localization, { timeZone: timeZone })}</Text>
          </View>
          <View style={modalCard.itemRight}>
            <Image style={modalCard.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default SummaryCard