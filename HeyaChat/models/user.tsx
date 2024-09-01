import { ImageSourcePropType } from 'react-native';

type Nullable<T> = T | null;

export type user = {
  userId: number
  username: string
  email: string
  phone: string
  interactions: Nullable<interactionData>
  profile: Nullable<profile>
}

type interactionData = {
    dateMet: Date
    lastMessage: string
    lastMessageDT: Date
}

type profile = {
    displayname: string
    description: string
    title: string
    icon: ImageSourcePropType
    banner: ImageSourcePropType
}