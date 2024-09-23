import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { user } from '../../../models/localDB/models'

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
      <View style={card.card}>
        <View style={card.cardItem}>
          <View style={card.itemLeft}>
            <Text style={card.username}>{user.username}</Text>
            <Text style={card.title}>{user.profile?.title}</Text>
          </View>
          <View style={card.itemRight}>
            <Image style={card.icon} source={require('../../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default SearchCard 


export const card = StyleSheet.create({
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