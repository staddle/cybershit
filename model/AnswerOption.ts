export type AnswerOption = {
  id: number;
  correct: boolean;
}

export type StringAnswer = AnswerOption & {
  answer: string;
}

export type ImageAnswer = AnswerOption & {
  url: string;
}
