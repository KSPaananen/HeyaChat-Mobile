import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { modals } from '../../assets/styles/styles'

import SummaryCard from './SummaryCard'

export default function SummaryModal() {
  const navigation = useNavigation()

  let titles: string[] = [
    "Woah! You've met a lot of people today!", 
  ]

  // Evaluate whre user pressed
  function EvaluatePress(close: boolean) {
    if (close) {
      navigation.goBack()
    }

  }

  return (
    <TouchableWithoutFeedback onPress={() => EvaluatePress(true)}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback onPress={() => EvaluatePress(false)}>
          <View style={modals.modal}>
              <Text style={modals.title}>{titles[0]}</Text>
              <SummaryCard />
              <View style={modals.ol}>
              <TouchableOpacity hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => EvaluatePress(true)}>
                <Image style={modals.olExitIcon} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
