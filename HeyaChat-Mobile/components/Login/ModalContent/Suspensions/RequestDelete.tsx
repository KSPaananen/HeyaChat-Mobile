import { useState } from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { susp } from './Suspension'
import { AuthorizationAPI } from '../../../../services/APIService'

type Props = {
    navigation: any
}

const RequestDelete: React.FC<Props> = ({ navigation }) => {
    const [processing, setProcessing] = useState<boolean>(false)

    const RequestDelete = async () => {
        // set processing to true to display loading icon
        setProcessing(true)

        let response: any

        try {
            let api = new AuthorizationAPI()
            response = await api.RequestDelete()

            if (response.status === 201) {
                
            }
        } catch {
            setProcessing(false)
            return
        }

        // Set processing to false after we get a response
        setProcessing(false)
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
                     Are you sure you want to delete your account?
                </Text>
            </View>

            <View style={susp.footerWrapper}>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => {RequestDelete()}}>
                    {processing === false && <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>Request delete</Text>}
                    {processing && <Image style={susp.loadingIcon} source={require('../../../../assets/icons/loadingicon.gif')} />}
                </Pressable>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgba(250, 250, 250, 1)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 15, color: 'rgb(63, 118, 198)' }}>Cancel</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

export default RequestDelete