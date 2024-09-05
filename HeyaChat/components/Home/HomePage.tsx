import { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { home } from '../../assets/styles/styles'
import { HomeStackParams } from '../NavigationStacks/HomeNavStack'
import { requestForGoogleNearbyConnectionsPerms, checkForGoogleNearbyConnectionsPerms } from '../../services/PermissionsService'
import { localRepository } from '../../repositories/localRepository'
import { localDB } from '../../services/LocalDbService'
import { users } from '../../models/localDB/models'

import Summary from './Summary/Summary'
import FriendRequests from './Requests/FriendRequests'

type Props = NativeStackScreenProps<HomeStackParams, "HomePage">
    
const HomePage: React.FC<Props> = ({ navigation }) => {


  return (
    <View style={home.container}>
       
      
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