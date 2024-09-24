import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import { auth } from '../AuthorizationPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

interface Props {
    navigation: any
    onPress1: () => void // Navigate to recovery page
    onPress2: () => void // Navigate to registeration screen
    onPress3: () => void // Navigate to verification screen
}

const Login: React.FC<Props> = ({ navigation, onPress1, onPress2, onPress3 }) => {
    const [loginField, setLoginField] = useState<string>("")
    const [passwordField, setPasswordField] = useState<string>("")
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false)

    // GUI
    const [displayLoginError, setDisplayLoginError] = useState<boolean>(false)
    const [blurPassword, setBlurPassword] = useState<boolean>(true)

    const onSubmit = () => {
        // Reset all displayable errors on GUI
        setDisplayLoginError(false)

        // Post login details to backend
        let response: number = 200
        
        // If response is 200, navigate to home screen & save certificate
        if (response === 200) {
            navigation.navigate("AppBottomTabs", { screen: "Home"})
        } else if (response === 201) {
            onPress3()
        }
        else {
            setDisplayLoginError(true)
        }
    }
  

  return (
    <View>
        <View style={{ ...auth.head, ...{ height: "40%"} }}>
            <View style={auth.titleWrapper}>
                <Text style={auth.title}>Heya!Chat</Text>
                <Image style={auth.icon} source={require('../../../assets/icons/icon.png')} />
            </View>
        </View>

        <View style={{ ...auth.body, ...{ height: "45%"} }}>

            {displayLoginError && <ErrorBox 
                message="No users match password"
                borderRadius={5}
                onPress={() => setDisplayLoginError(false)}
            />}
            <View style={auth.inputWrapper}>
                <TextInput 
                    style={auth.input}
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
            <View style={{ ...auth.checkboxBtnWrapper, ...{ justifyContent: 'flex-end', marginRight: 10 } }}>
                <Pressable style={auth.checkboxBtn} onPress={() => setKeepLoggedIn(!keepLoggedIn)}>
                    <Checkbox 
                        onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                        status={ keepLoggedIn ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Text style={auth.checkboxText}>Stay signed in</Text>
            </View>
            <View style={{ ...auth.primaryBtnWrapper, ...{ marginTop: 40} }}>
                <Pressable style={auth.primaryBtn} onPress={() => onSubmit()} >
                    <Text style={auth.primaryBtnText}>Login</Text>
                </Pressable>
            </View>
            <View style={auth.secondaryBtnWrapper}>
                {/* Reset errorbox when navigating to other screens */}
                <Pressable style={auth.secondaryBtn} onPress={() => {onPress1(); setDisplayLoginError(false)}}>
                    <Text style={auth.secondaryBtnText}>Forgot your password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={{ ...auth.footer, ...{ height: "15%" } }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={auth.secondaryBtnWrapper}>
                    {/* Reset errorbox when navigating to other screens */}
                    <Pressable style={auth.secondaryBtn} onPress={() => {onPress2(); setDisplayLoginError(false)}}> 
                        <Text style={auth.secondaryBtnText}>Don't have an account? <Text style={{ color: 'blue' }}>Sign up!</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login