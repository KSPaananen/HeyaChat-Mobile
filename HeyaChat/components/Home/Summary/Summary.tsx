import { useEffect, useState } from 'react';
import { Text, View } from 'react-native'
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

  const usersList: user[] = [
    { userId: 0, username: "username0", email: "TestEmail0", interactions: null, profile: null },
    { userId: 1, username: "username1", email: "TestEmail1", interactions: null, profile: null },
  ]
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
      {!layer && <View>
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
      </View>}
      {layer && <View>
        <UserDetails 
          userId={userId}
          navigation={navigation}
          onPress={() => setLayer(value => !value)}
        />
      </View>}
    </View>
  );
}

export default Summary