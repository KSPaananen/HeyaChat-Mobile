import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import uuid from 'react-native-uuid'
import { StorageService } from './StorageService'

export class DeviceService {
    StorageService: StorageService

    constructor() {
        this.StorageService = new StorageService()
    }

    // Set required information to storage
    SetDevicesBasicInformation = async () => {
         // Get devices location with geography api or assume based on localization
         const req = new Request("http://ip-api.com/json/?fields=countryCode", {
            method: "POST"
        })

        let regionCode: string = ""
        
        try {
            // fetch from api
            const res = await fetch(req)
            
            if (res.status === 200) { // On succesful api response get region code from response body
                let data = await res.json()

                if (data !== undefined && data !== null) {
                    regionCode = data.countryCode
                }
            } else { // Get region code with devices localization. Better than nothing
                let locales = Localization.getLocales()

                if (locales[0].regionCode !== null) {
                    regionCode = locales[0].regionCode
                }
            }
            
            // Set continent to storage
            if (europeanCountryTags.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "europe")
            } else if (northAmericanCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "north-america")
            } else if (asianCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "asia")
            } else if (oceanianCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "oceania")
            } else if (southAmericanCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "south-america")
            } else if (middleEasternCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "middle-east")
            } else if (africanCountryCodes.indexOf(regionCode) > -1) {
                this.StorageService.StoreValue("continent", "africa")
            } else { // Default to europe
                this.StorageService.StoreValue("continent", "europe")
            }
        } catch (e) {
            console.log(e)
        } 

        // Check if device data has already been saved
        let foundDevice = await this.StorageService.ReadObject("userdevice")
        
        if (foundDevice !== null && foundDevice !== "" && foundDevice !== undefined) { // Update other details except DeviceIdentifer
            let parsedFoundDev = JSON.parse(foundDevice) as UserDevice
            
            parsedFoundDev.DeviceName = `${Device.brand} ${Device.deviceName}`
            parsedFoundDev.CountryCode = regionCode

            this.StorageService.StoreObject("userdevice", parsedFoundDev)
        } else { // Create a new device object into storage
            let newDevice: UserDevice = {
                DeviceName: `${Device.brand} ${Device.deviceName}`,
                DeviceIdentifier: uuid.v4(),
                CountryCode: regionCode ?? ""
            }

            this.StorageService.StoreObject("userdevice", newDevice)
        }
    }

}

// --- Arrays of isoCountryCodes by continent --- //

const europeanCountryTags: string[] = [
    'AL', 'AD', 'AM', 'AT', 'AZ', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
    'GE', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'KZ', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 
    'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH','TR', 
    'UA', 'GB', 'VA'  
]

const northAmericanCountryCodes: string[] = [
    'AG', 'BS', 'BB', 'BZ', 'CA', 'CR', 'CU', 'DM', 'DO', 'GD', 'HT', "FK", "GF",
    'JM', 'KN', 'LC', 'VC', 'PA', 'TT', 'GT', 'HN', 'MX', 'NI', 'SV', 'US', "GL", 
    "BM", "PM", "PR", "GP", "MQ", "AW", "SX", "BL", "KY", "VG", "TC", "MS"
]

const southAmericanCountryCodes: string[] = [
    'AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'
]

const middleEasternCountryCodes: string[] = [
    'BH', 'CY', 'EG', 'IR', 'IQ', 'IL', 'JO', 'KW', 'LB', 'OM', 'PS', 'QA', 'SA', 'SY', 
    'TR', 'AE', 'YE'
]

const africanCountryCodes: string[] = [
    'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 
    'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 
    'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 
    'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 
    'ZM', 'ZW', "SH", "YT", "RE", "EH"
]

const asianCountryCodes: string[] = [
    'AF', 'BD', 'BT', 'BN', 'KH', 'CN', 'IN', 'ID', 'JP', 'KP', 
    'KR', 'KG', 'LA', 'MY', 'MV', 'MN', 'MM', 'NP', 'PK', 'PH', 'SG', 'LK', 'TJ', 
    'TH', 'TL', 'TM', 'UZ', 'VN'
]

const oceanianCountryCodes: string[] = [
    'AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU',
    "NC", "PF", "WF", "MP", "AS", "GU"
]
