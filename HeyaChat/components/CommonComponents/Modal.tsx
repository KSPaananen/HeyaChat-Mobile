import { useEffect } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { StackActions, CommonActions } from '@react-navigation/native'
import { modals } from '../../assets/styles/styles'

type Props = NativeStackScreenProps<RootStackParams, "Modal">

const Modal: React.FC<Props> = ({ route, navigation }) => {
  const { param, Component } = route.params

  useEffect(() => {
    // Take userId and get user data from db
    
  })

  return (
    <TouchableWithoutFeedback onPress={() => navigation.dispatch(CommonActions.goBack())}>
      <View style={modals.shadow}>
        <TouchableWithoutFeedback>
          <View style={modals.modal}>

            <Component
                param={param}
                navigation={navigation}
            />

            <View style={modals.ol}>
              <TouchableOpacity style={modals.exitBtnWrapper} hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => navigation.dispatch(CommonActions.goBack())} >
                <Image style={modals.olExitBtn} source={require('../../assets/icons/icon.png')} />
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Modal