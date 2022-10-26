import { Question } from './Question'
import { TextConstraint } from './TextConstraint'

export type TextQuestion = Question & {
  label: string // e.g. "Please enter your name"
  preText?: string // e.g. "My name is"
  constraints?: TextConstraint[]
}
