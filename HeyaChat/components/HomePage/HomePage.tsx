import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
    navigation: HomePageNavigationProp;
};

const HomePage: React.FC<Props> = ({ navigation }) => {

  const DoStuff = () => {
    
  }

  return (
    <View style={styles.container}>
        <Text>Homepage</Text>
        <Button title="Stats" onPress={() => navigation.navigate("Stats", { username: "aaa"})} />
    </View>
  );
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
