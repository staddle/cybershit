export class ConstraintType {
  name: string

  constructor (name: string) {
    this.name = name
  }
}

export class TextConstraint {
  name: string
  type: ConstraintType

  constructor (name: string, type: ConstraintType) {
    this.name = name
    this.type = type
  }
}

export class TextConstraintMaxLength extends TextConstraint {
  maxLength: number

  constructor (name: string, type: ConstraintType, maxLength: number) {
    super(name, type)
    this.maxLength = maxLength
  }
}

export class TextConstraintMinLength extends TextConstraint {
  minLength: number

  constructor (name: string, type: ConstraintType, minLength: number) {
    super(name, type)
    this.minLength = minLength
  }
}
