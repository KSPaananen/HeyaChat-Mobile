import { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../App'

// Create context to persist data on screen change
// Wrap the component in this
const FullscreenModalContext = createContext<any>(null)

export const useFullscreenModalContext = () => {
  try {
    return useContext(FullscreenModalContext)
  } catch (e) {
    console.log(e)
    throw new Error('useMediumModalContext error in FullscreenModal.tsx')
  }
}

type Props = NativeStackScreenProps<RootStackParams, "FullscreenModal">

const FullscreenModal: React.FC<Props> = ({ route, navigation }) => {
    const { Component, Props } = route.params 
    // Store data you wish to persist to args in child component
    const [args, setArgs] = useState<{}>({})

    useEffect(() => {
        // Set title from parameter
        navigation.setOptions({ title: Props?.[0] })
    
    })

    return (
        <View style={fsModal.container}>
            <Component 
            />
        </View>
    )
}

export default FullscreenModal

export const fsModal = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})