import { Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../NavigationStacks/ProfileNavStack'
import { styles } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "SettingsPage">

const SettingsPage: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Text>Settings page</Text>
    </View>
  );
}

export default SettingsPage
