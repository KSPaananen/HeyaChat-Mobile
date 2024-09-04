import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { modals } from '../../../assets/styles/styles'
import { user } from '../../../models/user'
import { testUser } from '../../../models/testUser'

type Props = {
  navigation: any
}

const FriendRequests: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
    

  })

  return (
    <View>
      <Text>Friendrequests</Text>
    </View>
  );
}

export default FriendRequests