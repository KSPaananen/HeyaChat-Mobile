import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import SearchCard from './SearchCard'
import UserDetails from '../../UserDetails/UserDetails'

type Props = {
    param?: string
    navigation: any
}

const Search: React.FC<Props> = ({ param, navigation }) => {
  const [layer, setLayer] = useState(false)
  const [userId, setUserId] = useState(0)

  const tempUser = {
    userId: 0
  }
  
  function OpenUserDetails(userId: number) {
    setUserId(userId)
    setLayer((value) => !value)
  }

  return (
    <View style={search.container}>
      {!layer && <View>
        <View style={search.header}>
          <Text style={search.title}>Search results for {param}</Text>
          <View style={search.separator} />
      </View>
      <ScrollView>
        <SearchCard 
          userId={tempUser.userId}
          onPress={(userId) => {
            OpenUserDetails(userId)
          }}
        />
      </ScrollView>
      </View>}
      {layer && <ScrollView>
        <UserDetails 
          userId={userId}
          navigation={navigation}
          onPress={() => {
            setLayer((value) => !value)
          }}
        />
      </ScrollView>}
    </View>
  );
}

export default Search

export const search = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'rgb(245, 245, 245)'
  },
  header: {
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 5
  },
  title: {
    fontSize: 20
  },
  separator: {
    flex: 1,
    padding: 0.5,
    marginTop: 10,
    backgroundColor: 'black'
  }
})