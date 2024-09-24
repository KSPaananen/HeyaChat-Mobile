import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';
import { HomeStackParams } from '../NavigationStacks/HomeNavStack'
import { requestForGoogleNearbyConnectionsPerms, checkForGoogleNearbyConnectionsPerms } from '../../services/PermissionsService'
import { localRepository } from '../../repositories/localRepository'
import { localDB } from '../../services/LocalDbService'
import { users } from '../../models/localDB/models'

import Summary from './Summary/Summary'
import FriendRequests from './Requests/FriendRequests'

type Props = NativeStackScreenProps<HomeStackParams, "HomePage">
    
const HomePage: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<users | null>()

  const getLocalPlaceholderUser = () => {
    var repo = new localRepository()
    repo.getLocalUser().then((result) => {
      setUser(result)
    })
    
  }

  const getPlaceholderUser = () => {
    var repo = new localRepository()
    repo.getUser(25).then((result) => {
      setUser(result)
    })
    
  }

  const createPlaceholderUser = () => {
    var user: users = {
      userID: 25,
      username: "username25",
      email: "email.username25@email.com",
      phone: "+1234567890",
      localUser: true
    }

    var repo = new localRepository()
    repo.insertUser(user)
    
  }

  const editPlaceholderUser = () => {
    var user: users = {
      userID: 25,
      username: "username25",
      email: "email.username25@email.com",
      phone: "+1234567890",
      localUser: true
    }

    var repo = new localRepository()
    repo.editUser(user)
    
  }

  const deletePlaceholderUser = () => {

    var repo = new localRepository()
    repo.deleteUser(25)
    
  }

  const dropTables = () => {
    const test = new localDB()

    test.dropTables()
  }

  const createTables = () => {
    const test = new localDB()

    test.setupDB()
  }

  const onLayout = async () => {
    // Hide splashscreen
    await SplashScreen.hideAsync();
  }

  return (
    <View style={home.container} onLayout={onLayout}>
        <Text></Text>
        <Text>{user?.username}</Text>
        <Text>{user?.email}</Text>

        <Text>Permission tester</Text>
        <Button title="Request permissions" onPress={() => requestForGoogleNearbyConnectionsPerms()} />
        <Text>SQLite tester</Text>
        <Button title="Get local user" onPress={() => getLocalPlaceholderUser()} />
        <Button title="Get user 25" onPress={() => getPlaceholderUser()} />
        <Button title="Create user" onPress={() => createPlaceholderUser()} />
        <Button title="Edit user" onPress={() => editPlaceholderUser()} />
        <Button title="Delete user" onPress={() => deletePlaceholderUser()} />
        <Text></Text>
        <Button title="Create tables" onPress={() => createTables()} />
        <Button title="Drop tables" onPress={() => dropTables()} />
        <Text></Text>
        <Button title="Back to login" onPress={() => navigation.navigate("Login", { screen: "AuthorizationPage"})} />
      
        <View style={home.ol}>
          {/* Friend requests */}
          <TouchableOpacity style={{ right: 10, bottom: 30 }} onPress={() => navigation.navigate("Modal", { Component: FriendRequests })} >
            <Image style={{ height: 100, width: 45, borderColor: 'green', borderWidth: 3, borderRadius: 100 }} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
          {/* Summary of met users */}
          <TouchableOpacity style={{ right: 10, bottom: 20 }} onPress={() => navigation.navigate("Modal", { Component: Summary })} >
            <Image style={{ height: 140, width: 45, borderColor: 'red', borderWidth: 3, borderRadius: 100 }} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default HomePage

export const home = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  ol: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
  },
  
})