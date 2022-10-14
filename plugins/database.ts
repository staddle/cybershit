import { Plugin } from '@nuxt/types'
import { ChampionParticipant, Match, MatchState, Participant, Role, Season } from '~/model/Season'
import { Champion } from '~/model/Champion'
import championRoles from '~/assets/championRoles.js'

export interface Database {
  getSeasons: () => Promise<Season[]>,
  getSeason: (id: string) => Promise<Season>,
  listenForSeason: (seasonId: string, callback: (season: Season) => void) => void,
  addSeason: (season: Season) => string,
  addMatch: (match: Match, selectedSeasonId: string) => string,
  getParticipants: () => Promise<Participant[]>,
  addParticipant: (name: string) => void,
  refreshChampions: () => void,
  getChampion: (name: string) => Promise<Champion>,
  getChampionList: () => Promise<Champion[]>,
  rollRoles: (seasonId: string, matchId: string) => Promise<Match>,
  selectChampion: (seasonId: string, matchId: string, participantId: string, champion: Champion) => Promise<Match>,
}

interface ChampionRole {
  name: string
  roles: Role[]
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
      mapped.map((value: Season) => {
        if (value.matches) {
          value.matches = Object.values(value.matches)
        }
        return value
      })
      return mapped
    }
    return []
  }

  const listenForSeason = (seasonId: string, callback: (season: Season) => void) => {
    app.$fire.database.ref(`lol/seasons/${seasonId}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        const season : Season = snapshot.val()
        if (season.matches) {
          season.matches = Object.values(season.matches)
        }
        callback(season)
      }
    })
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

  const addMatch = (match: Match, selectedSeasonId: string) : string => {
    const newMatchRef = app.$fire.database.ref(`lol/seasons/${selectedSeasonId}/matches`).push()
    match.id = newMatchRef.key ?? ''
    newMatchRef.set(match)
    return newMatchRef.key ?? ''
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
    const championRoles : ChampionRole[] = fetchChampionRoles()
    await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
      .then(res => res.json())
      .then((res) => {
        const champions : Champion[] = Object.values(res.data)
        champions.map((champion: Champion) => {
          champion.roles = championRoles.find((role: ChampionRole) => role.name === champion.name)?.roles ?? []
          return champion
        })
        const returnValue = Object.fromEntries(champions.map((c : Champion) => ([c.id, c])))
        championDataRef.set(returnValue)
      })
  }

  type TempChamp = {name: string, champ: Champion}

  const getChampionList = async () : Promise<Champion[]> => {
    const snapshot = await app.$fire.database.ref('lol/champions').get()
    if (snapshot.val() != null) {
      const temp : TempChamp = Object.values(snapshot.val())[0] as TempChamp
      return Object.values(temp) as Champion[]
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

  const fetchChampionRoles = (): ChampionRole[] => {
    return championRoles.map((x) => {
      return {
        name: x.name,
        roles: x.roles.map((y) => {
          switch (y) {
            case 'top':
              return Role.TOP
            case 'jungle':
              return Role.JUNGLE
            case 'mid':
              return Role.MID
            case 'bot':
              return Role.BOT
            case 'support':
              return Role.SUPPORT
          }
          return Role.TOP
        })
      } as ChampionRole
    })
    /* const result = await fetch('https://leagueoflegends.fandom.com/wiki/List_of_champions_by_draft_position')
    const text = await result.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    return Object.values(doc.querySelectorAll('.article-table')[0]
      .children[1].children)
      .map((x) => {
        const tableCols = Object.values(x.children)
        const name = tableCols[0].attributes[0].value
        const roles = {
          top: tableCols[1].attributes.length > 0,
          jungle: tableCols[2].attributes.length > 0,
          mid: tableCols[3].attributes.length > 0,
          bot: tableCols[4].attributes.length > 0,
          support: tableCols[5].attributes.length > 0
        }
        return { name, roles } as ChampionRole
      })

      Object.values(document.querySelectorAll(".article-table")[0].children[1].children).map((x,i) => {
        const tableCols = Object.values(x.children)
        const name = tableCols[0].attributes[0].value
        const roles = ['top', 'jungle', 'mid', 'bot', 'support']
        return {name, roles: tableCols.filter((x,i)=>i>0&&i<6).map((x,i)=>x.attributes.length>0?roles[i]:0).filter(x=>x!=0)}
      })  */
  }

  inject('database', {
    getSeasons,
    getSeason,
    listenForSeason,
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
