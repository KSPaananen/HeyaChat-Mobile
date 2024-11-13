import { render, fireEvent, within, screen } from '@testing-library/react-native'
import AuthorizationPage from '../../../components/Login/AuthorizationPage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LoginStackParams } from '../../../components/NavigationStacks/LoginNavStack'

jest.useFakeTimers()

// Mock navigation prop
const mockNav = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any

// Mock route
const mockRoute = {} as any

type Props = NativeStackScreenProps<LoginStackParams, 'AuthorizationPage'>
  
// Mock props
const mockProps = {
    navigation: mockNav,
    route: mockRoute
} as Props

describe('AuthorizationPage', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('can change to recovery page', async () => {
        const { getByText, getByTestId, queryByTestId  } = render(
            <NavigationContainer>
                <AuthorizationPage {...mockProps} />
            </NavigationContainer>
        )

        // Mock a press on recovery button
        const button = getByText('Forgot your password?')
        fireEvent.press(button)

        expect(getByText('Recover your account')).toBeTruthy()
    })

    it('can change to register page', async () => {
        const { getByText, getByTestId, queryByTestId  } = render(
            <NavigationContainer>
                <AuthorizationPage {...mockProps} />
            </NavigationContainer>
        )

        // Mock a press on register button
        const button = getByText("Don't have an account? Sign up!")
        fireEvent.press(button)

        expect(getByText('Create an account')).toBeTruthy()
    })

})