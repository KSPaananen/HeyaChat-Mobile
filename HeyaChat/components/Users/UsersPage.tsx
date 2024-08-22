import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../../assets/styles/styles'

import UserCard from './UserCard'

export default function UserPage() {
  const navigation = useNavigation()

  return (
    <View>
        <UserCard />
    </View>
  );
}
