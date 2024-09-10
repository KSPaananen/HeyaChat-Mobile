import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { login } from '../MainPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

interface Props {
    onPress1: () => void // Navígate to login screen
    onPress2: () => void // Return
}

const ChangePassword: React.FC<Props> = ({ onPress1, onPress2 }) => {
    // Fields
    const [passwordField, setPasswordField] = useState<string>("")
    const [repeatPasswordField, setRepeatPasswordField] = useState<string>("")

    // Conditions
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
    const passwordMinLength: number = 8

    // GUI
    const [blurPassword, setBlurPassword] = useState<boolean>(true)
    const [displayPasswordMatchError, setDisplayPasswordMatchError] = useState<boolean>(false)
    const [displayPasswordLengthError, setDisplayPasswordLengthError] = useState<boolean>(false)

    // Check if both password fields match
    const matchPasswords = (value: string) => {
        if (passwordField.length <= value.length && passwordField !== value) {
            setDisplayPasswordMatchError(true)
            setPasswordsMatch(false)
        } else if (passwordField.length > value.length) {
            setDisplayPasswordMatchError(false)
            setPasswordsMatch(false)
        } else if (passwordField.length == value.length && passwordField === value) {
            setDisplayPasswordMatchError(false)
            setPasswordsMatch(true)
        }
    }

    const onSubmit = () => {
        // Reset all displayable errors on GUI
        setDisplayPasswordLengthError(false)

        // Post login details to backend
        if (passwordsMatch && passwordField.length >= passwordMinLength) {
            let response: number = 200
        
            // If response is 200, navigate to home screen & save certificate
            if (response === 200) {
                onPress1()
            }
            else {
            
            }
        } else if (passwordField.length < passwordMinLength) {
            setDisplayPasswordLengthError(true)
        }
    }
  

  return (
    <View>

        <View style={{ ...login.head, ...{ height: "20%"} }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={login.title}>Enter a new password</Text>
            </View>
        </View>

        <View style={{ ...login.body, ...{ height: "70%" } }}>
            <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                <Text style={login.description}></Text>
                <Text style={login.description}></Text>
            </View>
            <View style={{ flex: 0.65 }}>
                {displayPasswordLengthError && <Text style={login.errorText}>Password has to be atleast 8 characters long</Text>}
                <View style={login.inputWrapper}>
                    <TextInput 
                        style={login.input}
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
                {displayPasswordMatchError && <Text style={login.errorText}>Passwords do not match!</Text>}
                <View style={login.inputWrapper}>
                    <TextInput 
                        style={login.input}
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

                <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                    <Pressable style={passwordField != "" || repeatPasswordField != "" ? login.primaryBtn : login.primaryBtnDisabled} disabled={passwordField == "" || repeatPasswordField == ""} onPress={() => onSubmit()} >
                        <Text style={login.primaryBtnText}>Submit</Text>
                    </Pressable>
                </View>

            </View>
        </View>

        <View style={{ ...login.footer, ...{ height: "10%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={login.secondaryBtnWrapper}>
                    <Pressable style={login.secondaryBtn} onPress={() => onPress2()}>
                        <Text style={login.secondaryBtnText}>Return</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    </View>
    )
}

export default ChangePassword