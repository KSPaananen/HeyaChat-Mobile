import { useEffect } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { summaryCard } from '../../assets/styles/styles'

export default function SummaryCard() {
  const navigation = useNavigation()

  useEffect(() => {

  })

  function OpenDetails() {
    navigation.navigate("UserDetailsModal")
  }

  return (
    <TouchableHighlight onPress={OpenDetails}>
      <View style={summaryCard.card}>
        <View style={summaryCard.cardItem}>
          <View style={summaryCard.itemLeft}>
            <Text style={summaryCard.text}>Profile name</Text>
            <Text style={summaryCard.text}>Date met</Text>
          </View>
          <View style={summaryCard.itemMiddle}>
          <Text style={summaryCard.text}></Text>
            <Text style={summaryCard.text}>Title</Text>
          </View>
          <View style={summaryCard.itemRight}>
            <Image style={summaryCard.icon} source={require('../../assets/icons/favicon.png')} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}