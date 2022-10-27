import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { ChampionParticipant, Match, MatchState, Participant, Role, Season } from '~/model/Season'
import { Champion } from '~/model/Champion'
import championRoles from '~/assets/championRoles.js'
import firebaseConfig from '../firebaseConfig.json'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfigObject = firebaseConfig.fb;

const app = initializeApp(firebaseConfigObject);
const db = getDatabase(app);
const dbRef = ref(getDatabase())

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

declare module '#app' {
  interface NuxtApp {
    $database (): Database
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $database (): Database
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('database', () => {
    const getSeasons = async () : Promise<Season[]> => {
      const ret = get(child(dbRef, 'lol/seasons')).then((snapshot) => {
        if (snapshot.exists()) {
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
      })
      return ret;
    }

    const listenForSeason = (seasonId: string, callback: (season: Season) => void) => {
      const seasonRef = ref(db, `lol/seasons/${seasonId}`)
      onValue(seasonRef, (snapshot) => {
        if (snapshot.exists()) {
          const season : Season = snapshot.val()
          if (season.matches) {
            season.matches = Object.values(season.matches)
          }
          callback(season)
        }
      })
    }

    const getSeason = async (id: string) : Promise<Season> => {
      const ret = get(child(dbRef, `lol/seasons/${id}`)).then((snapshot) => {
        return snapshot.exists() ? snapshot.val() as Season : {} as Season
      })
      return ret
    }

    const addSeason = (newSeason: Season) => {
      const newSeasonRef = ref(db, 'lol/seasons')
      newSeason.id = newSeasonRef.key ?? ''
      set(newSeasonRef, newSeason)
      return newSeason.id
    }

    const addMatch = (match: Match, selectedSeasonId: string) : string => {
      const newMatchRef = ref(db, `lol/seasons/${selectedSeasonId}/matches`)
      match.id = newMatchRef.key ?? ''
      set(newMatchRef, match)
      return newMatchRef.key ?? ''
    }

    const getParticipants = async () : Promise<Participant[]> => {
      return get(child(dbRef, 'lol/participants')).then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val())
        }
      })
    }

    const addParticipant = (name: string) : void => {
      const newParticipantRef = ref(db, 'lol/participants')
      set(newParticipantRef, {
        id: newParticipantRef.key,
        name
      })
    }

    const refreshChampions = async () : Promise<void> => {
      const championDataRef = ref(db, 'lol/champions')
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
          set(championDataRef, returnValue)
        })
    }

    type TempChamp = {name: string, champ: Champion}

    const getChampionList = async () : Promise<Champion[]> => {
      return get(child(dbRef, 'lol/champions')).then((snapshot) => {
        if (snapshot.exists) {
          const temp : TempChamp = Object.values(snapshot.val())[0] as TempChamp
          return Object.values(temp) as Champion[]
        } else {
          return refreshChampions().then(getChampionList)
        }
      })
    }

    const getChampion = async (name: string) : Promise<Champion | null> => 
      get(child(dbRef, `lol/champions/${name}`)).then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : null
      })

    const rollRoles = async (seasonId: string, matchId: string) : Promise<Match> => {
      return get(child(dbRef, `lol/seasons/${seasonId}/matches/${matchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
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
          set(ref(db, `lol/seasons/${seasonId}/matches/${matchId}`), match)
          return match
        }
        return {} as Match
      })
    }

    const selectChampion = async (seasonId: string, matchId: string, participantId: string, champion: Champion) : Promise<Match> => {
      return get(child(dbRef, `lol/seasons/${seasonId}/matches/${matchId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const match = snapshot.val() as Match
          match.champions = match.champions.map((participant: ChampionParticipant) => {
            if (participant.participant.id === participantId) {
              participant.champion = champion
            }
            return participant
          })
          set(ref(db, `lol/seasons/${seasonId}/matches/${matchId}`), match)
          return match
        }
        return {} as Match
      })
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
  })
})
