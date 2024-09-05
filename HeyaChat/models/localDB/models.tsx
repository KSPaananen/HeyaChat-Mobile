import { ImageSourcePropType } from 'react-native';

type Nullable<T> = T | null;

export type users = {
  userID: number
  username: string
  email: string
  phone: string
  localUser: boolean
}

export type interactions = {
    interactionID: number
    lastMetDT: Date
    lastMessage: Nullable<string>
    lastMessageDT: Nullable<Date>
    userID: number
}

export type profiles = {
    profileID: number
    displayname: string
    title: string
    description: string
    iconUrl: string
    bannerUrl: string
    userID: number
}