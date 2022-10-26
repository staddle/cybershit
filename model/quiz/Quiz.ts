import { User } from '../auth/User'
import { Question } from './Question'

export type Quiz = {
  id: number
  owner: User
  title: string
  description: string
  questions: Question[]
}
