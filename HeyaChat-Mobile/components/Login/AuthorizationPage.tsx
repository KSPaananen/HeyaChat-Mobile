import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParams } from '../NavigationStacks/LoginNavStack'
import * as SplashScreen from 'expo-splash-screen';

import Login from './Screens/Login'
import Register from './Screens/Register'
import Recovery from './Screens/Recovery'
import ChangePassword from './Screens/ChangePassword'
import VerifyMFA from './Screens/VerifyMFA'
import VerifyEmail from './Screens/VerifyEmail'
import VerifyCode from './Screens/VerifyCode'

type Props = NativeStackScreenProps<LoginStackParams, "AuthorizationPage">

const AuthorizationPage: React.FC<Props> = ({ navigation }) => {
    // Screen booleans
    const [loginPage, setLoginPage] = useState<boolean>(true)
    const [registerPage, setRegisterPage] = useState<boolean>(false)
    const [recoveryPage, setRecoveryPage] = useState<boolean>(false)
    const [changePasswordPage, setChangePasswordPage] = useState<boolean>(false)
    const [verifyMFAPage, setVerifyMFAPage] = useState<boolean>(false)
    const [verifyEmailPage, setVerifyEmailPage] = useState<boolean>(false)
    const [verifyCodePage, setVerifyCodePage] = useState<boolean>(false)

    // Constants which influence navigation behaviour (mostly returning)
    const [lastPage, setLastPage] = useState<string>("")

    // Code re-request cooldown state persistence stuff
    const [requestCodeCoolDown, setRequestCodeCoolDown] = useState<boolean>(false)
    const [countDown, setCountDown] = useState<number>(30)

    const setCoolDown = (value: boolean) => {
      setRequestCodeCoolDown(true)

      // Animate a countdown for GUI
      let count: number = 30 

      let intervalId = setInterval(() => {
          count--
          setCountDown(count)

          if(count === 0) {
              clearInterval(intervalId)
              setRequestCodeCoolDown(false)
          }
      }, 1000)
      setCountDown(30) // Set countdown back to 30 or next countdown displays 0 at the beginning
    }

    const OnLayout = async () => {
      // Hide splashscreen on screen show
      await SplashScreen.hideAsync();
    }

    return (
        <View style={auth.container} onLayout={OnLayout}>
            <View style={auth.wrapper}>

                {loginPage && <Login 
                  navigation={navigation}
                  navigateToRecovery={() => {setLoginPage(false); setRecoveryPage(true)}} // Navigate to account recovery 
                  navigateToRegistering={() => {setLoginPage(false); setRegisterPage(true)}} // Navigate to registering
                  navigateToMfaVerifying={() => {setLoginPage(false); setVerifyMFAPage(true)}} // Navigate to mfa verifying screen
                  navigateToEmailVerifying={() => {setLoginPage(false); setVerifyEmailPage(true)}} // Navigate to email verifying screen
                />}

                {registerPage && <Register
                  navigation={navigation}
                  navigateToEmailVerifying={() => {setRegisterPage(false); setVerifyEmailPage(true)}} // Navigate to email confirmation screen
                  navigateToLogin={() => {setRegisterPage(false); setLoginPage(true)}} // Return back to login screen
                />}

                {recoveryPage && <Recovery 
                  navigateToCodeVerifying={() => {setRecoveryPage(false); setVerifyCodePage(true)}} // Navigate to code verifying screen
                  navigateToLogin={() => {setRecoveryPage(false); setLoginPage(true)}} // Return to login screen
                />}

                {changePasswordPage && <ChangePassword 
                  navigateToLogin={() => {setChangePasswordPage(false); setLoginPage(true)}} // Return to login
                />}

                {verifyMFAPage && <VerifyMFA
                  navigation={navigation}
                  navigateToLogin={() => {setVerifyMFAPage(false); setLoginPage(true)}}
                  requestCodeCoolDown={requestCodeCoolDown} // Boolean for displaying cooldown
                  countDown={countDown} // Cooldown remaining length
                  setCoolDown={setCoolDown} //Method for starting cooldown and disabling further requests for a set time
                />}

                {verifyEmailPage && <VerifyEmail
                  navigation={navigation}
                  navigateToLogin={() => {setVerifyEmailPage(false); setLoginPage(true)}}
                  requestCodeCoolDown={requestCodeCoolDown} // Boolean for displaying cooldown
                  countDown={countDown} // Cooldown remaining length
                  setCoolDown={setCoolDown} //Method for starting cooldown and disabling further requests for a set time
                />}

                {verifyCodePage && <VerifyCode
                  navigation={navigation}
                  navigateToPasswordChange={() => {setVerifyCodePage(false); setChangePasswordPage(true)}}
                  navigateToLogin={() => {setVerifyCodePage(false); setLoginPage(true)}}
                  requestCodeCoolDown={requestCodeCoolDown} // Boolean for displaying cooldown
                  countDown={countDown} // Cooldown remaining length
                  setCoolDown={setCoolDown} //Method for starting cooldown and disabling further requests for a set time
                />}

            </View>
        </View>
    )
}

export default AuthorizationPage

export const auth = StyleSheet.create({
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
        marginTop: 30,
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
        alignItems: 'center',
    },
    secondaryBtn: {
        padding: 10,
        alignItems: 'center',
    },
    secondaryBtnText: {
        fontSize: 12,
    },
    secondaryBtnDisabledText : {
      fontSize: 12,
      color: 'gray'
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
      marginTop: 0,
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