import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/localDB/models'
import { modalCard } from '../../../assets/styles/styles'

import { testUser } from '../../../models/testUser'

interface Props {
  userId: number
  onPress: (userId: number) => void
}

const SearchCard: React.FC<Props> = ({ userId, onPress }) => {
    // Placeholder user object
    let user: user = testUser

  return (
    <TouchableHighlight onPress={() => onPress(user.userId)}>
      <View style={modalCard.card}>
        <View style={modalCard.cardItem}>
          <View style={modalCard.itemLeft}>
            <Text style={modalCard.username}>{user.username}</Text>
            <Text style={modalCard.title}>{user.profile?.title}</Text>
          </View>
          <View style={modalCard.itemRight}>
            <Image style={modalCard.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default SearchCard 