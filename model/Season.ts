type Participant = {
  id: string
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
  id: string
  champions: ChampionParticipant[]
  date: Number
}

type Season = {
  id: string
  name: string
  participants: Participant[]
  matches: Match[]
}

export { Participant, Champion, ChampionParticipant, Match, Season }
