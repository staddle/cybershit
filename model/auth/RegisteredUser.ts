import { User } from './User'

export class RegisteredUser extends User {
  icon: string
  registrationDate: Date
  xp: number

  constructor (id: number, username: string, icon: string, registrationDate: Date, xp: number) {
    super(id, username)
    this.icon = icon
    this.registrationDate = registrationDate
    this.xp = xp
  }
}
