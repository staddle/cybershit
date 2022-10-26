import { AnswerOption } from './AnswerOption'
import { TextConstraint } from './TextConstraint'

export type Question = {
  id: number;
  title: string;
  description: string;
}

export type MultipleChoiceQuestion = Question & {
  options: AnswerOption[];
  correctAnswers: number;
}

export type TextQuestion = Question & {
  label?: string; // e.g. "Please enter your name"
  preText?: string; // e.g. "My name is"
  constraints?: TextConstraint[];
}
