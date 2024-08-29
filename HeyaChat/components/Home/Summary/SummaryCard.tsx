import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/user'
import { summaryCard } from '../../../assets/styles/styles'

interface Props {
  user: user
  onPress: (userId: number) => void
}

const SummaryCard: React.FC<Props> = ({ user, onPress }) => {

  return (
    <TouchableHighlight onPress={() => onPress(user.userId)}>
      <View style={summaryCard.card}>
        <View style={summaryCard.cardItem}>
          <View style={summaryCard.itemLeft}>
            <Text style={summaryCard.text}>{user.username}</Text>
            <Text style={summaryCard.text}>{user.interactions?.dateMet.toLocaleString('en-GB', { timeZone: 'UTC' })}</Text>
          </View>
          <View style={summaryCard.itemMiddle}>
            <Text style={summaryCard.text}></Text>
            <Text style={summaryCard.text}>{user.profile?.title}</Text>
          </View>
          <View style={summaryCard.itemRight}>
            <Image style={summaryCard.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default SummaryCard