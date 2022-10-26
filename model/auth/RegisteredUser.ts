import { User } from './User'

export type RegisteredUser = User & {
  icon: string
  registrationDate: Date
  xp: number
}
