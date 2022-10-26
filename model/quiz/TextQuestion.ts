import { Question } from './Question'
import { TextConstraint } from './TextConstraint'

export class TextQuestion extends Question {
  label?: string // e.g. "Please enter your name"
  preText?: string // e.g. "My name is"
  constraints?: TextConstraint[]

  constructor (
    id: number,
    title: string,
    description: string,
    label?: string,
    preText?: string,
    constraints?: TextConstraint[]
  ) {
    super(id, title, description)
    this.label = label
    this.preText = preText
    this.constraints = constraints
  }
}
