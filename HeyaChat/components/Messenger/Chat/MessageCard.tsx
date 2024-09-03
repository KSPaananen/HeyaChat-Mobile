import { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, ImageSourcePropType, ImageURISource } from 'react-native'
import { messageCard } from '../../../assets/styles/styles'


interface Props {
    messageId: number // id of the message
    messageType: string // sent or received
    chatType: string // one on one chat or group chat
    message?: string // message string
    image?: ImageSourcePropType // image
    video?: any // Preview of a video with download on click
    onPress: (messageId: number) => void // Press to expand media
    onHold: (messageId: number) => void // Hold to bring up a menu for messages
}

const MessageCard: React.FC<Props> = ({ messageId, messageType, chatType, message, image, video, onPress, onHold }) => {

    useEffect(() => {
        // Get user data with messageId


    }, [])

    return (
        <View style={messageCard.container}>

            {messageType == "sent" && <View style={{ ...messageCard.messageSent, ...{ marginLeft: 150, marginRight: 5 } }}>
                <Pressable style={{ ...messageCard.messageFrame, ...{marginRight: 5} }} onLongPress={() => onHold(messageId)}>
                    <View>

                        {chatType == "group" && <Text style={messageCard.username}>username</Text>}

                        {message != null && message != "" && <Text style={{ }}>{message}</Text>}

                        {image != null && <View style={messageCard.mediaContainer}>
                            <View style={messageCard.mediaWrapper}>
                                <Pressable onPress={() => onPress(messageId)}>
                                    <Image style={messageCard.media} source={image} resizeMode="center" />
                                </Pressable>
                            </View>
                        </View>}

                        {video != null && <View style={messageCard.mediaContainer}>
                            <View style={messageCard.mediaWrapper}>
                                <Pressable onPress={() => onPress(messageId)}>
                                    <Image style={messageCard.media} source={image} resizeMode="center" />
                                </Pressable>
                            </View>
                        </View>}

                    </View>
                    <View style={{ alignItems: 'flex-end'}}>
                        <Text style={messageCard.dateTime}>13:24</Text>
                    </View>
                </Pressable>
                {chatType == "group" && <Image style={messageCard.icon} source={require('../../../assets/icons/icon.png')} />}
            </View>}

            {messageType == "received" && <View style={{ ...messageCard.messageReceived, ...{ marginRight: 150, marginLeft: 5 } }}>
                {chatType == "group" && <Image style={messageCard.icon} source={require('../../../assets/icons/icon.png')} />}
                <Pressable style={{ ...messageCard.messageFrame, ...{marginLeft: 5} }} onLongPress={() => onHold(messageId)}>
                    <View>

                        {chatType == "group" && <Text style={messageCard.username}>username</Text>}

                        {message != null && message != "" && <Text style={{ }}>{message}</Text>}

                        {image != null && <View style={messageCard.mediaContainer}>
                            <View style={messageCard.mediaWrapper}>
                                <Pressable onPress={() => onPress(messageId)}>
                                    <Image style={messageCard.media} source={image} resizeMode="center" />
                                </Pressable>
                            </View>
                        </View>}

                        {video != null && <View style={messageCard.mediaContainer}>
                            <View style={messageCard.mediaWrapper}>
                                <Pressable onPress={() => onPress(messageId)}>
                                    <Image style={messageCard.media} source={image} resizeMode="center" />
                                </Pressable>
                            </View>
                        </View>}

                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={messageCard.dateTime}>13:24</Text>
                    </View>
                </Pressable>
            </View>}
            
        </View>
    )
}

export default MessageCard

