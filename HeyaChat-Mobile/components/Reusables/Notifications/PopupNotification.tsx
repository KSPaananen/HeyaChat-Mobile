import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../App'
import { CommonActions } from '@react-navigation/native'

type Props = NativeStackScreenProps<RootStackParams, "PopupNotification">

let passCounter: number = 0
let speed = 20
let start = 700
let end = -50

const PopupNotification: React.FC<Props> = ({ route, navigation }) => {
  const { message } = route.params 

  // Animation
  const [top, setTop] = useState<number>(start)
  const [direction, setDirection] = useState<number>(1) // 1 increases, -1 decreases

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((pos) => {
        const newPos = pos - direction * speed
        
        if (newPos <= 5 && newPos >= -5) {
          passCounter++
        }

        switch (passCounter) {
          case 1:
            start = 65
            end = -50
            speed = 10
            break
          case 3:
            start = 50
            end = -35
            speed = 5
            break
          case 5:
            start = 35
            end = -20
            speed = 2.5
            break
          case 7:
            start = 10
            end = -5
            speed = 1
            break
          case 9:
            start = 5
            end = -0
            break
          case 11:
            passCounter = 0
            start = 700
            end = -50
            speed = 25
            clearInterval(interval)
            return 0
            break
        }
  
        if (newPos <= end) {
          setDirection(-1)
          return end
        } else if (newPos >= start) {
          setDirection(1)
          return start
        }

        return newPos
      })
    }, 1)
  
      return () => clearInterval(interval)
    }, [direction])

    const CloseModal = () => {
      navigation.dispatch(CommonActions.goBack())
    }

  return (
    <View style={{ ...popup.modal, ...{ top: top }}}>
    

    </View>

  )
}

export default PopupNotification

export const popup = StyleSheet.create({
  modal: {
    height: 100,
    width: 300,
    borderRadius: 15,
    backgroundColor: 'rgb(63, 118, 198)',
  },
})