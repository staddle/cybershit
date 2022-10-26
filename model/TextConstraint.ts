export type TextConstraint = {
  name: string;
}

export type ConstraintType = {
  name: string; // can be characters, words, sentences, paragraphs, or lines
}

export type TextConstraintMaxLength = TextConstraint & {
  type: ConstraintType;
  maxLength: number;
}

export type TextConstraintMinLength = TextConstraint & {
  type: ConstraintType;
  minLength: number;
}
