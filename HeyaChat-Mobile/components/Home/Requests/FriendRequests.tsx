import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'

type Props = {
  navigation: any
}

const FriendRequests: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
    

  })

  return (
    <View style={requests.container}>
      <Text>Friendrequests</Text>
    </View>
  );
}

export default FriendRequests

export const requests = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgb(245, 245, 245)'
  }
  
})