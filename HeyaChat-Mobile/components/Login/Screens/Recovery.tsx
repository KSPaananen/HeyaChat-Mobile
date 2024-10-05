import { useEffect, useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../CommonComponents/Notifications/ErrorNotification'

interface Props {
    navigateToCodeVerifying: () => void // Navigate to verification screen
    navigateToLogin: () => void // Return to login screen
}

const Recovery: React.FC<Props> = ({ navigateToCodeVerifying, navigateToLogin }) => {
    // Fields
    const [loginField, setLoginField] = useState<string>("")

    // GUI 
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    // Field restrictions
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const onSubmit = async () => {
        // Reset displayable errors
        setDisplayError(false)

        let response: any

        // Post to backend
        try {
            let api = new AuthorizationAPI()
            response = await api.Recover(loginField)
        } catch {
            setTimeout(() => {
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
            }, 500)
            return
        }
        
        // Read body
        let jsonBody = await response.json()

        if (response.status === 200) {
            if (jsonBody.code === 850) {
                navigateToCodeVerifying()
            }
        } else if (response.status === 404) {
            if (jsonBody.code === 810) {
                setTimeout(() => {
                    setErrorMessage("User matching login couldn't be found")
                    setDisplayError(true)
                }, 500)
            }
        } else {
            setTimeout(() => {
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
            }, 500)
        }
    }

    return (
        <View>

            <View style={{ ...auth.head, ...{ height: "23%"} }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={auth.title}>Recover your account</Text>
                </View>
            </View>

            <View style={{ ...auth.body, ...{ height: "67%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={auth.description}>Enter the email address or username associated</Text>
                    <Text style={auth.description}>with your account</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    <View style={auth.notificationWrapper}>
                        {displayError && <ErrorNotification message={errorMessage} />}
                    </View>
                    <View style={auth.inputWrapper}>
                        <TextInput 
                            style={auth.input}
                            contentStyle={{ paddingLeft: 15 }}
                            underlineStyle={{ height: 0 }}
                            dense
                            keyboardType="email-address"
                            value={loginField}
                            onChangeText={(value) => setLoginField(value)}
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Email or username" 
                            left={<TextInput.Icon icon={() => <Octicons name="mail" size={23} color="rgb(63, 118, 198)" />} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 50} }}>
                        <Pressable style={loginField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={loginField == ""} onPress={() => onSubmit()} >
                            <Text style={auth.primaryBtnText}>Recover</Text>
                        </Pressable>
                    </View>

                </View>
            </View>

            <View style={{ ...auth.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={auth.secondaryBtnWrapper}>
                        <Pressable style={auth.secondaryBtn} onPress={() => navigateToLogin()}>
                            <Text style={auth.secondaryBtnText}>Return</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
  )
}

export default Recovery