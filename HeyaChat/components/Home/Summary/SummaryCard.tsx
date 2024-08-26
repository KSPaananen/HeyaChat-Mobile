import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { summaryUser } from '../Summary/SummaryModal'
import { summaryCard } from '../../../assets/styles/styles'

interface Props {
  user: summaryUser
  onPress: (userId: string) => void
}

const SummaryCard: React.FC<Props> = ({ user, onPress }) => {

  return (
    <TouchableHighlight onPress={() => onPress(user.userId)}>
      <View style={summaryCard.card}>
        <View style={summaryCard.cardItem}>
          <View style={summaryCard.itemLeft}>
            <Text style={summaryCard.text}>{user.username}</Text>
            <Text style={summaryCard.text}>{user.dateMet}</Text>
          </View>
          <View style={summaryCard.itemMiddle}>
            <Text style={summaryCard.text}></Text>
            <Text style={summaryCard.text}>{user.title}</Text>
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