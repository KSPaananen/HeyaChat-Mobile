import { useEffect, useState } from 'react';
import { Text, View, ScrollView,Pressable, TouchableOpacity, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MessengerStackParams } from '../../NavigationStacks/MessengerNavStack'
import { TextInput } from "react-native-paper"
import { messager } from '../../../assets/styles/styles'

import MessageCard from './MessageCard'

type Props = NativeStackScreenProps<MessengerStackParams, "ChatPage">

const ChatPage: React.FC<Props> = ({ route, navigation }) => {
  const { userIds } = route.params

  // GUI

  // Message
  const [message, setMessage] = useState<string>("")

  function onSubmit() {
    // Send message

    setMessage("")
  }

  function  onPress(messageId: number) {
    // Expand media to fullscreen
    

  }

  function onHold(messageId: number) {
    // Open menu where you can delete or edit the message

  }

  function addImage() {
    // Embed image to textinput

  }

  return (
    <View style={messager.container}>

      <ScrollView style={messager.body} 
      contentContainerStyle={{ justifyContent: 'flex-end' }} 
      keyboardDismissMode="on-drag"
      >
        {/* Add marginBottom: 65 to the last MessageCard */}
        {<MessageCard 
          messageId={0}
          messageType="sent"
          chatType="direct"
          message="Sent direct message"
          onPress={(value: number) => onPress(value)}
          onHold={(value: number) => onHold(value)}
        />}
        
      </ScrollView>
    
      <View style={messager.footer}>
        <View style={messager.inputWrapper}>
          <TextInput style={messager.input}
            mode="flat"
            value={message}
            underlineStyle={{height: 0}}
            onChangeText={(value) => setMessage(value)}
            right={<TextInput.Icon icon="eye" style={messager.inputIcon} />} 
            onSubmitEditing={() => onSubmit()}
          />
        </View>
        <View style={messager.iconWrapper}>
          <TouchableOpacity onPress={() => addImage()}>
            <Image style={messager.icon} source={require('../../../assets/icons/icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

export default ChatPage