import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { login } from '../MainPage'

interface Props {
    type: string // // Which type of verification page to show. Either register or recover
    onPress1: () => void // Navigate to home screen after succesful verification
    onPress2: () => void // Navigate to new password screen after succesful verification
    onPress3: () => void // Return to registeration screen
    onPress4: () => void // Return back to recovery screen
}

const Verify: React.FC<Props> = ({ type, onPress1, onPress2, onPress3, onPress4 }) => {
    const [codeField, setCodeField] = useState<string>("")
    const [codeError, setCodeError] = useState<boolean>(false)

    const requestNewEmail = () => {

    }
  
    return (
        <View>

            <View style={{ ...login.head, ...{ height: "15%"} }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={login.title}>Verify your account</Text>
                </View>
            </View>

            <View style={{ ...login.body, ...{ height: "75%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={login.description}>Please enter the verification code we have</Text>
                    <Text style={login.description}> sent to your email *****.*****@****.**</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    
                    {codeError && <Text style={login.errorText}>Code didn't belong to any existing accounts</Text>}
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
                            placeholder="Code" 
                        />
                    </View>
                    <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        {type === "register" && <Pressable style={login.primaryBtn} onPress={() => onPress1()} >
                            <Text style={login.primaryBtnText}>Verify</Text>
                        </Pressable>}
                        {type === "recover" && <Pressable style={login.primaryBtn} onPress={() => onPress2()} >
                            <Text style={login.primaryBtnText}>Verify</Text>
                        </Pressable>}
                    </View>
                    <View style={login.secondaryBtnWrapper}>
                        {/* Reset errorbox when navigating to other screens */}
                        <Pressable style={login.secondaryBtn} onPress={() => requestNewEmail()}>
                            <Text style={login.secondaryBtnText}>Didn't receive your email? <Text style={{ ...login.secondaryBtnText, ...{ color: 'blue' } }}>Resend </Text>code</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={{ ...login.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={login.secondaryBtnWrapper}>
                        {type === "register" &&<Pressable style={login.secondaryBtn} onPress={() => onPress3()}>
                            <Text style={login.secondaryBtnText}>Return</Text>
                        </Pressable>}
                        {type === "recover" &&<Pressable style={login.secondaryBtn} onPress={() => onPress4()}>
                            <Text style={login.secondaryBtnText}>Return</Text>
                        </Pressable>}
                    </View>
                </View>
            </View>

        </View>
  )
}

export default Verify