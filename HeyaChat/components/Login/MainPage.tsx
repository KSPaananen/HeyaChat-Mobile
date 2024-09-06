import { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginStackParams } from '../NavigationStacks/LoginNavStack'

import Login from './Screens/Login'
import Register from './Screens/Register'

type Props = NativeStackScreenProps<LoginStackParams, "MainPage">

const MainPage: React.FC<Props> = ({ navigation }) => {
    const [loginPage, setLoginPage] = useState<boolean>(true)
    const [registerPage, setRegisterPage] = useState<boolean>(false)
    const [recoveryPage, setRecoveryPage] = useState<boolean>(false)

    const onSubmit = () => {

    }

    return (
        <View style={login.container}>
            <View style={login.wrapper}>

                {loginPage && <Login 
                    onPress1={() => navigation.navigate("AppBottomTabs", { screen: "Home"})} // Log in
                    onPress2={() => {setLoginPage(false); setRecoveryPage(true)}} // Recover
                    onPress3={() => {setLoginPage(false); setRegisterPage(true)}} // Register
                />}

                {registerPage && <Register
                    onPress1={() => navigation.navigate("AppBottomTabs", { screen: "Home"})} // Register
                    onPress2={() => {setRegisterPage(false); setLoginPage(true)}} // Sign in
                />}

                {recoveryPage}

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
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },

    ///////////////////////////

    inputWrapper: {
        marginVertical: 10, 
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
        marginHorizontal: 5, 
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
        marginHorizontal: 10
    },
    checkboxBtn: {
        flexDirection: 'row',  
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxText: {
        fontSize: 14, 
        justifyContent: 'center', 
        alignItems: 'center'
    },


    ///////////////////////////

    
   
    
    title: {
      fontSize: 25,
      marginTop: 15,
    },
    icon: {
      height: 50,
      width: 200,
      marginTop: 15,
    },

// Buttons/pressables
    
    
    
  })