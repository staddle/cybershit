export type ConstraintType = {
  name: string
}

export type TextConstraint = {
  name: string
  type: ConstraintType
}

export type TextConstraintMaxLength = TextConstraint & {
  maxLength: number
}

export type TextConstraintMinLength = TextConstraint & {
  minLength: number
}
