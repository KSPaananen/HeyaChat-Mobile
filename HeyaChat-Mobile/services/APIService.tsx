import { StorageService } from './StorageService'

// --- API classes --- //
export class AuthorizationAPI {
    StorageService: StorageService

    constructor() {
        this.StorageService = new StorageService()
    }

    Register = async (username: string, password: string, email: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: Register()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()
            
            const req = new Request(baseUri + "/Authorization/Register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    Email: email,
                    UserDevice: parsedDevice
                })
            })

            // 201: New user registered
            // 302: Username or email already in use or blocked
            // 406: Regex check failed
            // 500: Internal server error
            const res = await fetch(req)

            // Store received token to storage from authorization header
            if (res.status === 201) {
                let token = res.headers.get("authorization")

                if (token !== null) {
                    this.StorageService.StoreValue("jsonwebtoken", token)
                }
            }

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: Register()")
        }
    }

    Login = async (login: string, password: string, biometricsKey: string | null): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: Login()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()
        
            // Create request
            const req = new Request(baseUri + "/Authorization/Login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Login: login,
                    Password: password,
                    BiometricsKey: biometricsKey ?? "",
                    UserDevice: parsedDevice
                })
            })

            // 200: Login succesful
            // 202: MFA verification required
            // 401: Login unsuccesful
            // 403: User suspended
            // 500: Internal server error
            const res = await fetch(req)

            // Store received token to storage from authorization header
            // Store token with 403, because permanently suspended users get a token in order to delete their accounts
            if (res.status === 200 ||res.status === 403) {
                let token = res.headers.get("authorization")

                if (token !== null) {
                    this.StorageService.StoreValue("jsonwebtoken", token)
                }
            }

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: Login()")
        }
    }

    LogOut = async (): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")

            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: LogOut()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const storageService = new StorageService()
            let token = await storageService.ReadValue("jsonwebtoken")

            if (token === null) {
                return null
            }
        
            // Create request
            const req = new Request(baseUri + "/Authorization/LogOut", {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserDevice: parsedDevice
                })
            })

            // 200: User logged out
            // 404: Token doesn't belong to user
            // 500: Internal server error
            const res = await fetch(req)

            // Remove token from storage
            await storageService.Delete("jsonwebtoken")

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: LogOut()")
        }
    }
    
    PingBackend = async (): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")

            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: PingBackend()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const storageService = new StorageService()
            let token = await storageService.ReadValue("jsonwebtoken")

            if (token === null) {
                return null
            }
        
            // Create request
            const req = new Request(baseUri + "/Authorization/PingBackend", {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserDevice: parsedDevice
                })
            })

            // 200: Ping succesful
            // 500: Internal server error
            const res = await fetch(req)

            // Store authorization header if response was 200
            if (res.status === 200) {
                let token = res.headers.get("authorization")

                if (token !== null) {
                    this.StorageService.StoreValue("jsonwebtoken", token)
                }
            }

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: PingBackend()")
        }
    }

    VerifyEmail = async (code: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: VerifyEmail()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const storageService = new StorageService()
            let token = await storageService.ReadValue("jsonwebtoken")

            if (token === null) {
                return null
            }
            
            const req = new Request(baseUri + "/Verification/VerifyEmail", {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Code: code,
                    UserDevice: parsedDevice
                })
            })

            // 200: Code verified
            // 404: Code expired or doesnt belong to user
            // 500: Internal server error
            const res = await fetch(req)

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: VerifyEmail()")
        }
    }

    VerifyCode = async (code: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: VerifyCode()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const req = new Request(baseUri + "/Verification/VerifyCode", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Code: code,
                    UserDevice: parsedDevice
                })
            })

            // 200: Code was valid
            // 404: Incorrect code
            // 500: Internal server error
            const res = await fetch(req)

            // Backend will respond with temporary token which is required for changing user details
            if (res.status === 200) {
                let token = res.headers.get("authorization")

                if (token !== null) {
                    this.StorageService.StoreValue("jsonwebtoken", token)
                }
            }

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: VerifyCode()")
        }
    }

    VerifyMFA = async (code: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: VerifyMFA()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()
            
            const req = new Request(baseUri + "/Verification/VerifyMFA", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Code: code,
                    UserDevice: parsedDevice
                })
            })

            // 200: Code verified
            // 404: Code expired or doesnt belong to user
            // 500: Internal server error
            const res = await fetch(req)

            // Save token to storage from authorization header
            if (res.status === 200) {
                let token = res.headers.get("authorization")

                if (token !== null) {
                    this.StorageService.StoreValue("jsonwebtoken", token)
                }
            }

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: VerifyMFA()")
        }
    }

    Recover = async (login: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: Recover()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const req = new Request(baseUri + "/Recovery/Recover", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Login: login,
                    UserDevice: parsedDevice
                })
            })

            // 200: Login matched a user. Code sent
            // 404: User matching login couldnt be found
            // 500: Internal server error
            const res = await fetch(req)

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: Recover()");
        }
    }

    ChangePassword = async (newPassword: string, newPasswordRepeat: string): Promise<Response | null> => {
        try {
            // Read device information from storage
            let device = await this.StorageService.ReadObject("userdevice")
            
            if (device === null) {
                // Figure out something here as to not soft lock the user
                throw new Error("ERROR: Couldn't read userdevice from storage in AuthorizationAPI: ChangePassword()")
            }

            let parsedDevice = JSON.parse(device) as UserDevice
            let baseUri = await GetBaseUri()

            const storageService = new StorageService()
            let token = await storageService.ReadValue("jsonwebtoken")

            if (token === null) {
                return null
            }
            
            const req = new Request(baseUri + "/Account/ChangePassword", {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Password: newPassword,
                    PasswordRepeat: newPasswordRepeat,
                    UserDevice: parsedDevice
                })
            })

            // 201: Password changes
            // 304: Passwords didn't match
            // 500: Internal server error
            const res = await fetch(req)

            // Don't store token here. Make user login again

            return res
        } catch (e) {
            console.log(e)
            throw new Error("ERROR: Unable to post to backend in AuthorizationAPI: ChangePassword()")
        }
    }

}

export class ApplicationAPI {

}

export class MessengerAPI {

}

export class BusinessLogicAPI {

}

// --- Common methods --- //

const GetBaseUri = async (): Promise<string | null> => {
    let storageService = new StorageService()

    // Read users continent from local storage
    let continent: string | null = await storageService.ReadValue("continent")
    
    // Set api baseurl based on users continent
    switch (continent) {
        case "europe":
            return "http://10.0.2.2:55024/api"
            break
        case "north-america-east":
            return "https://10.0.2.2:55024/api"
            break
        case "north-america-west":
            return "https://10.0.2.2:55024/api"
            break
        case "south-america":
            return "https://10.0.2.2:55024/api"
            break
        case "middle-east":
            return "https://10.0.2.2:55024/api"
            break
        case "asia":
            return "https://10.0.2.2:55024/api"
            break
        case "oceania":
            return "https://10.0.2.2:55024/api"
            break;
        case "africa":
            return "https://10.0.2.2:55024/api"
            break
        default:    // Default to europe if user doesn't have continent assigned yet
            return "http://10.0.2.2:55024/api"
            break
    }

    return null
}