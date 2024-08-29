import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/user'
import { testUser } from '../../../models/testUser'
import { searchCard } from '../../../assets/styles/styles'

interface Props {
  userId: number
  onPress: (userId: number) => void
}

const SearchCard: React.FC<Props> = ({ userId, onPress }) => {
    // Placeholder user object
    let user: user = testUser

  return (
    <TouchableHighlight onPress={() => onPress(user.userId)}>
      <View style={searchCard.card}>
        <View style={searchCard.cardItem}>
          <View style={searchCard.itemLeft}>
            <Text style={searchCard.text}>{user.username}</Text>
            <Text style={searchCard.text}>{user.interactions?.dateMet.toLocaleString('en-GB', { timeZone: 'UTC' })}</Text>
          </View>
          <View style={searchCard.itemMiddle}>
            <Text style={searchCard.text}></Text>
            <Text style={searchCard.text}>{user.profile?.title}</Text>
          </View>
          <View style={searchCard.itemRight}>
            <Image style={searchCard.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default SearchCard 