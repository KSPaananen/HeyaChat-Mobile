import { Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native'
import { modals } from '../../assets/styles/styles'

export default function UserDetailsModal() {
  const navigation = useNavigation()

  function Navigate() {
    // Reset Home to first page
    navigation.dispatch(StackActions.popToTop())
    // Navigate first to bottom page and then to direct messages to maintain navigation stack
    navigation.navigate("Users", { screen: "UsersPage"})
    navigation.navigate("Users", { screen: "DirectMessagePage"})
  }

  function EvaluatePress(close: boolean) {
    if (close) {
      navigation.getParent()?.goBack();
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={() => EvaluatePress(true)}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback onPress={() => EvaluatePress(false)}>
          <View style={modals.modal}>
            <Text>User details modal</Text>
            <Button title="Send a message" onPress={() => Navigate()} />
            <Button title="Add friend" />
            <View style={modals.ol}>
              <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => EvaluatePress(true)}>
                <Image style={modals.olExitIcon} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}