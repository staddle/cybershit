import { Champion } from './Champion'

type Participant = {
  id: string
  name: string
}

enum Role {
  TOP,
  JUNGLE,
  MID,
  BOT,
  SUPPORT,
}

type ChampionParticipant = {
  role: Role
  champion: Champion
  participant: Participant
}

enum MatchState {
  CREATED,
  ROLLED,
  FINISHED
}

type Match = {
  id: string
  name: string
  champions: ChampionParticipant[]
  date: number
  state: MatchState
}

type Season = {
  id: string
  name: string
  participants: Participant[]
  matches: Match[]
}

export { Participant, ChampionParticipant, Match, Season, MatchState, Role }
