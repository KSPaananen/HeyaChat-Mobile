import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../App'
import { CommonActions } from '@react-navigation/native'

// Create context to persist data on screen change
// Wrap the component in this
const MediumModalContext = createContext<any>(null)

export const useMediumModalContext = () => {
  try {
    return useContext(MediumModalContext)
  } catch (e) {
    console.log(e)
    throw new Error('useMediumModalContext error in MediumModal.tsx')
  }
}

type Props = NativeStackScreenProps<RootStackParams, "MediumModal">

const MediumModal: React.FC<Props> = ({ route, navigation }) => {
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
  
  const height = useRef(new Animated.Value(0)).current
  const width = useRef(new Animated.Value(0)).current
  const top = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(height, {
          toValue: 25, 
          duration: 250, 
          useNativeDriver: false
        }),
        Animated.timing(width, {
          toValue: 275, 
          duration: 250, 
          useNativeDriver: false
        }),
      ]),
      Animated.timing(top, {
          toValue: -187.5, 
          duration: 300, 
          useNativeDriver: false, 
        }
      ),
      Animated.parallel([
        Animated.timing(top, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 400,
          duration: 600,
          useNativeDriver: false,
        })
      ])
    ]).start(() => {
      setModalVisible(true)
    })
  }, [])

  const CloseModal = () => {
    navigation.dispatch(CommonActions.goBack())
  }

  return (
    <MediumModalContext.Provider value={{ args, setArgs }}>
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
    </MediumModalContext.Provider>
  )
}

export default MediumModal

export const modal = StyleSheet.create({
  shadow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
    },
  modal: {
    height: 400,
    width: 275,
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