import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

type Props = {
    message: string
    borderRadius: number
    onPress: () => void // Close box
}

const ErrorBox: React.FC<Props> = ({ message, borderRadius, onPress }) => {
  
  return (
    <View style={{ ...error.container, ...{ borderRadius: borderRadius } }}>
        <View style={{ ...error.half, ...{ flex: 0.85, alignItems: 'flex-start' } }}>
            {message && <Text style={{ color: 'white', fontSize: 15 }}>{message}</Text>}
            {!message && <Text style={{ color: 'white', fontSize: 15 }}>Error :(</Text>}
        </View>
        <View style={{ ...error.half, ...{ flex: 0.15, alignItems: 'flex-end' } }}>
            <Pressable onPress={() => onPress()}>
                <Image style={error.icon} source={require('../../assets/icons/icon.png')} />
            </Pressable>
        </View>
    </View>
  );
}

export default ErrorBox

export const error = StyleSheet.create({
    container: {
        flexDirection:'row', 
        margin: 5, 
        overflow: 'hidden', 
        backgroundColor: 'red',
    },
    half: {
        padding: 5, 
        marginLeft: 5, 
        justifyContent: 'center'
    },
    icon: {
        height: 25, 
        width: 25, 
        borderRadius: 100 
    }
})