import { useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/HomeNavStack'
import { StackActions } from '@react-navigation/native'
import { modals } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "UserDetailsModal">

const UserDetailsModal: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params

  useEffect(() => {
    // Take userId and get user data from db
    
  })

  function Navigate() {
    // Reset Home to first page
    navigation.dispatch(StackActions.popToTop())
    // Navigate first to bottom page and then to direct messages to maintain navigation stack
    navigation.navigate("Users", { screen: "UsersPage"})
    navigation.navigate("Users", { screen: "DirectMessagePage"})
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.getParent()?.goBack()}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback>
          <View style={modals.modal}>
            <Text>userId: {route.params.userId}</Text>
            <Button title="Send a message" onPress={() => Navigate()} />
            <Button title="Add friend" />
            <View style={modals.ol}>
              <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => navigation.getParent()?.goBack()}>
                <Image style={modals.olExitIcon} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default UserDetailsModal