import { Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UsersStackParams } from '../NavigationStacks/UsersNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<UsersStackParams, "UserDetailsPage">

const UserProfile: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params

  return (
    <View style={styles.container}>
        <Text>User details page</Text>
        <Text>UserID: {userId}</Text>
        <Button title="Send a message" onPress={() => navigation.navigate("Users", { screen: "DirectMessagePage", params: { userId: userId }})} />
        <Button title="Add friend" />
    </View>
  );
}

export default UserProfile