import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { login } from '../MainPage'

interface Props {
  onPress1: () => void
  onPress2: () => void
  onPress3: () => void
}

const Verify: React.FC<Props> = ({ onPress1, onPress2, onPress3 }) => {
    const [codeField, setCodeField] = useState<string>("")
  

  return (
    <View>
        <View style={{ ...login.head, ...{ height: "40%"} }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={login.title}>Heya!Chat</Text>
                <Image style={login.icon} source={require('../../../assets/icons/icon.png')} />
            </View>
        </View>

        
        <View style={{ ...login.body, ...{ height: "45%"} }}>
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={codeField}
                    onChangeText={(value) => setCodeField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username or email" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
           
            <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                <Pressable style={login.primaryBtn} onPress={() => onPress1()} >
                    <Text style={login.primaryBtnText}>Login</Text>
                </Pressable>
            </View>
            <View style={login.secondaryBtnWrapper}>
                <Pressable style={login.secondaryBtn} onPress={() => onPress2()}>
                    <Text style={login.secondaryBtnText}>Forgot your password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={{ ...login.footer, ...{ height: "15%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={login.secondaryBtnWrapper}>
                    <Pressable style={login.secondaryBtn} onPress={() => onPress3()}>
                        <Text style={login.secondaryBtnText}>Don't have an account? <Text style={{ color: 'blue' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Verify