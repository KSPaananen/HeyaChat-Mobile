import { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView,Pressable, TouchableOpacity, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MessengerStackParams } from '../../NavigationStacks/MessengerNavStack'
import { TextInput } from "react-native-paper"

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
        {<MessageCard 
          messageId={0}
          messageType="sent"
          chatType="direct"
          message="Sent direct message"
          onPress={(value: number) => onPress(value)}
          onHold={(value: number) => onHold(value)}
        />}

        {<MessageCard 
          messageId={0}
          messageType="received"
          chatType="direct"
          message="Received direct message"
          onPress={(value: number) => onPress(value)}
          onHold={(value: number) => onHold(value)}
        />}

        {<MessageCard 
          messageId={0}
          messageType="sent"
          chatType="group"
          message="Sent group message"
          onPress={(value: number) => onPress(value)}
          onHold={(value: number) => onHold(value)}
        />}

        {<MessageCard 
          messageId={0}
          messageType="received"
          chatType="group"
          message="Received group message"
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

export const messager = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)'
  },
  body: {
    marginBottom: 0
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputWrapper: {
    flex: 1,
    height: 55,
    padding: 2.5,
    marginVertical: 10, 
    marginHorizontal: 5,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  input: {
    height: 50,
    overflow: 'hidden',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  inputIcon: {

  },
  iconWrapper: {
    height: 55,
    width: 55,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  icon: {
    height: 50,
    width: 50,
    marginTop: 5,
    marginLeft: 2.5,
    marginBottom: 5,
    borderRadius: 100,
  },

})