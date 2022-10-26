import { User } from './User'

export class GuestUser extends User {
  constructor () {
    super(0, 'Guest')
  }
}
