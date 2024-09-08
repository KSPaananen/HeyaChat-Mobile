import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import DateTimePicker from 'react-native-ui-datepicker';
import * as Localization from 'expo-localization';
import { login } from '../MainPage'

import ErrorBox from '../../CommonComponents/ErrorBox'

interface Props {
  onPress1: () => void // Navigate to code verification screen
  onPress2: () => void // Navigate back to login screen
}

const Register: React.FC<Props> = ({ onPress1, onPress2 }) => {
    // Fields
    const [usernameField, setUsernameField] = useState<string>("")
    const [emailField, setEmailField] = useState<string>("")
    const [dateOfBirthField, setDateOfBirthField] = useState<Date>()
    const [passwordField, setPasswordField] = useState<string>("")

    // Account creation booleans
    const [usernameValid, setUsernameValid] = useState<boolean>(false)
    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
    const [agreeEULA, setAgreeEULA] = useState<boolean>(false)

    // GUI
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [displayUsernameTakenError, setDisplayUsernameTakenError] = useState<boolean>(false)
    const [displayUsernameCharacterError, setDisplayUsernameCharacterError] = useState<boolean>(false)
    const [displayUsernameLongError, setDisplayUsernameLongError] = useState<boolean>(false)
    const [displayUsernameShortError, setDisplayUsernameShortError] = useState<boolean>(false)
    const [invalidCharacters, setInvalidCharacters] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<string>("")
    const [displayEmailError, setDisplayEmailError] = useState<boolean>(false)
    const [displayPasswordMatchError, setDisplayPasswordMatchError] = useState<boolean>(false)
    const [displayPasswordLengthError, setDisplayPasswordLengthError] = useState<boolean>(false)
    

    const usernameMaxLength: number = 32
    const usernameMinLength: number = 3
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordMinLength: number = 8

    const userLocalization = Localization.getLocales()

    // Ensure username fits criteria and display errors accordingly
    const checkUsername = (value: string) => {
        setUsernameField(value)

        const validChars: string[] = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
            "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
            "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            "0", "-", "_", ".",
        ]

        function getInvalidChars (value: string): string {
            let invalidChars: string = ""

            for (const char of value) {
                if (!validChars.includes(char.toUpperCase())) {
                    invalidChars += char
                } 
            }
            return invalidChars
        }

        let invalidChars: string = getInvalidChars(value)

        if (invalidChars === "" && value.length <= usernameMaxLength) {
            // Set GUI values
            setInvalidCharacters("")
            setDisplayUsernameCharacterError(false)
            setDisplayUsernameLongError(false)
            setDisplayUsernameShortError(false)

            // Set username as valid for onSubmit method
            setUsernameValid(true)
        } else if (value.length > usernameMaxLength) {
            // Set GUI values
            setDisplayUsernameLongError(true)

            // Set username as invalid
            setUsernameValid(false)
        } else {
            // Set GUI values
            setDisplayUsernameCharacterError(true)
            setInvalidCharacters(invalidChars)

            // Set username as invalid
            setUsernameValid(false)
        }
    }

    // Check if passwords match
    const matchPasswords = (value: string) => {
        if (passwordField.length <= value.length && passwordField !== value) {
            setDisplayPasswordMatchError(true)
            setPasswordsMatch(false)
        } else if (passwordField.length > value.length) {
            setDisplayPasswordMatchError(false)
            setPasswordsMatch(false)
        } else if (passwordField.length == value.length && passwordField === value) {
            setDisplayPasswordMatchError(false)
            setPasswordsMatch(true)
        }
    }

    // Trim and assign picked date to the selector as string and pass date value to dateOfBirthField
    const handleDate = (dt: Date) => {
        // Hide date picker
        setShowDatePicker(false)

        // Pass dt to dateofBirthField
        if (dt != null) {
            setDateOfBirthField(new Date(dt))
        }
        
        const date: string = dt.toLocaleString(userLocalization[0].languageTag)

        const trimmedDate: string = date.substring(0, date.indexOf(","))
        setDateOfBirth(trimmedDate)
    }

    // Post registeration to backend
    const onSubmit = () => {
        // Reset all errors on submit
        setDisplayUsernameTakenError(false)
        setDisplayUsernameShortError(false)
        setDisplayPasswordLengthError(false)
        setDisplayEmailError(false)

        // Check all fields are valid

        if (usernameField.length < usernameMinLength && usernameField.length >= 1) {
            setDisplayUsernameShortError(true)
        }

        if (passwordField.length < passwordMinLength && passwordField.length >= 1) {
            setDisplayPasswordLengthError(true)
        }

        if (!emailRegex.test(emailField) && emailField.length >= 1) {
            setDisplayEmailError(true)
        }

        // Verify everything is on order and post to backend
        if (usernameValid && emailField !== "" && passwordValid && passwordsMatch && agreeTerms && agreeEULA) {
            // Post registeration details to backend
            const response: number = 200
            const errorType: string = "username"

            // If response is 200, navigate to code verification screen
            if (response === 200) {
                onPress1()
            } else if (response === 304 && errorType === "username") { // If error is username taken, display error
                setDisplayUsernameTakenError(true)
            } else if (response === 304 && errorType === "email") { // If error is email in use, display error
                
            }
        } 
    }

  return (
    <View>
        <View style={{ ...login.head, ...{ height: "15%"}}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={login.title}>Create an account</Text>
            </View>
        </View>

        <View style={{ ...login.body, ...{ height: "75%"}}}>
        {displayUsernameTakenError && <Text style={{ color: 'red', marginLeft: 10}}>Username is already in use</Text>}
        {displayUsernameLongError && <Text style={{ color: 'red', marginLeft: 10}}>Username too long!</Text>}
        {displayUsernameShortError && <Text style={{ color: 'red', marginLeft: 10}}>Username too short!</Text>}
        {displayUsernameCharacterError && <Text style={{ color: 'red', marginLeft: 10}}>Disallowed characters found: {invalidCharacters}</Text>}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    keyboardType="default"
                    dense
                    value={usernameField}
                    onChangeText={(value) => checkUsername(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            {displayEmailError && <Text style={{ color: 'red', marginLeft: 10}}>Insert a valid email</Text>}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    keyboardType="email-address"
                    dense
                    value={emailField}
                    onChangeText={(value) => setEmailField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Email" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            <View style={login.inputWrapper}>
                <Pressable style={{ backgroundColor: 'red' , height: 50, alignItems: 'flex-start', justifyContent: 'center' }} onPress={() => setShowDatePicker(!showDatePicker)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                        <Image style={{ height: 30, width: 30, marginLeft: 12, marginRight: 12, borderRadius: 100 }} source={require('../../../assets/icons/icon.png')} />
                        {!dateOfBirthField && <Text style={{ fontSize: 16, margin: 0 }}>Date of birth</Text>}
                        {dateOfBirthField && <Text style={{ fontSize: 16, margin: 0, letterSpacing: 0.3 }}>{dateOfBirth}</Text>}
                    </View>
                </Pressable>
            </View>
            {showDatePicker && <View style={{ margin: 5 }}>
                <DateTimePicker 
                    mode="single"
                    locale={userLocalization[0].languageTag}
                    minDate={new Date("1900-1-1")}
                    maxDate={new Date()}
                    date={dateOfBirthField}
                    startDate={new Date()}
                    height={250}
                    onChange={(value) => handleDate(new Date(value?.date as Date))}
                />
            </View>}

            <View style={login.separatorWrapper} >
                <View style={login.separator} />
            </View>

            {displayPasswordLengthError && <Text style={{ color: 'red', marginLeft: 10}}>Password has to be atleast 8 characters long</Text>}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    // keyboardType="visible-password" // KeyboardType is currently bugged
                    dense
                    value={passwordField}
                    secureTextEntry={true}
                    onChangeText={(value) => setPasswordField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Password" 
                    left={<TextInput.Icon icon="eye" style={{ }} />}
                />
            </View>
            {displayPasswordMatchError && <Text style={{ color: 'red', marginLeft: 10}}>Passwords do not match!</Text>}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    // keyboardType="visible-password" // KeyboardType is currently bugged
                    dense
                    secureTextEntry={true}
                    onChangeText={(value) => matchPasswords(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Re-enter password" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            
            <View style={{ ...login.checkboxBtnWrapper, ...{ alignItems: 'flex-start' } }}>
                <Pressable style={login.checkboxBtn} onPress={() => setAgreeTerms(!agreeTerms)}>
                    <Checkbox 
                        onPress={() => setAgreeTerms(!agreeTerms)}
                        status={ agreeTerms ? "checked" : "unchecked"}
                    />
                    <Text style={login.checkboxText}>I have read and agree to the terms</Text>
                </Pressable>
            </View>
            <View style={{ ...login.checkboxBtnWrapper, ...{ alignItems: 'flex-start' } }}>
                <Pressable style={login.checkboxBtn} onPress={() => setAgreeEULA(!agreeEULA)}>
                    <Checkbox 
                        onPress={() => setAgreeEULA(!agreeEULA)}
                        status={ agreeEULA ? "checked" : "unchecked"}
                    />
                    <Text style={login.checkboxText}>I have read and agree to the EULA</Text>
                </Pressable>
            </View>
            <View style={login.primaryBtnWrapper}>
                <Pressable style={!agreeEULA || !agreeTerms ? login.primaryBtnDisabled : login.primaryBtn} onPress={() => onSubmit()} disabled={!agreeEULA && !agreeTerms}>
                    <Text style={login.primaryBtnText}>Register</Text>
                </Pressable>
            </View>
        </View>

        {/* Hide footer when date picker is open to prevent overlap */}
        {!showDatePicker && <View style={{ ...login.footer, ...{ height: "10%"}}}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={login.secondaryBtnWrapper}>
                    <Pressable style={login.secondaryBtn} onPress={() => onPress2()}>
                        <Text style={login.secondaryBtnText}>Have an account? <Text style={{ color: 'blue' }}>Sign in</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>}
    </View>
  )
}

export default Register