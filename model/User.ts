export type User = {
  id: number;
  username: string;
}

export type GuestUser = User & {
}

export type RegisteredUser = User & {
  icon: string;
  registrationDate: Date;
  xp: number;
}
