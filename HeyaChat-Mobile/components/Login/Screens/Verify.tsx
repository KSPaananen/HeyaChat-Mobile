import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { auth } from '../AuthorizationPage'

interface Props {
    navigation: any
    email: string
    lastPage: string // Marks last page and dictates content on this page
    setVerifyPage: any // Boolean for displaying this screen
    setRegisterPage: any // Boolean for displaying Register.tsx component
    setRecoveryPage: any // Boolean for displaying Recovery.tsx component
    setChangePasswordPage: any // Boolean for displaying ChangePassword.tsx component
    requestEmailCoolDown: boolean // Boolean for displaying cooldown
    countDown: number // Countdown number for time left
    setCoolDown: Function // Method call for starting countdown and disabling further email requests
}

const Verify: React.FC<Props> = ({ navigation, email, lastPage, setVerifyPage, setRegisterPage, setRecoveryPage, setChangePasswordPage, requestEmailCoolDown, countDown, setCoolDown }) => {
    const [codeField, setCodeField] = useState<string>("")
    const [codeError, setCodeError] = useState<boolean>(false)

    const requestEmail = () => {
        // Set email requesting on cooldown to prevent spam
        setCoolDown(true)

    }

    const onSubmit = () => {
        // Reset all displayable errors on submit
        setCodeError(false)

        let response = 200

        // Depending on the last page, navigate to either home page or password changer screen
        if (lastPage == "register" && response == 200) {
            navigation.navigate("AppBottomTabs", { screen: "Home"})
        } else if (lastPage == "recover" && response == 200) {
            setVerifyPage(false)
            setChangePasswordPage(true)
        } else {
            setCodeError(true)
        }

    }

    return (
        <View>

            <View style={{ ...auth.head, ...{ height: "20%"} }}>
                {lastPage === "register" && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={auth.title}>Email verification</Text>
                </View>}
                {lastPage === "recover" && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={auth.title}>Verification</Text>
                </View>}
            </View>

            <View style={{ ...auth.body, ...{ height: "70%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                    <Text style={auth.description}>Please enter the verification code we have sent to</Text>
                    <Text style={auth.description}>your email address {email}</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    
                    {codeError && <Text style={auth.errorText}>Code didn't belong to any existing accounts</Text>}
                    <View style={auth.inputWrapper}>
                        <TextInput 
                            style={auth.input}
                            contentStyle={{ paddingLeft: 15 }}
                            underlineStyle={{ height: 0 }}
                            dense
                            keyboardType="number-pad"
                            value={codeField}
                            onChangeText={(value) => setCodeField(value)}
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Code" 
                            left={<TextInput.Icon icon="eye" style={{ }} />} 
                        />
                    </View>

                    <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        {lastPage === "register" && <Pressable style={codeField != "" ? auth.primaryBtn : auth.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == ""}>
                            <Text style={auth.primaryBtnText}>Verify email</Text>
                        </Pressable>}
                        {lastPage === "recover" && <Pressable style={codeField != "" ? auth.primaryBtn : auth.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == ""}>
                            <Text style={auth.primaryBtnText}>Verify code</Text>
                        </Pressable>}
                    </View>
                    <View style={auth.secondaryBtnWrapper}>
                        <Pressable style={auth.secondaryBtn} onPress={() => requestEmail()} disabled={requestEmailCoolDown}>
                            <Text style={!requestEmailCoolDown ? auth.secondaryBtnText : auth.secondaryBtnDisabledText}>Didn't receive your code? <Text style={!requestEmailCoolDown ? { ...auth.secondaryBtnText, ...{ color: 'blue' }} : auth.secondaryBtnText}>Request </Text>a new one</Text>
                            {requestEmailCoolDown && <Text style={auth.secondaryBtnDisabledText}>Next request avaible in {countDown}</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={{ ...auth.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={auth.secondaryBtnWrapper}>
                        {/* Navigate back to register screen */}
                        {lastPage === "register" && <Pressable style={auth.secondaryBtn} onPress={() => {setVerifyPage(false); setRegisterPage(true)}}>
                            <Text style={auth.secondaryBtnText}>Return</Text>
                        </Pressable>}
                        {/* Navigate back to recovery screen */}
                        {lastPage === "recover" && <Pressable style={auth.secondaryBtn} onPress={() => {setVerifyPage(false); setRecoveryPage(true)}}>
                            <Text style={auth.secondaryBtnText}>Return</Text>
                        </Pressable>}
                    </View>
                </View>
            </View>

        </View>
  )
}

export default Verify