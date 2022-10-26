import { AnswerOption } from './AnswerOption'
import { Question } from './Question'

export class MultipleChoiceQuestion extends Question {
  options: AnswerOption[]
  correctAnswers: number

  constructor (id: number, title: string, description: string, options: AnswerOption[], correctAnswers: number) {
    super(id, title, description)
    this.options = options
    this.correctAnswers = correctAnswers
  }
}
