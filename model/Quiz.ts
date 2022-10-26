import { Question } from './Question'
import { User } from './User'

export type Quiz = {
  id: number;
  owner: User;
  title: string;
  description: string;
  questions: Question[];
}
