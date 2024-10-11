import { useEffect, useState, useCallback } from 'react'
import { Text, View, Image, Pressable, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TextInput, Checkbox } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../Reusables/Notifications/ErrorNotification'

interface Props {
    setContact: any
    setContactType: any
    navigateToCodeVerifying: () => void // Navigate to verification screen
    navigateToLogin: () => void // Return to login screen
}

const Recovery: React.FC<Props> = ({ setContact, setContactType, navigateToCodeVerifying, navigateToLogin }) => {
    // Fields
    const [emailField, setEmailField] = useState<string>("")

    // GUI 
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [processing, setProcessing] = useState<boolean>(false)

    // Field restrictions
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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

    const onSubmit = async () => {
        // Reset displayable errors
        setDisplayError(false)

        // Set processing to true
        // After we get a response, set it to false
        setProcessing(true)

        let response: any

        // Post to backend
        try {
            let api = new AuthorizationAPI()
            response = await api.Recover(emailField)
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
        // Contact: ""
        // Details: {
        //    Code: 0
        //    Details: ""
        // }
        let jsonBody:ContactDTO = await response.json()
        let contact = jsonBody.Contact
        let code = jsonBody.Details?.Code

        if (response.status === 200) {
            // Set contact type according to code. Can be either email or phone
            switch (code) {
                case 1070:
                    setContactType("email")
                    break;
                case 1071:
                    setContactType("phone")
                    break;
            }
            // Set contact string from response body and navigate to code verifying
            setContact(contact)
            navigateToCodeVerifying()
        } else if (response.status === 404) {
            switch (code) {
                case 1030:
                    setTimeout(() => {
                        setErrorMessage("User matching login couldn't be found")
                        setDisplayError(true)
                    }, 500)
                    break;
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
                    <Text style={auth.description}>Enter the email address associated with your account. You'll receive a code shortly after.</Text>
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
                            value={emailField}
                            onChangeText={(value) => setEmailField(value)}
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Email" 
                            left={<TextInput.Icon icon={() => <Octicons name="mail" size={23} color="rgb(63, 118, 198)" />} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 50} }}>
                        <Pressable style={emailField != "" ? auth.primaryBtn : auth.primaryBtnDisabled} disabled={emailField == "" || processing} onPress={() => onSubmit()} >
                            {processing && <Image style={auth.loadingIcon} source={require('../../../assets/icons/loadingicon.gif')} />}
                            {processing === false && <Text style={auth.primaryBtnText}>Recover</Text>}
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