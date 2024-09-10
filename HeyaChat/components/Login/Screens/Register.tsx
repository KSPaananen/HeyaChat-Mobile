import { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import DateTimePicker from 'react-native-ui-datepicker';
import * as Localization from 'expo-localization';
import { login } from '../MainPage'

interface Props {
  onPress1: () => void // Change state to code verification screen
  onPress2: () => void // Change state back to login screen
  onPress3: () => void // Navigate to terms page
  onPress4: () => void // Navigate to EULA page
}

//
// Not proud of the code structure here, redo later
//

const Register: React.FC<Props> = ({ onPress1, onPress2, onPress3, onPress4 }) => {
    // Fields
    const [usernameField, setUsernameField] = useState<string>("")
    const [emailField, setEmailField] = useState<string>("")
    const [dateOfBirthField, setDateOfBirthField] = useState<Date>(new Date())
    const [passwordField, setPasswordField] = useState<string>("")

    // Field restrictions
    const usernameMaxLength: number = 32
    const usernameMinLength: number = 3
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const minimumAge : number = 13
    const passwordMinLength: number = 8

    // Account creation booleans
    const [usernameValid, setUsernameValid] = useState<boolean>(false)
    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [userAgeValid, setUserAgeValid] = useState<boolean>(false)
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
    const [dateOfBirth, setDateOfBirth] = useState<string>("Date of birth")
    const [displayDateOfBirthAgeError, setDisplayDateOfBirthAgeError] = useState<boolean>(false)
    const [displayEmailInvalidError, setDisplayEmailInvalidError] = useState<boolean>(false)
    const [displayEmailTakenError, setDisplayEmailTakenError] = useState<boolean>(false)
    const [displayPasswordMatchError, setDisplayPasswordMatchError] = useState<boolean>(false)
    const [displayPasswordLengthError, setDisplayPasswordLengthError] = useState<boolean>(false)
    
    const userLocalization = Localization.getLocales()

    // Ensure username fits criteria and display errors accordingly
    const handleUsername = (value: string) => {
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

        if (invalidChars === "" && value.length <= usernameMaxLength) { // No invalid characters and fits the length requirement
            // Clear displayed errors on the GUI
            setDisplayUsernameCharacterError(false)
            setDisplayUsernameLongError(false)
            setDisplayUsernameShortError(false)

            // Clear invalid characters
            setInvalidCharacters("")

            // Set username as valid for onSubmit method
            setUsernameValid(true)
        } else if (value.length > usernameMaxLength) { // Username too long
            // Display errors on the GUI
            setDisplayUsernameLongError(true)

            // Set username as invalid
            setUsernameValid(false)
        } else if (invalidChars !== "") { // Invalif characters found
            // Display errors on the GUI
            setDisplayUsernameCharacterError(true)
            setInvalidCharacters(invalidChars)

            // Set username as invalid
            setUsernameValid(false)
        }
    }

    // Calculate if user is over the required minimum age
    const verifyAge = (value: Date) => {
        // Reset user age valid to avoid age tricking
        setUserAgeValid(false)

        const dateToday = new Date()

        const ageCheckPassed = dateToday.getFullYear() - value.getFullYear() > minimumAge || 
        (dateToday.getFullYear() - value.getFullYear() == minimumAge && dateToday.getMonth() > value.getMonth()) ||
        (dateToday.getFullYear() - value.getFullYear() == minimumAge && dateToday.getMonth() >= value.getMonth() && dateToday.getDate() >= value.getDate())

        // If user is old enough, set userAgeValid to true
        if (ageCheckPassed) {
            setUserAgeValid(true)
        } else { // Display error on GUI
            setDisplayDateOfBirthAgeError(true)
        }
    }

    // Check if both password fields match
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
            setPasswordValid(true)
        }
    }

    // Trim and assign picked date to the selector button as string and pass date value to dateOfBirthField
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

    const onSubmit = () => {
        onPress1()
        // Reset all displayable errors on submit
        setDisplayUsernameTakenError(false)
        setDisplayUsernameShortError(false)
        setDisplayEmailInvalidError(false)
        setDisplayDateOfBirthAgeError(false)
        setDisplayPasswordLengthError(false)

        // Check if username meets minimum length requirements
        if (usernameField.length < usernameMinLength && usernameField.length >= 1) {
            setDisplayUsernameShortError(true)
        }

        // Check if user is old enough to use the app
        verifyAge(dateOfBirthField)
        
        // Check if password meets minimum length requirements
        if (passwordField.length < passwordMinLength && passwordField.length >= 1) {
            setDisplayPasswordLengthError(true)
        }

        // Check if email is valid with regex
        if (!emailRegex.test(emailField) && emailField.length >= 1) {
            setDisplayEmailInvalidError(true)
            setEmailValid(false)
        } else {
            setEmailValid(true)
        }

        // Verify everything is on order and post to backend
        if (usernameValid && emailValid && userAgeValid && passwordValid && passwordsMatch && agreeTerms && agreeEULA) {
            // Post registeration details to backend
            const response: number = 200
            const errorType: string = "username"

            // If response is 200, navigate to code verification screen
            if (response === 200) {
                // onPress1()
            } else if (response === 304 && errorType === "username") { // If error is username taken, display error
                setDisplayUsernameTakenError(true)
            } else if (response === 304 && errorType === "email") { // If error is email in use, display error
                setDisplayEmailTakenError(true)
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
        {displayUsernameTakenError && <Text style={login.errorText}>Username is already in use</Text>}
        {displayUsernameLongError && <Text style={login.errorText}>Username too long!</Text>}
        {displayUsernameShortError && <Text style={login.errorText}>Username too short!</Text>}
        {displayUsernameCharacterError && <Text style={login.errorText}>Disallowed characters found: {invalidCharacters}</Text>}
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    keyboardType="default"
                    dense
                    value={usernameField}
                    onChangeText={(value) => handleUsername(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            {displayEmailTakenError && <Text style={login.errorText}>Username is already in use</Text>}
            {displayEmailInvalidError && <Text style={login.errorText}>Insert a valid email</Text>}
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
            {displayDateOfBirthAgeError && <Text style={login.errorText}>You must be atleast 13 to use this service</Text>}
            <View style={login.inputWrapper}>
                <Pressable style={{ backgroundColor: 'red' , height: 50, alignItems: 'flex-start', justifyContent: 'center' }} onPress={() => setShowDatePicker(!showDatePicker)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                        <Image style={{ height: 30, width: 30, marginLeft: 12, marginRight: 12, borderRadius: 100 }} source={require('../../../assets/icons/icon.png')} />
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

            {displayPasswordLengthError && <Text style={login.errorText}>Password has to be atleast 8 characters long</Text>}
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
            {displayPasswordMatchError && <Text style={login.errorText}>Passwords do not match!</Text>}
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
            
            <View style={{ ...login.checkboxBtnWrapper, ...{ marginTop: 10 } }}>
                <Pressable style={login.checkboxBtn} onPress={() => setAgreeTerms(!agreeTerms)}>
                    <Checkbox 
                        onPress={() => setAgreeTerms(!agreeTerms)}
                        status={ agreeTerms ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Text style={login.checkboxText}>I'm over the age of 13 and agree to the</Text>
                <Pressable style={login.checkboxTextBtn} onPress={() => onPress3()}>
                    <Text style={{ ...login.checkboxText, ...{ color: 'blue' } }}>terms</Text>
                </Pressable>
            </View>
            <View style={login.checkboxBtnWrapper}>
                <Pressable style={login.checkboxBtn} onPress={() => setAgreeEULA(!agreeEULA)}>
                    <Checkbox 
                        onPress={() => setAgreeEULA(!agreeEULA)}
                        status={ agreeEULA ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Text style={login.checkboxText}>I have read and agree to the</Text>
                <Pressable style={login.checkboxTextBtn} onPress={() => onPress4()}>
                <Text style={{ ...login.checkboxText, ...{ color: 'blue' } }}>EULA</Text>
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