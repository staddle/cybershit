import { Champion } from './Champion'

export const riotApi = () => RiotApi.riotApi()

export class RiotApi {
  // eslint-disable-next-line no-use-before-define
  static instance : RiotApi
  championData : Champion[] | undefined

  constructor () {
    this.fetchChampions().then((champions) => {
      this.championData = champions
    })
  }

  static riotApi () {
    if (!this.instance) { this.instance = new RiotApi() }
    return this.instance
  }

  async fetchChampions (): Promise<Champion[]> {
    if (this.championData) {
      return this.championData
    }
    return await fetch('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
      .then(res => res.json())
      .then(res => res.data as Champion[])
  }

  async getChampion (name: string) {
    await this.fetchChampions().then((champions : Champion[]) => {
      return champions.find((champion: Champion) => champion.name === name)
    })
  }

  getChampionImage (name: string) {
    return `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${name}.png`
  }
}
