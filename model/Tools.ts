import { GuestUser } from './auth/GuestUser'
import { User } from './auth/User'
import { AnswerOption } from './quiz/AnswerOption'
import { MultipleChoiceQuestion } from './quiz/MultipleChoiceQuestion'
import { Quiz } from './quiz/Quiz'
import { TextConstraintMinLength, ConstraintType } from './quiz/TextConstraint'
import { TextQuestion } from './quiz/TextQuestion'

export class Tools {
  private static guestUser : User

  static getGuestUser (): User {
    if (Tools.guestUser == null) {
      Tools.guestUser = new GuestUser()
    }
    return Tools.guestUser
  }

  static getDefaultQuiz () : Quiz {
    const guestUser : User = Tools.getGuestUser()
    const multiQuestion : MultipleChoiceQuestion = new MultipleChoiceQuestion(
      0,
      'What is the capital of France?',
      'Choose the correct answer',
      [
        new AnswerOption(0, 'Paris', true),
        new AnswerOption(1, 'London', false),
        new AnswerOption(2, 'Berlin', false),
        new AnswerOption(3, 'Rome', false)
      ],
      1
    )
    const textQuestion : TextQuestion = new TextQuestion(
      1,
      'What is the capital of Germany?',
      'Write the correct answer',
      'Type here:',
      'The city is ',
      [
        new TextConstraintMinLength('minLength', new ConstraintType('words'), 4)
      ]
    )
    return new Quiz(
      0,
      guestUser,
      'First Quiz',
      'This is the first quiz',
      [multiQuestion, textQuestion]
    )
  }
}
