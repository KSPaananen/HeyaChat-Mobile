import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { user } from '../../../models/localDB/models'

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