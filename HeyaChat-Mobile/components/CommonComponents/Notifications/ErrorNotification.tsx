import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'

type Props = {
    message: string
}

// Animation modifiers
let multiplier = 2
let delay = 1
let start = -12
let end = 12
let passCounter = 0

const ErrorNotification: React.FC<Props> = ({ message }) => {
    // Animation
    const [countDown, setCountDown] = useState<number>(0)
    const [position, setPosition] = useState<number>(-5)
    const [direction, setDirection] = useState<number>(1) // 1 increases, -1 decreases

    useEffect(() => {
        const interval = setInterval(() => {-
            setPosition((pos) => {
                const newValue = pos + direction * multiplier

                // Count every pass over value 0
                if (newValue <= 1 && newValue >= -1) {
                    passCounter++
                }

                if (passCounter >= 3 && passCounter <= 5) {
                    start = -9
                    end = 9
                    delay = 2
                } else if (passCounter >= 6 && passCounter < 9) {
                    start = -6
                    end = 9
                    delay = 6
                } else if (passCounter >= 10 && passCounter <= 13) {
                    start = -3
                    end = 3
                    delay = 4
                } else if (passCounter >= 14 && passCounter <= 17) {
                    start = -1
                    end = 1
                    delay = 5
                } else if (passCounter >= 18) {
                    clearInterval(interval)
                    passCounter = 0
                    return 0
                }
            
                if (newValue >= end) {
                    setDirection(-1)
                    return end
                } else if (newValue <= start) {
                    setDirection(1)
                    return start
                }

                return newValue
            })
        }, delay)
    
        return () => clearInterval(interval)
    }, [direction])

    return (
        <View style={error.container}>
            <View style={{ left: position }}>
                <Text>{message}</Text>
            </View>
        </View>
  )
}

export default ErrorNotification

export const error = StyleSheet.create({
  container: {
    marginLeft: 12,
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
})