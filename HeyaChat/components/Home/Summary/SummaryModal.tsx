import { useEffect } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../NavigationStacks/HomeNavStack'
import { modals } from '../../../assets/styles/styles'

import SummaryCard from './SummaryCard'

export type summaryUser = {
  userId: string
  username: string
  dateMet: string
  title: string
}

type Props = NativeStackScreenProps<RootStackParams, "SummaryModal">

const SummaryModal= ({ navigation }: Props) => {
  const usersList: summaryUser[] = [
    { userId: "0", username: "username0", dateMet: "1/1/1111", title: "title0"},
    { userId: "1", username: "username1", dateMet: "1/1/1111", title: "title1"},
    { userId: "2", username: "username2", dateMet: "1/1/1111", title: "title2"}
  ]

  const titles: string[] = [
    "Woah! You've met a lot of people today!", 
  ]

  useEffect(() => {
    // Look up all met users from local storage

  })

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback>
          <View style={modals.modal}>
              <Text style={modals.title}>{titles[0]}</Text>

              {usersList.map((user, index) => (
                <SummaryCard 
                  key={index}
                  user={user}
                  onPress={(userId) => {
                    navigation.navigate("UserDetailsModal", {userId: user.userId})}}/>
              ))}
                  
              <View style={modals.ol}>
              <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => navigation.goBack()}>
                <Image style={modals.olExitIcon} source={require('../../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SummaryModal