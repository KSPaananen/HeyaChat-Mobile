import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

type Props = {
    message: string
    color: string
}

// Animation modifiers
let multiplier = 2
let delay = 1
let start = -12
let end = 12
let passCounter = 0

const ErrorNotification: React.FC<Props> = ({ message, color }) => {
    // Animation
    const [countDown, setCountDown] = useState<number>(0)
    const [position, setPosition] = useState<number>(-9)
    const [direction, setDirection] = useState<number>(1) // 1 increases, -1 decreases

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((pos) => {
                const newValue = pos + direction * multiplier

                // Count every pass over value 0
                if (newValue <= 1 && newValue >= -1) {
                    passCounter++
                }

                switch (passCounter) {
                    case 3:
                        start = -9
                        end = 9
                        delay = 2
                        break
                    case 6:
                        start = -6
                        end = 9
                        delay = 6
                        break
                    case 10:
                        start = -3
                        end = 3
                        delay = 4
                        break
                    case 14:
                        start = -1
                        end = 1
                        delay = 5
                        break
                    case 18:
                        clearInterval(interval)
                        passCounter = 0
                        return 0
                        break
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
                <Text testID="errorNotificationText" style={{ color: color }}>{message}</Text>
            </View>
        </View>
  )
}

export default ErrorNotification

export const error = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
})