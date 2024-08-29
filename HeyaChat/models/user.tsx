type Nullable<T> = T | null;

export type user = {
  userId: number
  username: string
  email: string
  interactions: Nullable<interactionData>
  profile: Nullable<profile>
}

type interactionData = {
    dateMet: Date
    lastMessage: string
    lastMessageDT: Date
}

type profile = {
    icon: string
    title: string
}