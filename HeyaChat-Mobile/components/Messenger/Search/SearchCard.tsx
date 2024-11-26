import { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'

interface Props {
  userId: number
  onPress: (userId: number) => void
}

const SearchCard: React.FC<Props> = ({ userId, onPress }) => {
  // Placeholder user object
  const tempUser = {
    userId: 0,
    username: 'tempUser',
    profile: {
      icon: require('../../../assets/icons/icon.png'),
      banner: require('../../../assets/icons/icon.png'),
      title: "testTitle",
      displayname: 'displayName',
      description: 'test description'
    },

  }

  return (
    <TouchableHighlight onPress={() => onPress(tempUser.userId)}>
      <View style={card.card}>
        <View style={card.cardItem}>
          <View style={card.itemLeft}>
            <Text style={card.username}>{tempUser.username}</Text>
            <Text style={card.title}>{tempUser.profile?.title}</Text>
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