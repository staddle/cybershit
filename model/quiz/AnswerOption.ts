export class AnswerOption {
  id: number
  name: string
  correct: boolean

  constructor (id: number, name: string, correct: boolean) {
    this.id = id
    this.name = name
    this.correct = correct
  }
}
