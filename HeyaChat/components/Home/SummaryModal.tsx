import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { modals } from '../../assets/styles/styles'

import SummaryCard from './SummaryCard'

export default function SummaryPage() {
  const navigation = useNavigation()

  let titles: string[] = [
    "Woah! You've met a lot of people today!", 
  ]

  // Evaluate whre user pressed
  function EvaluatePress(id: string) {
    if (id == "shadow") {
      navigation.goBack()
    } else if (id == "close") {
      navigation.goBack()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => EvaluatePress("shadow")}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback onPress={() => EvaluatePress("modal")}>
          <View style={modals.modal}>
            <View>
              <Text style={modals.title}>{titles[0]}</Text>
            </View>
            <View>
              <View style={modals.overlay}>
                <TouchableOpacity  onPress={() => EvaluatePress("close")}>
                  <Image style={modals.closingIcon} source={require('../../assets/icons/icon.png')} />
                </TouchableOpacity>
              </View>
              <SummaryCard />
            </View>
            
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
