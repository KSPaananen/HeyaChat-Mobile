import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import HomePage from './components/HomePage/HomePage'
import StatsPage from './components/StatsPage/StatsPage'
import LeaderboardsPage from './components/Leaderboards/Leaderboards'

type RootStackParamList = {
  Home: undefined;
  Stats: { username: string; };
  Leaderboards: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  const DoStuff = () => {

  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ title: "Home" }}/>
        <Stack.Screen name="Stats" component={StatsPage} initialParams={{ username: "username2" }} options={{title: "Stats" }}/>
        <Stack.Screen name="Leaderboards" component={LeaderboardsPage} options={{title: "Leaderboards" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
