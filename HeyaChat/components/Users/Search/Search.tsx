import { useState } from 'react';
import { Text, View, Button } from 'react-native'
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
            <Text>Searched for: {param}</Text>
            <SearchCard 
              userId={testUser.userId}
              onPress={(userId) => {
                OpenUserDetails(userId)
              }}
            />
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