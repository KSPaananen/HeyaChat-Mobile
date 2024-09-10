import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'

type Props = NativeStackScreenProps<RootStackParams, "FullscreenModal">

const FullscreenModal: React.FC<Props> = ({ route, navigation }) => {
    const { param, Component } = route.params

    useEffect(() => {
        // Set title from parameter
        navigation.setOptions({ title: param })
    
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