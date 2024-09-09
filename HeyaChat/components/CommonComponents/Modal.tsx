import { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { CommonActions } from '@react-navigation/native'

type Props = NativeStackScreenProps<RootStackParams, "Modal">

const Modal: React.FC<Props> = ({ route, navigation }) => {
  const { param, Component } = route.params

  useEffect(() => {
    // Take userId and get user data from db
    
  })

  return (
    <TouchableWithoutFeedback onPress={() => navigation.dispatch(CommonActions.goBack())}>
      <View style={modal.shadow}>
        <TouchableWithoutFeedback>
          <View style={modal.modal}>

            <Component
                param={param}
                navigation={navigation}
            />

            <View style={modal.ol}>
              <TouchableOpacity style={modal.exitBtnWrapper} hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => navigation.dispatch(CommonActions.goBack())} >
                <Image style={modal.olExitBtn} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Modal

export const modal = StyleSheet.create({
  shadow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  modal: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginTop: 60,
    marginRight: 25,
    marginBottom: 120,
    marginLeft: 25,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
  },
  ol: { // Overlay
    position: 'absolute', 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    alignItems: 'flex-end'
  },
  exitBtnWrapper: {
    bottom: 18, 
    left: 18
  },
  olExitBtn: {
    height: 50, 
    width: 50, 
    borderRadius: 100
  }
})