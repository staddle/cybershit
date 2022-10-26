import { AnswerOption } from './AnswerOption'

export class ImageAnswer extends AnswerOption {
  url: string

  constructor (id: number, correct: boolean, url: string) {
    super(id, correct)
    this.url = url
  }
}
