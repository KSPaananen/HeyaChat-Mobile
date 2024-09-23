import { Text, View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParams } from '../../NavigationStacks/ProfileNavStack'
import { styles } from '../../../assets/styles/stylesheet'

import LiteUserDetails from '../../UserDetails/LiteUserDetails'

type Props = NativeStackScreenProps<ProfileStackParams, "LeaderboardsPage">

const LeaderboardsPage: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Leaderboards</Text>
      <Button title="Sort by top 100 etc" />
      <Button title="Details" onPress={() => navigation.navigate("Modal", { param: 11, Component: LiteUserDetails })} />
    </View>
  );
}

export default LeaderboardsPage