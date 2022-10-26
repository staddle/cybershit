import { AnswerOption } from './AnswerOption'

export class StringAnswer extends AnswerOption {
  answer: string

  constructor (id: number, correct: boolean, answer: string) {
    super(id, correct)
    this.answer = answer
  }
}
