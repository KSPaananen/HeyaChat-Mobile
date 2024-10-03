import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

interface Props {
    navigation: any
    navigateToPasswordChange: () => void
    navigateToLogin: () => void
    requestCodeCoolDown: boolean // Boolean for displaying cooldown
    countDown: number // Countdown number for time left
    setCoolDown: Function // Method call for starting countdown and disabling further requests for a set time
}

const VerifyCode: React.FC<Props> = ({ navigation, navigateToPasswordChange, navigateToLogin, requestCodeCoolDown, countDown, setCoolDown }) => {
    const [codeField, setCodeField] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const requestCode = () => {
        // Set code requesting on cooldown to prevent spam
        setCoolDown(true)

        // Request a new code
    }

    const onSubmit = async () => {
        // Reset all displayable errors on submit
        setDisplayError(false)

        let api = new AuthorizationAPI()
        let response = await api.VerifyCode(codeField)

        if (response === null) {
            setErrorMessage("Something went wrong :(")
            setDisplayError(true)
            return
        }

        let jsonBody = await response.json()
            let code = jsonBody.code

        if (response.status == 200) {
            if (code === 750) {
                // Navigate to new password screen
                navigateToPasswordChange()
            }
        } else if (response.status === 404) {
            if (code === 710) {
                setErrorMessage("Incorrect code")
                setDisplayError(true)
            }
        }
    }

    return (
        <View>

            <View style={{ ...auth.head, ...{ height: "20%"} }}>
                <View style={auth.titleWrapper}>
                    <Text style={auth.title}>Code verification</Text>
                </View>
            </View>

            <View style={{ ...auth.body, ...{ height: "70%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                    <Text style={auth.description}>Please enter the verification code we have sent to</Text>
                    <Text style={auth.description}>your email address</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    
                    {displayError && <ErrorBox 
                        message={errorMessage}
                        borderRadius={5}
                        onPress={() => setDisplayError(false)}
                    />}
                    <View style={auth.inputWrapper}>
                        <TextInput 
                            style={auth.input}
                            contentStyle={{ paddingLeft: 15 }}
                            underlineStyle={{ height: 0 }}
                            dense
                            keyboardType="visible-password"
                            value={codeField}
                            onChangeText={(value) => setCodeField(value)}
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Code" 
                            left={<TextInput.Icon icon="eye" style={{ }} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        <Pressable style={codeField != "" ? auth.primaryBtn : auth.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == ""}>
                            <Text style={auth.primaryBtnText}>Verify code</Text>
                        </Pressable>
                    </View>
                    <View style={auth.secondaryBtnWrapper}>
                        <Pressable style={auth.secondaryBtn} onPress={() => requestCode()} disabled={requestCodeCoolDown}>
                            <Text style={!requestCodeCoolDown ? auth.secondaryBtnText : auth.secondaryBtnDisabledText}>Didn't receive your code? <Text style={!requestCodeCoolDown ? { ...auth.secondaryBtnText, ...{ color: 'blue' }} : auth.secondaryBtnText}>Request </Text>a new one</Text>
                            {requestCodeCoolDown && <Text style={auth.secondaryBtnDisabledText}>Next request avaible in {countDown}</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={{ ...auth.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={auth.secondaryBtnWrapper}>
                        {/* Navigate back to recovery screen */}
                        <Pressable style={auth.secondaryBtn} onPress={() => navigateToLogin()}>
                            <Text style={auth.secondaryBtnText}>Return</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
  )
}

export default VerifyCode