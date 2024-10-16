import { useEffect, useState, useCallback } from 'react'
import { Text, View, Image, Pressable, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TextInput, Checkbox } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../Reusables/Notifications/ErrorNotification'

interface Props {
    navigation: any
    navigateToLogin: () => void // Return
}

const ChangePassword: React.FC<Props> = ({ navigation, navigateToLogin }) => {
    // Fields
    const [passwordField, setPasswordField] = useState<string>("")
    const [repeatPasswordField, setRepeatPasswordField] = useState<string>("")

    // Conditions
    const passwordMinLength: number = 8

    // GUI
    const [blurPassword, setBlurPassword] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [processing, setProcessing] = useState<boolean>(false)
    const [countDown, setCountDown] = useState<number>(5)
    const [success, setSuccess] = useState<boolean>(false)

    // Add custom back press handling
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            navigateToLogin()
            return true
          }
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          // Remove eventlistener when backpress is executed
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    )

    const startCountDown = () => {
        let count = 5

        let interval = setInterval(() => {
            count--
            setCountDown(count)
  
            if(count === 0) {
                clearInterval(interval)
            }
        }, 1000)
    }

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
            // Set processing to true
            // After we get a response, set it to false
            setProcessing(true)

            let response: any

            try {
                let api = new AuthorizationAPI()
                response = await api.ChangePassword(passwordField, repeatPasswordField)
            } catch {
                setTimeout(() => {
                    setErrorMessage("Something went wrong :(")
                    setDisplayError(true)
                }, 500)
                setProcessing(false)
                return
            }

            setProcessing(false)
            
            // Response body structure
            // Code: 0,
            // Details: ""
            let jsonBody: DetailsDTO = await response.json()
            let code = jsonBody.Code

            if (response.status === 201) {
                switch (code) {
                    case 1870:
                        setSuccess(true)
                        startCountDown()
                        setTimeout(() => {
                            // "Refresh" AuthorizationPage here to go back to login. Looks better than going back with conditional rendering
                            navigation.replace("AuthorizationPage")
                        }, 5500)
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
                {success && <Text style={auth.description}>Password changed. Returning to login in {countDown}...</Text>}
                {success === false && <Text style={auth.description}>Secure your account with a strong password. You'll have to login again after changing your password.</Text>}
            </View>

            <View style={{ flex: 0.75 }}>
                <View style={auth.notificationWrapper}>
                    {displayError && <ErrorNotification message={errorMessage} color={'rgb(245, 245, 245)'} />}
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
                    <Pressable style={passwordField !== "" && repeatPasswordField !== "" && passwordField === repeatPasswordField ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={passwordField === "" || repeatPasswordField === "" || passwordField !== repeatPasswordField || processing} onPress={() => onSubmit()} >
                        {processing && <Image style={auth.loadingIcon} source={require('../../../assets/icons/loadingicon.gif')} />}
                        {processing === false && <Text style={auth.primaryBtnText}>Submit</Text>}
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

export default ChangePassword