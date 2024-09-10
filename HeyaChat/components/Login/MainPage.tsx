import { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParams } from '../NavigationStacks/LoginNavStack'

import Login from './Screens/Login'
import Register from './Screens/Register'
import Verify from './Screens/Verify'
import Recovery from './Screens/Recovery'

import Terms from '../CommonComponents/LegalTexts/Terms'
import EULA from '../CommonComponents/LegalTexts/EULA'

type Props = NativeStackScreenProps<LoginStackParams, "MainPage">

const MainPage: React.FC<Props> = ({ navigation }) => {
    const [loginPage, setLoginPage] = useState<boolean>(true)
    const [registerPage, setRegisterPage] = useState<boolean>(false)
    const [recoveryPage, setRecoveryPage] = useState<boolean>(false)
    const [verifyPage, setVerifyPage] = useState<boolean>(false)
  
    const [verifyPageType, setVerifyPageType] = useState<string>("")

    return (
        <View style={login.container}>
            <View style={login.wrapper}>

                {loginPage && <Login 
                    onPress1={() => navigation.navigate("AppBottomTabs", { screen: "Home"})} // Navigate to home screen after succesful login
                    onPress2={() => {setVerifyPageType("recover"); setLoginPage(false); setRecoveryPage(true)}} // Navigate to recovery 
                    onPress3={() => {setVerifyPageType("register"); setLoginPage(false); setRegisterPage(true)}} // Navigate to registering
                />}

                {registerPage && <Register
                    onPress1={() => {setRegisterPage(false); setVerifyPage(true)}} // Navigate to verification screen after succesful post
                    onPress2={() => {setRegisterPage(false); setLoginPage(true)}} // Return back to login screen
                    onPress3={() => navigation.navigate("FullscreenModal", { param: "Terms of service", Component: Terms })} // Bring up Terms of service
                    onPress4={() => navigation.navigate("FullscreenModal", { param: "End User License Agreement", Component: EULA })} // Bring up EULA
                />}

                {recoveryPage && <Recovery 
                  onPress1={() => {setVerifyPageType("recover"); setRecoveryPage(false); setVerifyPage(true)}} // After inserting email, navigate to verification screen
                  onPress2={() => {setRecoveryPage(false); setLoginPage(true)}} // Return to login screen
                />}

                {verifyPage && <Verify 
                  type={verifyPageType} // Which type of verification page to show
                  onPress1={() => navigation.navigate("AppBottomTabs", { screen: "Home"})} // Navigate to home screen after succesful verification during account creation
                  onPress2={() => {}} // Navigate to new password screen during recovery
                  onPress3={() => {setVerifyPage(false); setRegisterPage(true)}} // Return back to register screen
                  onPress4={() => {setVerifyPage(false); setRecoveryPage(true)}} // Return back to recovery screen
                />}

            </View>
        </View>
    )
}

export default MainPage

export const login = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff'
    },
    wrapper: {
      flex: 1,
      marginVertical: 55,
      marginHorizontal: 30,
      borderRadius: 45,
      borderWidth: 1,
      borderColor: 'gray',
      overflow: 'hidden'
    },
    head: {
      marginHorizontal: 5
    },
    body: {
      marginHorizontal: 5,
      justifyContent: 'center', 
    },
    footer: {
      marginHorizontal: 5,
    },
    separatorWrapper: {
      flexDirection: 'row',  
    },
    separator: {
        flex: 1,
        height: 1,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
    inputWrapper: {
        marginTop: 10, 
        marginBottom: 5, 
        marginHorizontal: 5, 
        borderRadius: 100, 
        overflow: 'hidden'
    },
    input: {
        height: 50,
    },
    primaryBtnWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    primaryBtn: {
      flex: 1, 
      height: 50, 
      borderRadius: 100, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'gray'
    },
    primaryBtnDisabled: {
      flex: 1, 
      height: 50, 
      borderRadius: 100, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'lightgray'
    },
    primaryBtnText: {
        fontSize: 15,
    },
    secondaryBtnWrapper: {
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
    },
    secondaryBtn: {
        padding: 10
    },
    secondaryBtnText: {
        fontSize: 12,
    },
    checkboxBtnWrapper: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'flex-start',
    },
    checkboxBtn: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxTextBtn: {
      flexDirection: 'row',
      paddingVertical: 5, 
      paddingHorizontal: 4, 
    },
    checkboxText: {
      fontSize: 13,
      marginBottom: 1,
    },
    titleWrapper: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    title: {
      fontSize: 25,
      marginTop: 25,
    },
    description: {
      fontSize: 13,
      marginLeft: 10
    },
    errorText: {
      color: 'red', 
      marginLeft: 10
    },
    icon: {
      height: 50,
      width: 200,
      marginTop: 15,
    },

  })