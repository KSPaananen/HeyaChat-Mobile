import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../App'
import { CommonActions } from '@react-navigation/native'

// Create context to persist data on screen change
// Wrap the component in this
const LargeModalContext = createContext<any>(null)

export const useLargeModalContext = () => {
  try {
    return useContext(LargeModalContext)
  } catch (e) {
    console.log(e)
    throw new Error('useMediumModalContext error in LargeModal.tsx')
  }
}

type Props = NativeStackScreenProps<RootStackParams, "LargeModal">

const LargeModal: React.FC<Props> = ({ route, navigation }) => {
  const { Component, Props } = route.params 
  // Store data you wish to persist to args in child component
  const [args, setArgs] = useState<{}>({})
  
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const componentProps: {} = {
    navigation: navigation, 
    arg1: Props?.[0], 
    arg2: Props?.[1], 
    arg3: Props?.[2],
    arg4: Props?.[3],
    arg5: Props?.[4],
    arg6: Props?.[5],
  }
  
  const height = useRef(new Animated.Value(600)).current
  const width = useRef(new Animated.Value(350)).current
  const top = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setModalVisible(true)
    
  }, [])

  const CloseModal = () => {
    navigation.dispatch(CommonActions.goBack())
  }

  return (
    <LargeModalContext.Provider value={{ args, setArgs }}>
      <TouchableWithoutFeedback onPress={() => CloseModal()}>

        <View style={modal.shadow}>
          <TouchableWithoutFeedback>
        
            <Animated.View style={{ ...modal.modal, ...{ top: top, height: height, width: width }}}>
        
              <Component {...componentProps}/>

              {modalVisible && <View style={modal.ol}>
                <TouchableOpacity style={modal.exitBtnWrapper} hitSlop={{top: 0, right: 0, bottom: 0, left: 0}} onPress={() => CloseModal()} >
                  <Image style={modal.olExitBtn} source={require('../../../assets/icons/icon.png')} />
                </TouchableOpacity>
              </View>}

            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </LargeModalContext.Provider>
  )
}

export default LargeModal

export const modal = StyleSheet.create({
  shadow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
    },
  modal: {
    height: 600,
    width: 350,
    borderRadius: 15,
    backgroundColor: 'rgb(63, 118, 198)',
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
    bottom: 22, 
    left: 22
  },
  olExitBtn: {
    height: 60, 
    width: 60, 
    borderRadius: 100
  }
})