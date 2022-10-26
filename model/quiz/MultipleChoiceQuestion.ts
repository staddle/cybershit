import { AnswerOption } from './AnswerOption'
import { Question } from './Question'

export type MultipleChoiceQuestion = Question & {
  options: AnswerOption[]
  correctAnswers: number
}
