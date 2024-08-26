import { Text, View, Button, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/UsersNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "SearchModal">

const SearchModal: React.FC<Props> = ({ route, navigation }) => {
  const { query } = route.params

  return (
    <View style={styles.container}>
        <Text>Search modal. Click on users to open modal</Text>
        <Text>{query}</Text>
    </View>
  );
}

export default SearchModal