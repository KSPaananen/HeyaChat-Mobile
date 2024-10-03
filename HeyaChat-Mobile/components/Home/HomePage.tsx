import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';
import { HomeStackParams } from '../NavigationStacks/HomeNavStack'
import { PermissionsService } from '../../services/PermissionsService'

import Summary from './Summary/Summary'
import FriendRequests from './Requests/FriendRequests'

type Props = NativeStackScreenProps<HomeStackParams, "HomePage">
    
const HomePage: React.FC<Props> = ({ navigation }) => {

  const permissionsService = new PermissionsService()

  const onLayout = async () => {
    // Hide splashscreen
    await SplashScreen.hideAsync();
  }

  return (
    <View style={home.container} onLayout={onLayout}>
        <Text>Permission tester</Text>
        <Button title="Request fine location permissions" onPress={() => permissionsService.RequestAccessLocation()} />
        <Button title="Request bluetooth permissions" onPress={() => permissionsService.RequestBluetooth()} />
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