import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { auth } from '../AuthorizationPage'

interface Props {
    setEmail: any
    onPress1: () => void // Navigate to verification screen
    onPress2: () => void // Return to login screen
    requestEmailCoolDown: boolean // Boolean for displaying cooldown
    countDown: number // Countdown number for time left
    setCoolDown: Function // Method call for starting countdown and disabling further email requests
}

const Recovery: React.FC<Props> = ({ setEmail, onPress1, onPress2, requestEmailCoolDown, countDown, setCoolDown }) => {
    // Fields
    const [emailField, setEmailField] = useState<string>("")

    // GUI 
    const [emailNotFoundError, setEmailNotFoundError] = useState<boolean>(false)
    const [emailInvalidError, setEmailInvalidError] = useState<boolean>(false)

    // Field restrictions
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const requestEmail = () => {
        // Set cooldown to email requests to prevent spam
        setCoolDown(true)

        // Request new email from backend
        
    }
    const onSubmit = () => {
        // Reset displayable errors
        setEmailNotFoundError(false)
        setEmailInvalidError(false)

        // Set email for verification screen
        if (emailRegex.test(emailField)) {
            setEmail(emailField)

            // Post to backend
            const response = 200

            if (response === 200) {
                onPress1()
            } else {
                setEmailNotFoundError(true)
            }

        } else {
            setEmailInvalidError(true)
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
                    <Text style={auth.description}>Enter the email address associated</Text>
                    <Text style={auth.description}>with your account</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    {emailNotFoundError && <Text style={auth.errorText}>Email does not belong to an account</Text>}
                    {emailInvalidError && <Text style={auth.errorText}>Please provide a valid email address</Text>}
                    <View style={auth.inputWrapper}>
                        <TextInput 
                            style={auth.input}
                            contentStyle={{ paddingLeft: 15 }}
                            underlineStyle={{ height: 0 }}
                            dense
                            keyboardType="email-address"
                            value={emailField}
                            onChangeText={(value) => setEmailField(value)}
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Email" 
                            left={<TextInput.Icon icon="eye" style={{ }} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        <Pressable style={emailField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={emailField == ""} onPress={() => onSubmit()} >
                            <Text style={auth.primaryBtnText}>Recover</Text>
                        </Pressable>
                    </View>

                </View>
            </View>

            <View style={{ ...auth.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={auth.secondaryBtnWrapper}>
                        <Pressable style={auth.secondaryBtn} onPress={() => onPress2()}>
                            <Text style={auth.secondaryBtnText}>Return</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
  )
}

export default Recovery