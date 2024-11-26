import { useState } from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { susp } from './Suspension'

type Props = {
    navigation: any
}

const DeleteConfirmation: React.FC<Props> = ({ navigation }) => {

    const GoBack = () => {
        navigation.goBack()
    }

    return (
        <View style={susp.container}>

            <ImageBackground style={susp.background} imageStyle={{ flex: 1 }} source={require('../../../../assets/images/suspensionHeader.png')} resizeMode="cover" />

            <View style={susp.titleWrapper}>
                <Text style={susp.title}>Delete your account</Text>
            </View>

             <View style={susp.separatorWrapper}>
                <View style={susp.separator} />
            </View>

            <View style={susp.bodyWrapper}>
                <Text style={susp.text}>
                     Your account will be deleted in 60 days.
                </Text>
            </View>

            <View style={susp.footerWrapper}>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => GoBack()}>
                    <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>Done</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

export default DeleteConfirmation