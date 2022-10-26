import { User } from './auth/User'
import { AnswerOption } from './quiz/AnswerOption'
import { MultipleChoiceQuestion } from './quiz/MultipleChoiceQuestion'
import { Quiz } from './quiz/Quiz'
import { TextConstraintMinLength, TextConstraint } from './quiz/TextConstraint'
import { TextQuestion } from './quiz/TextQuestion'

export class Tools {
  private static guestUser : User

  static getGuestUser (): User {
    if (Tools.guestUser == null) {
      Tools.guestUser = {
        id: 0,
        username: 'Guest'
      } as User
    }
    return Tools.guestUser
  }

  static getDefaultQuiz () : Quiz {
    const guestUser : User = Tools.getGuestUser()
    const multiQuestion : MultipleChoiceQuestion = {
      id: 0,
      title: 'What is the capital of France?',
      description: 'Choose the correct answer',
      options: [
        { id: 0, name: 'Paris', correct: true } as AnswerOption,
        { id: 0, name: 'Berlin', correct: false } as AnswerOption,
        { id: 0, name: 'London', correct: false } as AnswerOption,
        { id: 0, name: 'Warsaw', correct: false } as AnswerOption
      ] as AnswerOption[],
      correctAnswers: 1
    } as MultipleChoiceQuestion

    const textQuestion : TextQuestion = {
      id: 1,
      title: 'What is the capital of Germany?',
      description: 'Write the correct answer',
      label: 'Type here:',
      preText: 'The city is ',
      constraints: [
        { name: 'minLength', type: { name: 'words' }, minLength: 4 } as TextConstraintMinLength
      ] as TextConstraint[]
    } as TextQuestion

    return {
      id: 0,
      owner: guestUser,
      title: 'First Quiz',
      description: 'This is the first quiz',
      questions: [multiQuestion, textQuestion]
    } as Quiz
  }
}
