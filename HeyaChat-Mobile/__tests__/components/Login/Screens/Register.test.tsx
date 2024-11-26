import { render, fireEvent, waitFor, within, screen } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import Register from '../../../../components/Login/Screens/Register'

jest.useFakeTimers()

jest.mock('../../../../services/APIService', () => ({
    AuthorizationAPI: jest.fn(() => ({
        Register: jest.fn()
    }))
}))

describe('Register screen', () => {

    afterEach(() => {
        jest.resetAllMocks()
      })

    const mockSetContact = jest.fn()
    const mockNavigateToEmailVerifying = jest.fn()
    const mockNavigateToLogin = jest.fn()

    const setup = () => {
        return render(
            <NavigationContainer>
                <Register
                    setContact={mockSetContact}
                    navigation={{ navigate: jest.fn }}
                    navigateToEmailVerifying={mockNavigateToEmailVerifying}
                    navigateToLogin={mockNavigateToLogin}
                />
            </NavigationContainer>
        )
    }

    it('detects short usernames', () => {
        const { getByText, getByTestId, queryByTestId  } = setup()

        const usernameField = queryByTestId('usernameField')
        fireEvent.changeText(usernameField, 'te')

        const emailField = queryByTestId('emailField')
        fireEvent.changeText(emailField, 'testing.email@example.com')

        const passwordField = queryByTestId('passwordField')
        fireEvent.changeText(passwordField, 'testingPassword11')

        const repeatPasswordField = queryByTestId('repeatPasswordField')
        fireEvent.changeText(repeatPasswordField, 'testingPassword11')

        // Mock checking boxes
        const termsCheckbox = getByTestId('termsCheckbox')
        fireEvent.press(termsCheckbox)

        const EULACheckbox = getByTestId('EULACheckbox')
        fireEvent.press(EULACheckbox)

        const registerButton = getByText('Register')
        fireEvent.press(registerButton)

        expect(getByTestId("errorNotificationText")).not.toBeNull()
    })

    it('can change pages after filling out all fields and checking checkboxes', async () => {
        let mockBody = {
            code: 1570,
            details: "mock text"
        }

        // Mock succesful registering
        // global.fetch = jest.fn().mockImplementation(() => 
        //     Promise.resolve({
        //         status: 201,
        //         json: () => Promise.resolve(mockBody)
        //     })
        // )

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 201,
                json: () => Promise.resolve(mockBody)
            } as Response)
        )

        const { getByText, getByTestId, queryByTestId  } = setup()

         // Mock inserting data to fields
        const usernameField = queryByTestId('usernameField')
        fireEvent.changeText(usernameField, 'testingUsername11')

        const emailField = queryByTestId('emailField')
        fireEvent.changeText(emailField, 'testing.email@example.com')

        const passwordField = queryByTestId('passwordField')
        fireEvent.changeText(passwordField, 'testingPassword11')

        const repeatPasswordField = queryByTestId('repeatPasswordField')
        fireEvent.changeText(repeatPasswordField, 'testingPassword11')

        // Mock checking boxes
        const termsCheckbox = getByTestId('termsCheckbox')
        fireEvent.press(termsCheckbox)

        const EULACheckbox = getByTestId('EULACheckbox')
        fireEvent.press(EULACheckbox)

        const registerButton = getByText('Register')
        fireEvent.press(registerButton)

        await waitFor(() => {
            expect(mockNavigateToEmailVerifying).toHaveBeenCalled()
        })

        expect(getByTestId('verifyEmailTitle')).not.toBeNull()
    })


})