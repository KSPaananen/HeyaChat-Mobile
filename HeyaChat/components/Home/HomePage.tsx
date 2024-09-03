import { Text, View, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { home } from '../../assets/styles/styles'
import { HomeStackParams } from '../NavigationStacks/HomeNavStack'

import Summary from './Summary/Summary'

type Props = NativeStackScreenProps<HomeStackParams, "HomePage">

const HomePage: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={home.container}>
        <Text>Home page</Text>
        <Text>Here you can see names or characters of the people you've met and 
          click them individually to see more details or click on summary to see them in a list.</Text>

        <View style={home.ol}>
          {/* Friend requests */}
          <TouchableOpacity style={{ right: 10, bottom: 30 }}  >
            <Image style={{ height: 100, width: 45, borderColor: 'green', borderWidth: 3, borderRadius: 100 }} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
          {/* Summary of met users */}
          <TouchableOpacity style={{ right: 10, bottom: 20 }} onPress={() => navigation.navigate("Modal", { Component: Summary })} >
            <Image style={{ height: 140, width: 45, borderColor: 'red', borderWidth: 3, borderRadius: 100 }} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.ol}>
          <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => 
            navigation.navigate("Modal", { Component: Summary })
          }>
            <Image style={styles.olSummaryIcon} source={require('../../assets/icons/icon.png')} />
          </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default HomePage