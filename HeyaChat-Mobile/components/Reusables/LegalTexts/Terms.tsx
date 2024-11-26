import { StyleSheet, View, Text } from 'react-native'
import { legal } from '../../../assets/styles/Legal'

type Props = {

}

const Terms: React.FC<Props> = () => {
    
    return (
        <View style={legal.container}>
            <Text>The contents of Terms</Text>
        </View>
    )
}

export default Terms