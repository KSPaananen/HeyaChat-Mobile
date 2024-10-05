import { useState, useEffect } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParams } from '../NavigationStacks/LoginNavStack'
import { LinearGradient } from 'expo-linear-gradient'
import * as SplashScreen from 'expo-splash-screen'

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

    // Code re-request cooldown state persistence stuff
    const [requestCodeCoolDown, setRequestCodeCoolDown] = useState<boolean>(false)
    const [countDown, setCountDown] = useState<number>(30)

    // Animation
    const [position, setPosition] = useState<number>(0.5)
    const [direction, setDirection] = useState<number>(1) // 1 increases, -1 decreases

    useEffect(() => {
      const interval = setInterval(() => {
        setPosition((pos) => {
          const newValue = pos + direction * 0.005
  
          if (newValue >= 0.7) {
            setDirection(-1)
            return 0.7
          } else if (newValue <= 0.3) {
            setDirection(1)
            return 0.3
          }
          return newValue
        })
      }, 100)
  
      return () => clearInterval(interval)
    }, [direction])

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
      await SplashScreen.hideAsync()
    }

    return (
        <View style={auth.container} onLayout={OnLayout}>
          <LinearGradient
            // colors={['rgb(78, 50, 170)', 'rgb(67, 113, 180)', 'rgb(55, 175, 189)']}
            colors={['rgb(72, 35, 195)', 'rgb(63, 118, 198)', 'rgb(55, 200, 200)']}
            style={auth.background}
            locations={[0, position, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            />
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
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
    wrapper: {
      flex: 1,
      marginVertical: 55,
      marginHorizontal: 30,
      borderRadius: 45,
      borderWidth: 0,
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
        marginTop: 27,
        marginBottom: 6,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
    inputWrapper: {
        marginHorizontal: 5, 
        borderRadius: 100, 
        overflow: 'hidden'
    },
    input: {
        height: 50,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    primaryBtnWrapper: {
        flexDirection: 'row',
        marginTop: 40,
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
      backgroundColor: 'rgb(255, 255, 255)'
    },
    primaryBtnDisabled: {
      flex: 1, 
      height: 50, 
      borderRadius: 100, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    primaryBtnText: {
      fontSize: 16,
      color: 'black'
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
        fontSize: 13,
        color: 'black'
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
      alignItems: 'center',
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
    icon: {
      height: 75,
      width: 75,
      marginTop: 15,
    },
    notificationWrapper: {
      justifyContent: 'center',
      marginTop: 2,
      marginBottom: 6,
      height: 20,
      
    }
  })