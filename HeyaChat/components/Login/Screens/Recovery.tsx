import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { login } from '../MainPage'

interface Props {
    onPress1: () => void // Navigate to verification screen
    onPress2: () => void // Return to login screen
}

const Recovery: React.FC<Props> = ({ onPress1, onPress2 }) => {

    const requestEmail = () => {

        let response = 200

        if (response === 200) {
            onPress1()
        }
    }

  
    return (
        <View>

            <View style={{ ...login.head, ...{ height: "15%"} }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={login.title}>Recover your account</Text>
                </View>
            </View>

            <View style={{ ...login.body, ...{ height: "75%" } }}>
                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 45 }}>
                    <Text style={login.description}>Please enter your email address associated with the account</Text>
                </View>
                <View style={{ flex: 0.65 }}>
            
                    <View style={login.inputWrapper}>
                        <TextInput 
                            style={login.input}
                            contentStyle={{ paddingLeft: 15 }}
                            underlineStyle={{ height: 0 }}
                            dense
                            mode="flat"
                            activeOutlineColor="#0330fc"
                            placeholder="Email" 
                        />
                    </View>

                    <View style={{ ...login.primaryBtnWrapper, ...{ marginTop: 40} }}>
                        <Pressable style={login.primaryBtn} onPress={() => requestEmail()} >
                            <Text style={login.primaryBtnText}>Recover</Text>
                        </Pressable>
                    </View>

                    <View style={login.secondaryBtnWrapper}>
                        {/* Reset errorbox when navigating to other screens */}
                        <Pressable style={login.secondaryBtn} onPress={() => {}}>
                            <Text style={login.secondaryBtnText}>Didn't receive your email? <Text style={{ ...login.secondaryBtnText, ...{ color: 'blue' } }}>Resend </Text>code</Text>
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

export default Recovery