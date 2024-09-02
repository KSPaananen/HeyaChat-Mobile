import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { modals } from '../../../assets/styles/styles'
import { user } from '../../../models/user'
import { testUser } from '../../../models/testUser'

import SummaryCard from './SummaryCard'
import UserDetails from '../../UserDetails/UserDetails'


type Props = {
  navigation: any
}

const Summary: React.FC<Props> = ({ navigation }) => {
  const [layer, setLayer] = useState(false)
  const [userId, setUserId] = useState(0)

  const usersList: user[] = []
  usersList.push(testUser)
  usersList.push(testUser)

  const titles: string[] = [
    "Woah! You've met a lot of people today!", 
  ]

  useEffect(() => {
    // Look up all met users from local storage

  })

  function OpenUserDetails(userId: number) {
    // Set userId & hide Summarycard
    setUserId(userId)
    setLayer(true)
  }

  return (
    <View>
      {!layer && <ScrollView>
        <Text style={modals.title}>{titles[0]}</Text>
          {usersList.map((user, index) => (
            <SummaryCard 
              key={index}
              user={user}
              onPress={(userId) => {
                OpenUserDetails(user.userId)
              }}
            />
          ))}
      </ScrollView>}
      {layer && <ScrollView>
        <UserDetails 
          userId={userId}
          navigation={navigation}
          onPress={() => setLayer(value => !value)}
        />
      </ScrollView>}
    </View>
  );
}

export default Summary