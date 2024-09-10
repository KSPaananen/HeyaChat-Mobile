import { View, Text } from 'react-native'
import { legal } from '../../../assets/styles/legalTextsSheet'

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