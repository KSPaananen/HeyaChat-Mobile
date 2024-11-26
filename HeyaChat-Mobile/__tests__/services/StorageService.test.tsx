import * as SecureStore from 'expo-secure-store'
import { StorageService } from '../../services/StorageService'

jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
    getItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}))

describe('StorageService', () => {
    let storageService: StorageService

    let testObject = {
        value1: "value1",
        value2: "value2"
    }

    beforeEach(() => {
        storageService = new StorageService()
        jest.clearAllMocks()
    })

    it('should store a value succesfully', async () => {
        (SecureStore.setItemAsync as jest.Mock).mockResolvedValueOnce(undefined)

        await storageService.StoreValue('valuekey', 'testvalue')

        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('valuekey', 'testvalue')
    })

    it('should read a value successfully', async () => {
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('testvalue')

        let result = await storageService.ReadValue('valuekey')

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('valuekey')
        expect(result).toBe('testvalue')
    })

    it ('should store an object succesfully', async () => {
        (SecureStore.setItemAsync as jest.Mock).mockResolvedValueOnce(undefined)

        await storageService.StoreObject('objectkey', testObject)

        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('objectkey', JSON.stringify(testObject))
    })

    it('should read an object successfully', async () => {
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(testObject))
        
        let result = await storageService.ReadObject('objectkey')

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('objectkey')
        expect(result).toBe(JSON.stringify(testObject))
    })

    it('should delete a value succesfully', async () => {
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(undefined)

        await storageService.Delete('valuekey')

        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('valuekey')
    })
})