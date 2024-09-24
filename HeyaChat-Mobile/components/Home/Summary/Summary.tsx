import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { users } from '../../../models/localDB/models'
import { testUser } from '../../../models/testUser'

import SummaryCard from './SummaryCard'
import UserDetails from '../../UserDetails/UserDetails'


type Props = {
  navigation: any
}

const Summary: React.FC<Props> = ({ navigation }) => {
  const [layer, setLayer] = useState(false)
  const [userId, setUserId] = useState(0)

  const usersList: users[] = []
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
        <Text style={summary.title}>{titles[0]}</Text>
          {usersList.map((user, index) => (
            <SummaryCard 
              key={index}
              user={user}
              onPress={(userId) => {
                OpenUserDetails(user.userID)
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

export const summary = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10
  },
})