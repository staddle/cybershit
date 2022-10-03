type Participant = {
  id: number
  name: string
}

type Champion = {
  id: number
  name: string
}

type ChampionParticipant = {
  champion: Champion
  participant: Participant
}

type Match = {
  id: number
  champions: ChampionParticipant[]
  date: Date
}

type Season = {
  id: number
  name: string
  participants: Participant[]
  matches: Match[]
}

export { Participant, Champion, ChampionParticipant, Match, Season }
