import { useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native'
import { search } from '../../../assets/styles/styles'
import { testUser } from '../../../models/testUser'

import SearchCard from './SearchCard'
import UserDetails from '../../UserDetails/UserDetails'

type Props = {
    param?: string
    navigation: any
}

const Search: React.FC<Props> = ({ param, navigation }) => {
  const [layer, setLayer] = useState(false)
  const [userId, setUserId] = useState(0)
  
  function OpenUserDetails(userId: number) {
    setUserId(userId)
    setLayer((value) => !value)
  }

  return (
        <View>
          {!layer && <View>
            <View style={search.header}>
              <Text style={search.title}>Search results for {param}</Text>
              <View style={search.separator} />
            </View>
            <ScrollView>
              <SearchCard 
                userId={testUser.userId}
                onPress={(userId) => {
                  OpenUserDetails(userId)
                }}
              />
            </ScrollView>
          </View>}
          {layer && <View>
            <UserDetails 
              userId={userId}
              navigation={navigation}
              onPress={() => {
                setLayer((value) => !value)
              }}
            />
          </View>}
        </View>
  );
}

export default Search