import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { login } from '../MainPage'

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

            <View style={{ ...login.head, ...{ height: "20%"} }}>
                {lastPage === "register" && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={login.title}>Email verification</Text>
                </View>}
                {lastPage === "recover" && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={login.title}>Verification</Text>
                </View>}
            </View>

            <View style={{ ...login.body, ...{ height: "70%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                    <Text style={login.description}>Please enter the verification code we have sent to</Text>
                    <Text style={login.description}>your email address {email}</Text>
                </View>
                <View style={{ flex: 0.65 }}>
                    
                    {codeError && <Text style={login.errorText}>Code didn't belong to any existing accounts</Text>}
                    <View style={login.inputWrapper}>
                        <TextInput 
                            style={login.input}
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

                    <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        {lastPage === "register" && <Pressable style={codeField != "" ? login.primaryBtn : login.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == ""}>
                            <Text style={login.primaryBtnText}>Verify email</Text>
                        </Pressable>}
                        {lastPage === "recover" && <Pressable style={codeField != "" ? login.primaryBtn : login.primaryBtnDisabled } onPress={() => onSubmit()} disabled={codeField == ""}>
                            <Text style={login.primaryBtnText}>Verify code</Text>
                        </Pressable>}
                    </View>
                    <View style={login.secondaryBtnWrapper}>
                        <Pressable style={login.secondaryBtn} onPress={() => requestEmail()} disabled={requestEmailCoolDown}>
                            <Text style={!requestEmailCoolDown ? login.secondaryBtnText : login.secondaryBtnDisabledText}>Didn't receive your email? <Text style={{ ...login.secondaryBtnText, ...{ color: 'blue' } }}>Resend </Text>code</Text>
                            {requestEmailCoolDown && <Text style={login.secondaryBtnDisabledText}>Next request avaible in {countDown}</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>

            <View style={{ ...login.footer, ...{ height: "10%" } }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={login.secondaryBtnWrapper}>
                        {/* Navigate back to register screen */}
                        {lastPage === "register" && <Pressable style={login.secondaryBtn} onPress={() => {setVerifyPage(false); setRegisterPage(true)}}>
                            <Text style={login.secondaryBtnText}>Return</Text>
                        </Pressable>}
                        {/* Navigate back to recovery screen */}
                        {lastPage === "recover" && <Pressable style={login.secondaryBtn} onPress={() => {setVerifyPage(false); setRecoveryPage(true)}}>
                            <Text style={login.secondaryBtnText}>Return</Text>
                        </Pressable>}
                    </View>
                </View>
            </View>

        </View>
  )
}

export default Verify