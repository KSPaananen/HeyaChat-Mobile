import { StyleSheet, Text, View } from 'react-native'

type Props = {
  param?: number
  navigation: any
}

const LiteUserDetails: React.FC<Props> = ({ param, navigation }) => {

  return (
    <View style={userDetails.container}>
        <Text>userId: {param}</Text>
        <Text>Lite version of user details modal</Text>
    </View>
  );
}

export default LiteUserDetails

export const userDetails = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgb(245, 245, 245)'
  }
})