import { Text, View } from 'react-native'

type Props = {
  param?: number
  navigation: any
}

const LiteUserDetails: React.FC<Props> = ({ param, navigation }) => {

  return (
    <View>
        <Text>userId: {param}</Text>
        <Text>Lite version of user details modal</Text>
    </View>
  );
}

export default LiteUserDetails