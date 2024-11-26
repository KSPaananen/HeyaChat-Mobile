import { View, Text } from 'react-native'
import { legal } from '../../../assets/styles/Legal'

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