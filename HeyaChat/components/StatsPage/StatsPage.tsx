import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type StatsPageRouteProp = RouteProp<RootStackParamList, "Stats">;
type StatsPageNavigationProp = StackNavigationProp<RootStackParamList, "Stats">;

type Props = {
  route: StatsPageRouteProp;
  navigation: StatsPageNavigationProp;
};

function StatsPage({ route, navigation }: Props) {
    const { username } = route.params

  const DoStuff = () => {
    
  }

  return (
    <View style={styles.container}>
        <Text>Statspage</Text>
        <Text>{username}</Text>
        <Button title="Return" onPress={() => navigation.goBack()} />
        <Button title="Leaderboards" onPress={() => navigation.navigate("Leaderboards")} />
    </View>
  );
}

export default StatsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
