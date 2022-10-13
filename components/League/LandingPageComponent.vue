<template>
  <div class="w-screen h-screen flex flex-col pt-8">
    <div v-if="notification != ''" class="">
      <span class="bg-blue-600 text-white">
        {{ notification }}
        <button class="border border-white px-2 my-1" @click.prevent="notification = ''">
          x
        </button>
      </span>
    </div>
    <div class="w-fit mx-auto">
      <LeagueSelectComponent
        v-if="!loading"
        :seasons="seasons"
        class="mb-8"
        @season-selected="(s) => setSelectedSeason(s)"
        @match-selected="(m) => setSelectedMatch(m)"
        @match-added="(m) => addMatch(m)"
        @participant-selected="(p) => selectedParticipant = p"
      />
      <div v-else>
        Loading...
      </div>
    </div>
    <div v-if="createdState || rolledState" class="col-start-2">
      <LeagueRoleListComponent
        :participants="selectedMatch?.champions"
        :own-participant="selectedParticipant"
        :state="rolledState"
      />
      <button v-if="createdState" class="rounded-full bg-blue-600 text-white py-4 px-2" @click.prevent="rollRoles">
        Roll
      </button>
    </div>
    <div v-if="rolledState">
      <LeagueChampionList
        v-if="selectedChampion === undefined"
        :not-champions="championsThatParticipantsHavePlayed()"
        @select-champion="(c) => selectChampion(c)"
        @notify="notify($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Champion } from '~/model/Champion'
import { ChampionParticipant, Match, MatchState, Participant, Role, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeaguePage',
  data: () => ({
    seasons: [] as Season[],
    selectedSeasonId: '',
    selectedParticipant: null as Participant | null,
    selectedMatchId: '',
    selectedTab: 'overview',
    loading: true,
    notification: ''
  }),
  computed: {
    selectedSeason (): Season | undefined {
      return this.seasons.find((x: Season) => x.id === this.selectedSeasonId)
    },
    selectedMatch (): Match | undefined {
      return this.selectedSeason?.matches.find((x: Match) => x.id === this.selectedMatchId)
    },
    createdState (): boolean {
      return this.selectedParticipant != null && this.selectedMatch?.state === MatchState.CREATED
    },
    rolledState (): boolean {
      return this.selectedParticipant != null && this.selectedMatch?.state === MatchState.ROLLED
    },
    role (): Role | undefined {
      return this.selectedMatch?.champions.filter((x: ChampionParticipant) => x.participant.id === this.selectedParticipant?.id)[0].role
    },
    selectedChampion (): Champion | undefined {
      return this.selectedMatch?.champions.filter((x: ChampionParticipant) => x.participant.id === this.selectedParticipant?.id)[0].champion
    }
  },
  mounted () {
    this.refreshSeasons()
  },
  methods: {
    refreshSeasons () {
      this.$database.getSeasons().then((seasons: Season[]) => {
        this.seasons = seasons
        this.loading = false
      })
    },
    refreshSelectedSeason () {
      this.$database.getSeason(this.selectedSeasonId).then((season: Season) => {
        this.setSeasonInSeasons(season)
      })
    },
    setSeasonInSeasons (season: Season) {
      this.seasons = this.seasons.map((x: Season) => x.id === season.id ? season : x)
    },
    setSelectedSeason (seasonId: string) {
      this.selectedSeasonId = seasonId
      this.$database.listenForSeason(seasonId, (season: Season) => this.setSeasonInSeasons(season))
    },
    setSelectedMatch (matchId: string) {
      this.selectedMatchId = matchId
    },
    addMatch (newMatch : Match) {
      if (this.selectedSeason) {
        this.$database.addMatch(newMatch, this.selectedSeason.id)
        this.refreshSeasons()
      }
    },
    rollRoles () {
      this.$database.rollRoles(this.selectedSeasonId, this.selectedMatchId)
    },
    championsThatParticipantsHavePlayed (): Champion[] {
      if (this.selectedParticipant != null) {
        return this.selectedSeason?.matches
          .filter((x: Match) => x.champions.filter((y: ChampionParticipant) => y.participant.id === this.selectedParticipant?.id && y.champion).length > 0)
          .map((x: Match) => x.champions.filter((y: ChampionParticipant) => y.participant.id === this.selectedParticipant?.id)[0].champion ?? {} as Champion) ??
          []
      }
      return []
    },
    async selectChampion (champion: Champion) {
      if (this.selectedParticipant && this.selectedMatch) {
        const newMatch = await this.$database.selectChampion(this.selectedSeasonId,
          this.selectedMatchId,
          this.selectedParticipant.id,
          champion)
        if (this.selectedSeason) {
          this.selectedSeason.matches.find((x: Match) => x.id === newMatch.id)!.champions = newMatch.champions
        }
      }
    },
    notify (message: string) {
      this.notification = message
    }
  }
})
</script>

<style lang="scss">

</style>
