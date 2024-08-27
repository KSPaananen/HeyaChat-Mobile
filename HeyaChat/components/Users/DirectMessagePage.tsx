import { Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/UsersNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "DirectMessagePage">

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