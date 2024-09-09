import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'

type Props = NativeStackScreenProps<RootStackParams, "FullscreenModal">

const FullscreenModal: React.FC<Props> = ({ route, navigation }) => {
    const { param } = route.params

    const title = "aa"

    useEffect(() => {
        // Set title from parameter
        navigation.setOptions({ title: param })
    
    })

    return (
        <View style={fsModal.container}>
            <Text> Full screen modal</Text>
        </View>
    )
}

export default FullscreenModal

export const fsModal = StyleSheet.create({
    container: {
        flex: 1,
    }
})