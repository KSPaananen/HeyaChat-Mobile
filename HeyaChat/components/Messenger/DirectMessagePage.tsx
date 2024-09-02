import { Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MessengerStackParams } from '../NavigationStacks/MessengerNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<MessengerStackParams, "DirectMessagePage">

const DirectMessagePage: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params

  return (
    <View style={styles.container}>
        <Text>Direct message page</Text>
        <Text>UserID: {userId}</Text>
    </View>
  );
}

export default DirectMessagePage