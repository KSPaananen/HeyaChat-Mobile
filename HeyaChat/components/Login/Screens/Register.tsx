import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from "react-native-paper"
import DateTimePicker from 'react-native-ui-datepicker';
import { login } from '../MainPage'

interface Props {
  onPress1: () => void
  onPress2: () => void
}

const Register: React.FC<Props> = ({ onPress1, onPress2 }) => {
    const [usernameField, setUsernameField] = useState<string>("")
    const [emailField, setEmailField] = useState<string>("")
    const [dateOfBirthField, setDateOfBirthField] = useState<Date>(new Date())
    const [passwordField, setPasswordField] = useState<string>("")
    const [repeatPasswordField, setRepeatPasswordField] = useState<string>("")
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
    const [agreeEULA, setAgreeEULA] = useState<boolean>(false)

    // GUI
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [locale, setLocale] = useState<string>("en-US") // Read locale from DB later

    
    function test() {

    }

  return (
    <View>
        <View style={{ ...login.head, ...{ height: "15%"}}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={login.title}>Create an account</Text>
            </View>
        </View>

        <View style={{ ...login.body, ...{ height: "75%"}}}>
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={usernameField}
                    onChangeText={(value) => setUsernameField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Username" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
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
                        <Text style={{ fontSize: 16, margin: 0 }}>{dateOfBirthField.toString()}</Text>
                    </View>
                </Pressable>
            </View>
             {showDatePicker && <View style={{ margin: 5 }}>
                    <DateTimePicker 
                    mode="single"
                    locale={locale}
                    minDate={new Date("1900-1-1")}
                    maxDate={new Date()}
                    date={dateOfBirthField}
                    startDate={new Date()}
                    height={225}
                    onChange={(value) => {
                        if (value?.date) {
                            // I will pour lead into the local water supply if i get one more "date method is undefined" error
                            setDateOfBirthField(value?.date as Date)
                            setShowDatePicker(false)
                        }
                    }}
                />
            </View>}

            <View style={login.separatorWrapper} >
                <View style={login.separator} />
            </View>

            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={passwordField}
                    onChangeText={(value) => setPasswordField(value)}
                    mode="flat"
                    activeOutlineColor="#0330fc"
                    placeholder="Password" 
                    left={<TextInput.Icon icon="eye" style={{ }} />} 
                />
            </View>
            <View style={login.inputWrapper}>
                <TextInput 
                    style={login.input}
                    contentStyle={{ paddingLeft: 15 }}
                    underlineStyle={{ height: 0 }}
                    dense
                    value={repeatPasswordField}
                    onChangeText={(value) => setRepeatPasswordField(value)}
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
                    <Text style={login.checkboxText}>I have read and agree to EULA</Text>
                </Pressable>
            </View>
            <View style={login.primaryBtnWrapper}>
                <Pressable style={login.primaryBtn} onPress={() => onPress1()}>
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