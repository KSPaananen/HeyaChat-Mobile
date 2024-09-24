import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParams } from '../NavigationStacks/LoginNavStack'
import * as SplashScreen from 'expo-splash-screen';

import Login from './Screens/Login'
import Register from './Screens/Register'
import Verify from './Screens/Verify'
import Recovery from './Screens/Recovery'
import ChangePassword from './Screens/ChangePassword'

type Props = NativeStackScreenProps<LoginStackParams, "AuthorizationPage">

const AuthorizationPage: React.FC<Props> = ({ navigation }) => {
    // Screen booleans
    const [loginPage, setLoginPage] = useState<boolean>(true)
    const [registerPage, setRegisterPage] = useState<boolean>(false)
    const [recoveryPage, setRecoveryPage] = useState<boolean>(false)
    const [verifyPage, setVerifyPage] = useState<boolean>(false)
    const [changePasswordPage, setChangePasswordPage] = useState<boolean>(false)

    // Code re-request cooldown state persistence stuff
    const [requestEmailCoolDown, setRequestEmailCoolDown] = useState<boolean>(false)
    const [countDown, setCountDown] = useState<number>(30)
    const setCoolDown = (value: boolean) => {
      // Set cooldown to true
      setRequestEmailCoolDown(true)

      // Animate a countdown for GUI
      let count: number = 30 

      let intervalId = setInterval(() => {
          count--
          setCountDown(count)

          if(count === 0) {
              clearInterval(intervalId)
              setRequestEmailCoolDown(false)
          }
      }, 1000)
      setCountDown(30) // Set countdown back to 30 or next countdown displays 0 at the beginning
    }

    // constants which are to be passed for Verify.tsx component
    const [email, setEmail] = useState<string>("") // String which is displayed on Verify.tsx
    const [lastPage, setLastPage] = useState<string>("") // register | recover (Dictates component content)

    const OnLayout = async () => {
      // Hide splashscreen on screen show
      await SplashScreen.hideAsync();
    }

    return (
        <View style={auth.container} onLayout={OnLayout}>
            <View style={auth.wrapper}>

                {loginPage && <Login 
                  navigation={navigation}
                  onPress1={() => {setLoginPage(false); setRecoveryPage(true)}} // Navigate to account recovery 
                  onPress2={() => {setLoginPage(false); setRegisterPage(true)}} // Navigate to registering
                  onPress3={() => {setLastPage("register"); setLoginPage(false); setVerifyPage(true)}} // Navigate to verify page if users email isn't confirmed
                />}

                {registerPage && <Register
                  navigation={navigation}
                  onPress1={() => {setLastPage("register"); setRegisterPage(false); setVerifyPage(true)}} // Navigate to verification screen after succesful post
                  onPress2={() => {setRegisterPage(false); setLoginPage(true)}} // Return back to login screen
                />}

                {recoveryPage && <Recovery 
                  setEmail={setEmail}
                  onPress1={() => {setLastPage("recover"); setRecoveryPage(false); setVerifyPage(true)}} // After inserting email, navigate to verification screen
                  onPress2={() => {setRecoveryPage(false); setLoginPage(true)}} // Return to login screen
                  requestEmailCoolDown={requestEmailCoolDown}
                  countDown={countDown}
                  setCoolDown={setCoolDown}
                />}

                {verifyPage && <Verify 
                  navigation={navigation}
                  email={email}
                  lastPage={lastPage} // Which type of verification page to show
                  setVerifyPage={setVerifyPage}
                  setRegisterPage={setRegisterPage}
                  setRecoveryPage={setRecoveryPage}
                  setChangePasswordPage={setChangePasswordPage}
                  requestEmailCoolDown={requestEmailCoolDown}
                  countDown={countDown}
                  setCoolDown={setCoolDown}
                />}

                {changePasswordPage && <ChangePassword 
                  onPress1={() => {setChangePasswordPage(false); setLoginPage(true)}} // Navigate to login page to re-login after changing password
                  onPress2={() => {setChangePasswordPage(false); setVerifyPage(true)}} // Return to verify page
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