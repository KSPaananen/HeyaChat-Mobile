import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import uuid from 'react-native-uuid'
import * as SecureStore from 'expo-secure-store'
import { DeviceService } from '../../services/DeviceService'
import { StorageService } from '../../services/StorageService'

jest.mock('../../services/StorageService', () => ({
    StorageService: jest.fn().mockImplementation(() => ({
        StoreValue: jest.fn(),
        ReadValue: jest.fn(),
        StoreObject: jest.fn(),
        ReadObject: jest.fn().mockResolvedValue(null),
        Delete: jest.fn(),
    }))
}))

jest.mock('expo-device', () => {
    brand: 'testbrand'
    deviceName: 'testname'
})

jest.mock('expo-localization', () => {
    getLocales: jest.fn(() => [{ regionCode: 'FI' }])
})

jest.mock('react-native-uuid', () => ({
    v4: jest.fn(() => 'mocked-uuid-value')
}))

describe('DeviceService', () => {
    let deviceService: DeviceService

    let testDevice = {
        DeviceName: 'testname',
        DeviceIdentifier: 'testidentifier',
        CountryCode: 'eu'
    }

    beforeEach(() => {
        deviceService = new DeviceService()

    })

    afterEach(() => {
        // jest.resetAllMocks()
    })

    it('can construct storageservice', async () => {
        await deviceService.SetDevicesBasicInformation()
        expect(StorageService).toHaveBeenCalledTimes(1)
    })

    it('can save continent with a succesful api fetch', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ countryCode: 'FI' }),
            } as Response)
        )
        
        let mockStorageService = deviceService.StorageService as jest.Mocked<StorageService>
        
        await deviceService.SetDevicesBasicInformation()

        expect(mockStorageService.StoreValue).toHaveBeenCalledWith('continent', 'europe')
    })

    // it('can save continent with localization', async () => {
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             ok: true,
    //             status: 500,
    //             json: () => Promise.resolve({ countryCode: '' }),
    //         } as Response)
    //     )

        
    //     let mockStorageService = deviceService.StorageService as jest.Mocked<StorageService>
        
    //     await deviceService.SetDevicesBasicInformation()
       
    //     expect(Localization.getLocales).toHaveBeenCalled()
    //     expect(mockStorageService.StoreValue).toHaveBeenCalledWith('continent', 'europe')
    // })

})