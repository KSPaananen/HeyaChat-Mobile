import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

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
        if (passwordField.length <= value.length && passwordField !== value) {
            setErrorMessage("Passwords do not match")
            setDisplayError(true)
        } else if (passwordField.length > value.length) {
            setErrorMessage("Passwords do not match")
            setDisplayError(false)
        } else if (passwordField.length == value.length && passwordField === value) {
            setDisplayError(false)
        }
    }

    const onSubmit = async () => {
        // Reset all displayable errors on GUI
        setDisplayError(false)

        if (passwordField === repeatPasswordField && passwordField.length >= passwordMinLength) {
            let api = new AuthorizationAPI()
            let response = await api.ChangePassword(passwordField, repeatPasswordField)

            if (response === null) {
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
                return
            }

            let jsonBody = await response.json()
            let code = jsonBody.code

            if (response.status === 201) {
                if (code === 950) {
                    navigateToLogin()
                }
            } else if (response.status === 304) {
                if (code === 910) {
                    setErrorMessage("Passwords do not match")
                    setDisplayError(true)
                }
            } else {
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
            }
        }
    }

    return (
    <View>

        <View style={{ ...auth.head, ...{ height: "20%"} }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={auth.title}>Enter a new password</Text>
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "70%" } }}>
            <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                <Text style={auth.description}></Text>
                <Text style={auth.description}></Text>
            </View>
            <View style={{ flex: 0.65 }}>
                {displayError && <Text style={auth.errorText}>{errorMessage}</Text>}
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
                        left={<TextInput.Icon icon="eye" style={{ }} />} 
                    />
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
                        right={repeatPasswordField && 
                            <TextInput.Icon
                                icon={blurPassword ? "eye" : "eye-off"}
                                onPress={() => setBlurPassword(!blurPassword)}
                            />
                        }
                        left={<TextInput.Icon icon="eye" style={{ }} />} 
                    />
                </View>

                <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                    <Pressable style={passwordField != "" || repeatPasswordField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={passwordField == "" || repeatPasswordField == ""} onPress={() => onSubmit()} >
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