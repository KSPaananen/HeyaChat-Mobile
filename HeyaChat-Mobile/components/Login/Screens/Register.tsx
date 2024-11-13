import { useState, useCallback,  } from 'react'
import { Text, View, Image, Pressable, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TextInput, Checkbox } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import Terms from '../../Reusables/LegalTexts/Terms'
import EULA from '../../Reusables/LegalTexts/EULA'
import ErrorNotification from '../../Reusables/Notifications/ErrorNotification'

interface Props {
    setContact: any
    navigation: any
    navigateToEmailVerifying: () => void // Navigate to email verifying screen after succesful register
    navigateToLogin: () => void // Navigate back to login screen
}

const Register: React.FC<Props> = ({ setContact, navigation, navigateToEmailVerifying, navigateToLogin }) => {
    // Fields
    const [usernameField, setUsernameField] = useState<string>("")
    const [emailField, setEmailField] = useState<string>("")
    const [passwordField, setPasswordField] = useState<string>("")
    const [passwordRepeatField, setPasswordRepeatField] = useState<string>("")

    // Field restrictions
    const usernameMaxLength: number = 20
    const usernameMinLength: number = 3
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordMinLength: number = 8

    // Button enabling booleans
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
    const [agreeEULA, setAgreeEULA] = useState<boolean>(false)

    // Gui
    const [generalError, setGeneralError] = useState<string>("")
    const [displayGeneralError, setDisplayGeneralError] = useState<boolean>(false)
    const [usernameError, setUsernameError] = useState<string>("")
    const [displayUsernameError, setDisplayUsernameError] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>("")
    const [displayEmailError, setDisplayEmailError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string>("")
    const [displayPasswordError, setDisplayPasswordError] = useState<boolean>(false)
    const [processing, setProcessing] = useState<boolean>(false)

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
    
    // Ensure username fits criteria and display errors accordingly
    const handleUsername = (value: string) => {
        const validChars: string[] = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
            "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
            "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            "0", "-", "_", ".",
        ]

        function getInvalidChars (value: string): string {
            let invalidChars: string = ""

            for (const char of value) {
                if (!validChars.includes(char.toUpperCase())) {
                    invalidChars += char
                } 
            }
            return invalidChars
        }

        let invalidChars: string = getInvalidChars(value)

        if (invalidChars === "" && value.length <= usernameMaxLength) { // No invalid characters and fits the length requirement
            // Clear displayed errors on the GUI
            setDisplayUsernameError(false)
        } else if (value.length > usernameMaxLength) { // Username too long
            // Display errors on the GUI
            setUsernameError("Username is too long")
            setDisplayUsernameError(true)
        } else if (invalidChars !== "") { // Invalif characters found
            // Display errors on the GUI
            setUsernameError(`Invalid characters found: ${invalidChars}`)
            setDisplayUsernameError(true)
        }
    }

    // Check if both password fields match
    const matchPasswords = (value: string) => {
        if (passwordField !== "" && passwordField.length <= value.length && passwordField !== value) { // Passwords dont match
            setPasswordError("Passwords don't match")
            setDisplayPasswordError(true)
        } else if (passwordField !== "" && passwordField.length > value.length) { // Hide error as repeat password is shorter
            setPasswordError("")
            setDisplayPasswordError(false)
        } else if (passwordField.length == value.length && passwordField === value) {
            setPasswordError("")
            setDisplayPasswordError(false)
        }
    }

    const onSubmit = async () => {
        // Hide all errors on submit
        setDisplayGeneralError(false)
        setDisplayUsernameError(false)
        setDisplayEmailError(false)
        setDisplayPasswordError(false)

        // Check if username meets minimum length requirements
        if (usernameField.length < usernameMinLength && usernameField.length >= 1) {
            setTimeout(() => {
                // Notification component works a bit better with some delay
                setUsernameError(`Username should be atleast ${usernameMinLength} characters long`)
                setDisplayUsernameError(true)
            }, 500)
            return
        } else if (usernameField.length === 0) { // Return if field is empty
            return
        }

        // Check if password meets minimum length requirements
        if (passwordField.length < passwordMinLength && passwordField.length >= 1) {
            setTimeout(() => {
                // Notification component works a bit better with some delay
                setPasswordError(`Password should be atleast ${passwordMinLength} characters long`)
                setDisplayPasswordError(true)
            }, 500)
            return
        } else if (passwordField.length === 0) { // Return is field is empty
            return
        }

        // Check if email is valid with regex
        if (!emailRegex.test(emailField) && emailField.length >= 1) {
            setTimeout(() => {
                // Notification component works a bit better with some delay
                setEmailError("Valid email address required")
                setDisplayEmailError(true)
            }, 500)
            return
        } else if (emailField.length === 0) { // Return is field is empty
            return
        }

        // Send post request to API if everything is ok
        if (usernameField.length <= usernameMaxLength && passwordField === passwordRepeatField && passwordField.length >= passwordMinLength && agreeTerms && agreeEULA) {
            // Set processing to true
            // After we get a response, set it to false
            setProcessing(true)

            let response: any

            // Post to API
            try {
                let api = new AuthorizationAPI()
                response = await api.Register(usernameField, passwordField, emailField)
            } catch {
                setTimeout(() => {
                    // Notification component works a bit better with some delay
                    setGeneralError(`Something went wrong :(`)
                    setDisplayGeneralError(true)
                }, 500)
                setProcessing(false)
                return
            }

            setProcessing(false)

            // Response body structure
            // Code: 0,
            // Details: ""
            let jsonBody: DetailsDTO = await response.json()
            let code = jsonBody.code

            if (response.status === 201) {
                switch (code) {
                    case 1570:
                        setContact(emailField)
                        navigateToEmailVerifying()
                        break
                }
            } else if (response.status === 302) {
                switch (code) {
                    case 1530:
                        setTimeout(() => {
                            setUsernameError(`Username and email address already in use`)
                            setDisplayUsernameError(true)
                        }, 500)
                        break
                    case 1531:
                        setTimeout(() => {
                            setUsernameError(`Username already in use`)
                            setDisplayUsernameError(true)
                        }, 500)
                        break
                    case 1532:
                        setTimeout(() => {
                            setEmailError(`Email address already in use`)
                            setDisplayEmailError(true)
                        }, 500)
                        break
                    case 1533:
                        setTimeout(() => {
                            setEmailError(`Email address permanently suspended`)
                            setDisplayEmailError(true)
                        }, 500)
                }
            } else if (response.status === 406) {
                switch (code) {
                    case 1534: // Didn't pass regex, but display as "Something went wrong"
                        setTimeout(() => {
                            setGeneralError(`Something went wrong :(`)
                            setDisplayGeneralError(true)
                        }, 500)
                }
            } else  {
                setTimeout(() => {
                    // Notification component works a bit better with some delay
                    setGeneralError(`Something went wrong :(`)
                    setDisplayGeneralError(true)
                }, 500)
            }
        }
    }

  return (
    <View>
        <View style={{ ...auth.head, ...{ height: "15%"}}}>
            <View style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
                <Text testID="registerPageTitle" style={auth.title}>Create an account</Text>
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "75%" }}}>
            
            <View style={auth.notificationWrapper}>
                {displayGeneralError && <ErrorNotification message={generalError} color={'rgb(245, 245, 245)'} />}
                {displayUsernameError && <ErrorNotification message={usernameError} color={'rgb(245, 245, 245)'} />}
            </View>
            
            <View style={auth.inputWrapper}>
                <TextInput 
                    testID='usernameField'
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    keyboardType="default"
                    dense
                    value={usernameField}
                    onChangeText={(value) => {handleUsername(value); setUsernameField(value)}}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username" 
                    left={<TextInput.Icon icon={() => <Octicons name="person" size={23} color="rgb(63, 118, 198)" />} />} 
                />
            </View>

            <View style={auth.notificationWrapper}>
                {displayEmailError && <ErrorNotification message={emailError} color={'rgb(245, 245, 245)'} />}
            </View>
            
            <View style={auth.inputWrapper}>
                <TextInput 
                    testID='emailField'
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    keyboardType="email-address"
                    dense
                    value={emailField}
                    onChangeText={(value) => setEmailField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Email" 
                    left={<TextInput.Icon icon={() => <Octicons name="mail" size={23} color="rgb(63, 118, 198)" />} />} 
                />
            </View>

            <View style={auth.separatorWrapper} >
                <View style={auth.separator} />
            </View>

            <View style={auth.notificationWrapper}>
                {displayPasswordError && <ErrorNotification message={passwordError} color={'rgb(245, 245, 245)'} />}
            </View>
            
            <View style={auth.inputWrapper}>
                <TextInput 
                    testID='passwordField'
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    // keyboardType="visible-password" // KeyboardType is currently bugged
                    dense
                    value={passwordField}
                    secureTextEntry={true}
                    onChangeText={(value) => setPasswordField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Password" 
                    left={<TextInput.Icon icon={() => <Octicons name="key" size={23} color="rgb(63, 118, 198)" />} />} 
                />
            </View>

            <View style={auth.notificationWrapper}>
                
            </View>

            <View style={auth.inputWrapper}>
                <TextInput 
                    testID='repeatPasswordField'
                    style={auth.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    // keyboardType="visible-password" // KeyboardType is currently bugged
                    dense
                    secureTextEntry={true}
                    onChangeText={(value) => {matchPasswords(value); setPasswordRepeatField(value)}}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Confirm password" 
                    left={<TextInput.Icon icon={() => <Octicons name="lock" size={23} color="rgb(63, 118, 198)" />} />} 
                />
            </View>
            
            <View style={{ ...auth.checkboxBtnWrapper, ...{ marginTop: 10 } }}>
                <Pressable style={auth.checkboxBtn} onPress={() => setAgreeTerms(!agreeTerms)}>
                    <Checkbox 
                        testID='termsCheckbox'
                        onPress={() => setAgreeTerms(!agreeTerms)}
                        status={ agreeTerms ? "checked" : "unchecked"}
                        color={'rgba(50, 200, 205, 1)'}
                        uncheckedColor={'rgba(50, 200, 205, 1)'}
                    />
                </Pressable>
                <Text style={auth.checkboxText}>I have read and agree to the</Text>
                <Pressable style={auth.checkboxTextBtn} onPress={() => navigation.navigate("FullscreenModal", { Component: Terms, Props: ["Terms Of Service"] })}>
                    <Text style={{ ...auth.checkboxText, ...{ color: 'rgba(50, 225, 225, 1)' } }}>Terms Of Service</Text>
                </Pressable>
            </View>
            <View style={auth.checkboxBtnWrapper}>
                <Pressable style={auth.checkboxBtn} onPress={() => setAgreeEULA(!agreeEULA)}>
                    <Checkbox 
                        testID='EULACheckbox'
                        onPress={() => setAgreeEULA(!agreeEULA)}
                        status={ agreeEULA ? "checked" : "unchecked"}
                        color={'rgba(50, 200, 205, 1)'}
                        uncheckedColor={'rgba(50, 200, 205, 1)'}
                    />
                </Pressable>
                <Text style={auth.checkboxText}>I have read and agree to the</Text>
                <Pressable style={auth.checkboxTextBtn} onPress={() => navigation.navigate("FullscreenModal", { Component: EULA, Props: ["End User License Agreement"] })}>
                    <Text style={{ ...auth.checkboxText, ...{ color: 'rgba(50, 225, 225, 1)' } }}>EULA</Text>
                </Pressable>
            </View>
            <View style={auth.primaryBtnWrapper}>
                <Pressable style={!usernameField || !emailField || !passwordField  || !passwordRepeatField || !agreeEULA || !agreeTerms ? auth.primaryBtnDisabled : auth.primaryBtn} onPress={() => onSubmit()} disabled={!agreeEULA || !agreeTerms || processing}>
                    {processing && <Image style={auth.loadingIcon} source={require('../../../assets/icons/loadingicon.gif')} />}
                    {processing === false && <Text style={auth.primaryBtnText}>Register</Text>}
                </Pressable>
            </View>
        </View>

        <View style={{ ...auth.footer, ...{ height: "10%"}}}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={auth.secondaryBtnWrapper}>
                    <Pressable style={auth.secondaryBtn} onPress={() => navigateToLogin()}>
                        <Text style={auth.secondaryBtnText}>Have an account? <Text style={{ color: 'rgba(50, 225, 225, 1)' }}>Log in!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Register