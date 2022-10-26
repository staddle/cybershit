import { User } from '../auth/User'
import { Question } from './Question'

export class Quiz {
  id: number
  owner: User
  title: string
  description: string
  questions: Question[]

  constructor (id: number, owner: User, title: string, description: string, questions: Question[]) {
    this.id = id
    this.owner = owner
    this.title = title
    this.description = description
    this.questions = questions
  }
}
