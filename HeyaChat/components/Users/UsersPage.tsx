import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

import UserCard from './UserCard'

const UserPage = () => {
  const navigation = useNavigation()

  return (
    <View>
        <UserCard />
    </View>
  );
}

export default UserPage