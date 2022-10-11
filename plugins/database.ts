import { Plugin } from '@nuxt/types'
import { ChampionParticipant, Match, MatchState, Participant, Role, Season } from '~/model/Season'
import { Champion } from '~/model/Champion'

export interface Database {
  getSeasons: () => Promise<Season[]>,
  getSeason: (id: string) => Promise<Season>,
  addSeason: (season: Season) => string,
  addMatch: (match: Match, selectedSeasonId: string) => void,
  getParticipants: () => Promise<Participant[]>,
  addParticipant: (name: string) => void,
  refreshChampions: () => void,
  getChampion: (name: string) => Promise<Champion>,
  getChampionList: () => Promise<Champion[]>,
  rollRoles: (seasonId: string, matchId: string) => Promise<Match>,
  selectChampion: (seasonId: string, matchId: string, participantId: string, champion: Champion) => Promise<Match>,
}

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $database: Database
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $database: Database
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $database: Database
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $database: Database
  }
}

const myPlugin : Plugin = ({ app }, inject) => {
  const getSeasons = async () : Promise<Season[]> => {
    const snapshot = await app.$fire.database.ref('lol/seasons').get()
    if (snapshot.val()) {
      const mapped : Season[] = Object.values(snapshot.val())
      /* .map((a : Season) => {
        return {
          id: a.id,
          name: a.name,
          participants: a.participants,
          matches: a.matches
        } as Season
      }) */
      mapped.map((value: Season) => {
        value.matches = Object.values(value.matches)
        return value
      })
      return mapped
    }
    return []
  }

  const getSeason = async (id: string) : Promise<Season> => {
    const snapshot = await app.$fire.database.ref(`lol/seasons/${id}`).get()
    return snapshot.val() ? snapshot.val() as Season : {} as Season
  }

  const addSeason = (newSeason: Season) => {
    const newSeasonRef = app.$fire.database.ref('lol/seasons').push()
    newSeason.id = newSeasonRef.key ?? ''
    newSeasonRef.set(newSeason)
    return newSeason.id
  }

  const addMatch = (match: Match, selectedSeasonId: string) => {
    const newMatchRef = app.$fire.database.ref(`lol/seasons/${selectedSeasonId}/matches`).push()
    match.id = newMatchRef.key ?? ''
    newMatchRef.set(match)
  }

  const getParticipants = async () : Promise<Participant[]> => {
    const snapshot = await app.$fire.database.ref('lol/participants').get()
    if (snapshot.val() != null) {
      return Object.values(snapshot.val())
    }
    return []
  }

  const addParticipant = (name: string) : void => {
    const newParticipantRef = app.$fire.database.ref('lol/participants').push()
    newParticipantRef.set({
      id: newParticipantRef.key,
      name
    })
  }

  const refreshChampions = async () : Promise<void> => {
    const championDataRef = app.$fire.database.ref('lol/champions').push()
    await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
      .then(res => res.json())
      .then(res => championDataRef.set(res.data))
  }

  const getChampionList = async () : Promise<Champion[]> => {
    const snapshot = await app.$fire.database.ref('lol/champions').get()
    if (snapshot.val() != null) {
      return Object.values(snapshot.val())[0] as Champion[]
    } else {
      await refreshChampions()
      return await getChampionList()
    }
  }

  const getChampion = async (name: string) : Promise<Champion | null> => {
    const snapshot = await app.$fire.database.ref(`lol/champions/${name}`).get()
    if (snapshot.val()) { return snapshot.val() }
    return null
  }

  const rollRoles = async (seasonId: string, matchId: string) : Promise<Match> => {
    const dbRef = app.$fire.database.ref(`lol/seasons/${seasonId}/matches/${matchId}`)
    const snapshot = await dbRef.get()
    if (snapshot.val()) {
      const match = snapshot.val() as Match
      const participants = match.champions
      const roles : Role[] = [Role.TOP, Role.JUNGLE, Role.MID, Role.BOT, Role.SUPPORT]
      const randomRoles : Role[] = roles.sort(() => Math.random() - 0.5)
      const randomParticipants = participants.sort(() => Math.random() - 0.5)
      randomParticipants.map((participant: ChampionParticipant, index: number) => {
        participant.role = randomRoles[index]
        return participant
      })
      match.champions = randomParticipants
      match.state = MatchState.ROLLED
      dbRef.set(match)
      return match
    }
    return {} as Match
  }

  const selectChampion = async (seasonId: string, matchId: string, participantId: string, champion: Champion) : Promise<Match> => {
    const dbRef = app.$fire.database.ref(`lol/seasons/${seasonId}/matches/${matchId}`)
    const snapshot = await dbRef.get()
    if (snapshot.val()) {
      const match = snapshot.val() as Match
      match.champions = match.champions.map((participant: ChampionParticipant) => {
        if (participant.participant.id === participantId) {
          participant.champion = champion
        }
        return participant
      })
      dbRef.set(match)
      return match
    }
    return {} as Match
  }

  inject('database', {
    getSeasons,
    getSeason,
    addSeason,
    addMatch,
    getParticipants,
    addParticipant,
    refreshChampions,
    getChampion,
    getChampionList,
    rollRoles,
    selectChampion
  } as Database)
}

export default myPlugin
