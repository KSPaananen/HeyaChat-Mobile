import { View, Text } from 'react-native'
import { legal } from '../../../assets/styles/legalTextsSheet'

type Props = {

}

const EULA: React.FC<Props> = () => {
    
    return (
        <View style={legal.container}>
            <Text>The contents of EULA</Text>
        </View>
    )
}

export default EULA