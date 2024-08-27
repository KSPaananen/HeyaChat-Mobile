import { Text, View, Button, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/UsersNavStack'
import { modals } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "SearchModal">

const SearchModal: React.FC<Props> = ({ route, navigation }) => {
  const { query } = route.params

  return (
    <TouchableWithoutFeedback onPress={() => navigation.dispatch(StackActions.popToTop())}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback>
          <View style={modals.modal}>
            <Text>Search modal. Click on users to open modal</Text>
            <Text>{query}</Text>
            <Button title="User details" onPress={() => navigation.navigate("UserDetailsModal", { userId: "0"})} />
            <View style={modals.ol}>
              <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => navigation.goBack()}>
                <Image style={modals.olExitIcon} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchModal