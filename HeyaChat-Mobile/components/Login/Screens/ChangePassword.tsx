import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../CommonComponents/Notifications/ErrorNotification'

interface Props {
    navigateToLogin: () => void // Return
}

const ChangePassword: React.FC<Props> = ({ navigateToLogin }) => {
    // Fields
    const [passwordField, setPasswordField] = useState<string>("")
    const [repeatPasswordField, setRepeatPasswordField] = useState<string>("")

    // Conditions
    const passwordMinLength: number = 8

    // GUI
    const [blurPassword, setBlurPassword] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)

    // Check if both password fields match
    const matchPasswords = (value: string) => {
        if (passwordField !== "" && passwordField.length <= value.length && passwordField !== value) {
            setErrorMessage("Passwords do not match")
            setDisplayError(true)
        } else if (passwordField !== "" && passwordField.length > value.length) {
            setDisplayError(false)
        } else if (passwordField.length == value.length && passwordField === value) {
            setDisplayError(false)
        }
    }

    const onSubmit = async () => {
        // Reset all displayable errors on GUI
        setDisplayError(false)

        if (passwordField === repeatPasswordField && passwordField.length >= passwordMinLength) {
            let response: any

            try {
                let api = new AuthorizationAPI()
                response = await api.ChangePassword(passwordField, repeatPasswordField)
            } catch {
                setTimeout(() => {
                    setErrorMessage("Something went wrong :(")
                    setDisplayError(true)
                }, 500)
                return
            }
            
            // Response body structure
            // Code: 0,
            // Details: ""
            let jsonBody = await response.json()
            let code = jsonBody.code

            if (response.status === 201) {
                switch (code) {
                    case 1870:
                        navigateToLogin()
                        break
                }
            } else if (response.status === 304) {
                switch (code) {
                    case 1830:
                        setTimeout(() => {
                            setErrorMessage("Passwords don't match")
                            setDisplayError(true)
                        }, 500)
                        break
                }
            } else {
                setTimeout(() => { // Email didn't match, but display as something went wrong. Shouldn't even be possible unless app is bugging
                    setErrorMessage("Something went wrong :(")
                    setDisplayError(true)
                }, 500)
            }
        }
    }

    return (
    <View>

        <View style={{ ...auth.head, ...{ height: "23%"} }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={auth.title}>Create a new password</Text>
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "67%" } }}>
            <View style={{ flex: 0.25, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                <Text style={auth.description}></Text>
            </View>
            <View style={{ flex: 0.75 }}>
                <View style={auth.notificationWrapper}>
                    {displayError && <ErrorNotification message={errorMessage} />}
                </View>
                <View style={auth.inputWrapper}>
                    <TextInput 
                        style={auth.input}
                        contentStyle={{ paddingLeft: 15 }}
                        underlineStyle={{ height: 0 }}
                        dense
                        value={passwordField}
                        secureTextEntry={blurPassword}
                        onChangeText={(value) => setPasswordField(value)}
                        mode="flat"
                        activeOutlineColor="#0330fc"
                        placeholder="New password"
                        left={<TextInput.Icon icon={() => <Octicons name="key" size={23} color="rgb(63, 118, 198)" />} />} 
                    />
                </View>

                <View style={auth.notificationWrapper}>
                
                </View>

                <View style={auth.inputWrapper}>
                    <TextInput 
                        style={auth.input}
                        contentStyle={{ paddingLeft: 15 }}
                        underlineStyle={{ height: 0 }}
                        dense
                        value={repeatPasswordField}
                        secureTextEntry={blurPassword}
                        onChangeText={(value) => {setRepeatPasswordField(value); matchPasswords(value)}}
                        mode="flat"
                        activeOutlineColor="#0330fc"
                        placeholder="Re-enter password" 
                        right={passwordField && <TextInput.Icon icon={() => <Octicons name={blurPassword ? "eye" : "eye-closed"} size={25} color="rgb(63, 118, 198)" />} onPress={() => setBlurPassword(!blurPassword)} />}
                        left={<TextInput.Icon icon={() => <Octicons name="lock" size={23} color="rgb(63, 118, 198)" />} />} 
                    />
                </View>

                <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 50} }}>
                    <Pressable style={passwordField !== "" && repeatPasswordField !== "" && passwordField === repeatPasswordField ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={passwordField === "" && repeatPasswordField === "" && passwordField !== repeatPasswordField} onPress={() => onSubmit()} >
                        <Text style={auth.primaryBtnText}>Submit</Text>
                    </Pressable>
                </View>

            </View>
        </View>

        <View style={{ ...auth.footer, ...{ height: "10%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={auth.secondaryBtnWrapper}>
                    <Pressable style={auth.secondaryBtn} onPress={() => navigateToLogin()}>
                        <Text style={auth.secondaryBtnText}>Back to login</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    </View>
    )
}

export default ChangePassword