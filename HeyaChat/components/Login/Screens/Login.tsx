import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { login } from '../MainPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

interface Props {
  onPress1: () => void // Navigate to home screen
  onPress2: () => void // Navigate to recovery page
  onPress3: () => void // Navigate to registeration screen
}

const Login: React.FC<Props> = ({ onPress1, onPress2, onPress3 }) => {
    const [loginField, setLoginField] = useState<string>("")
    const [passwordField, setPasswordField] = useState<string>("")
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false)

    // GUI
    const [displayLoginError, setDisplayLoginError] = useState<boolean>(false)
    const [blurPassword, setBlurPassword] = useState<boolean>(true)

    const onSubmit = () => {
        // Post login details to backend
        const response: number = 200
        

        // If response is 200, navigate to home screen & save certificate
        if (response === 200) {
            setDisplayLoginError(false)
            onPress1()
        } else {
            setDisplayLoginError(true)
        }
    }
  

  return (
    <View>
        <View style={{ ...login.head, ...{ height: "40%"} }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={login.title}>Heya!Chat</Text>
                <Image style={login.icon} source={require('../../../assets/icons/icon.png')} />
            </View>
        </View>

        <View style={{ ...login.body, ...{ height: "45%"} }}>

            {displayLoginError && <ErrorBox 
                message="No users match password"
                borderRadius={5}
                onPress={() => setDisplayLoginError(false)}
            />}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={loginField}
                    onChangeText={(value) => setLoginField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username or email" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
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
                    placeholder="Password" 
                    right={passwordField && 
                        <TextInput.Icon
                            icon={blurPassword ? "eye" : "eye-off"}
                            onPress={() => setBlurPassword(!blurPassword)}
                        />
                    }
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            <View style={{ ...login.checkboxBtnWrapper, ...{ justifyContent: 'flex-end', marginRight: 10 } }}>
                <Pressable style={login.checkboxBtn} onPress={() => setKeepLoggedIn(!keepLoggedIn)}>
                    <Checkbox 
                        onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                        status={ keepLoggedIn ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Text style={login.checkboxText}>Stay signed in</Text>
            </View>
            <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                <Pressable style={login.primaryBtn} onPress={() => onSubmit()} >
                    <Text style={login.primaryBtnText}>Login</Text>
                </Pressable>
            </View>
            <View style={login.secondaryBtnWrapper}>
                {/* Reset errorbox when navigating to other screens */}
                <Pressable style={login.secondaryBtn} onPress={() => {onPress2(); setDisplayLoginError(false)}}>
                    <Text style={login.secondaryBtnText}>Forgot your password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={{ ...login.footer, ...{ height: "15%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={login.secondaryBtnWrapper}>
                    {/* Reset errorbox when navigating to other screens */}
                    <Pressable style={login.secondaryBtn} onPress={() => {onPress3(); setDisplayLoginError(false)}}> 
                        <Text style={login.secondaryBtnText}>Don't have an account? <Text style={{ color: 'blue' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login