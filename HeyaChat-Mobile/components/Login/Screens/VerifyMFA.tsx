import { useEffect, useState, useCallback } from 'react'
import { Text, View, Image, Pressable, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import { AuthorizationAPI } from '../../../services/APIService'
import { auth } from '../AuthorizationPage'

import ErrorNotification from '../../Reusables/Notifications/ErrorNotification'

interface Props {
    contact: string
    blurredContact: string
    contactType: string
    navigation: any
    navigateToLogin: () => void
    requestCodeCoolDown: boolean // Boolean for displaying cooldown
    countDown: number // Countdown number for time left
    setCoolDown: Function // Method call for starting countdown and disabling further requests for a set time
}

const VerifyMFA: React.FC<Props> = ({ contact, blurredContact, contactType, navigation, navigateToLogin, requestCodeCoolDown, countDown, setCoolDown }) => {
    const [codeField, setCodeField] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
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

    const RequestCode = async (userContact: string) => {
        // Set code requesting on cooldown to prevent spam
        setCoolDown(true)

        // Reset displayable errors
        setDisplayError(false)

        // Set processing to true
        // After we get a response, set it to false
        setProcessing(true)

        let response: any

        try {
            let api = new AuthorizationAPI()
            response = await api.RequestNewCode(userContact)
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
        let jsonBody:DetailsDTO = await response.json()
        let code = jsonBody.code

        if (response.status === 200) {
            // Do nothing, user should be checking his email/texts by now
        } else if (response.status === 404) {
            switch (code) {
                case 2130:
                    setTimeout(() => {
                        setErrorMessage("User matching contact couldn't be found")
                        setDisplayError(true)
                    }, 500)
                    break
            }
        } else {
            setTimeout(() => {
                setErrorMessage("Something went wrong :(")
                setDisplayError(true)
            }, 500)
        }
    }

    const onSubmit = async () => {
        // Reset all displayable errors on submit
        setDisplayError(false)

        // Set processing to true to alter GUI state
        // After we get a response, set processing to false
        setProcessing(true)

        let response: any

        try {
            let api = new AuthorizationAPI()
            response = await api.VerifyMFA(codeField, contact)
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
        let code = jsonBody.code

        if (response.status === 200) {
            switch (code) {
                case 1470:
                    // Reset stack so user cant return to this screen with return button
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'AppBottomTabs', params: { screen: 'Home' } }],
                        })
                      )
                    break
            }
        } else if (response.status === 404) {
            switch (code) {
                case 1430:
                    setTimeout(() => {
                        setErrorMessage("Incorrect code")
                        setDisplayError(true)
                    }, 500)
                    break
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
                <View style={auth.titleWrapper}>
                    <Text style={auth.title}>Additional confirmation</Text>
                    <Text style={auth.title}>required</Text>
                </View>
            </View>

            <View style={{ ...auth.body, ...{ height: "67%" } }}>

                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={auth.description}>Please enter the verification code we have sent to
                        {contactType === "email" && <Text style={auth.description}>your email address {blurredContact}</Text>}
                        {contactType === "phone" && <Text style={auth.description}>your phone number {blurredContact}</Text>}
                    </Text>
                </View>

                <View style={{ flex: 0.65 }}>
                    
                    <View style={auth.notificationWrapper}>
                        {displayError && <ErrorNotification message={errorMessage} color={'rgb(245, 245, 245)'} />}
                    </View>

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
                            left={<TextInput.Icon icon={() => <Octicons name="hash" size={23} color="rgb(63, 118, 198)" />} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 50} }}>
                        <Pressable style={codeField != "" ? auth.primaryBtn : auth.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == "" || processing}>
                            {processing && <Image style={auth.loadingIcon} source={require('../../../assets/icons/loadingicon.gif')} />}
                            {processing === false && <Text style={auth.primaryBtnText}>Verify code</Text>}
                        </Pressable>
                    </View>

                    <View style={auth.secondaryBtnWrapper}>
                        <Pressable style={auth.secondaryBtn} onPress={() => RequestCode(contact)} disabled={requestCodeCoolDown}>
                        <Text style={!requestCodeCoolDown ? auth.secondaryBtnText : auth.secondaryBtnDisabledText}>Didn't receive your code? <Text style={!requestCodeCoolDown ? { ...auth.secondaryBtnText, ...{ color: 'rgba(50, 225, 225, 1)'  }} : { ...auth.secondaryBtnDisabledText }}>Request </Text>a new one</Text>
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

export default VerifyMFA