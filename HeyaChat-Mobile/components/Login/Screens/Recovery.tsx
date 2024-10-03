import { useEffect, useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

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

        // Post to backend
        let api = new AuthorizationAPI()
        let response = await api.Recover(loginField)

        if (response === null) {
            setErrorMessage("Something went wrong :(")
            setDisplayError(true)
            return
        }

        // Read body
        let jsonBody = await response.json()
        let code = jsonBody.code

        if (response.status === 200) {
            if (code === 850) {
                navigateToCodeVerifying()
            }
        } else if (response.status === 404) {
            if (code === 810) {
                setErrorMessage("User matching login couldn't be found")
                setDisplayError(true)
            }
        } else {
            // Display error using errorbox
            
        }
    }

    return (
        <View>

            <View style={{ ...auth.head, ...{ height: "20%"} }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={auth.title}>Recover your account</Text>
                </View>
            </View>

            <View style={{ ...auth.body, ...{ height: "70%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                    <Text style={auth.description}>Enter the email address or username associated</Text>
                    <Text style={auth.description}>with your account</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    {displayError && <Text style={auth.errorText}>{errorMessage}</Text>}
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
                            left={<TextInput.Icon icon="eye" style={{ }} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
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