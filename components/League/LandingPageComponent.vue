<template>
  <div class="w-screen flex flex-col">
    <div v-if="notification != ''" class="fixed top-10 right-10 z-10">
      <span class="bg-teal-600 text-white px-2 py-2 rounded-md hover:bg-teal-700 cursor-pointer" @click.prevent="notification = ''">
        {{ notification }}
        <button class="x-2 my-1 text-sm ml-2 hover:text-slate-200" @click.prevent="notification = ''">
          <FontAwesomeIcon :icon="['fas', 'xmark']" />
        </button>
      </span>
    </div>
    <div class="w-full flex justify-center mt-4">
      <div class="text-center pb-2 pr-2 font-bold text-5xl bg-gradient-to-r from-teal-600 to-violet-800 rounded-md hover:animate-spin cursor-default">
        <div class="bg-slate-900 rounded-md w-full h-full m-1 text-teal-400">
          FLEXERATOR
        </div>
      </div>
    </div>
    <div class="w-fit mx-auto">
      <LeagueSelectComponent
        v-if="!loading"
        :seasons="seasons"
        class="mt-8 mb-12"
        @season-selected="(s) => setSelectedSeason(s)"
        @match-selected="(m) => setSelectedMatch(m)"
        @participant-selected="(p) => selectedParticipant = p"
        @notify="notify($event)"
      />
      <LoadingComponent v-else />
    </div>
    <div v-if="createdState || rolledState" class="mx-16 flex flex-col">
      <button class="rounded-md bg-violet-800 text-white py-2 px-4 mx-auto mb-2 border-none disabled:text-violet-300" :disabled="rolledState" @click.prevent="rollRoles()">
        <span v-if="createdState">Roll Roles</span>
        <span v-else>Roles have been assigned</span>
      </button>
      <LeagueRoleListComponent
        :participants="selectedMatch?.champions"
        :own-participant="selectedParticipant"
        :state="rolledState"
        :class="{'h-72': rolledState}"
        @roll="rollRoles()"
      />
    </div>
    <div v-if="rolledState" class="my-8">
      <LeagueChampionList
        v-if="selectedChampion === undefined"
        :not-champions="championsThatParticipantsHavePlayed()"
        class="mx-auto w-fit rounded-md bg-slate-800 border border-violet-800"
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
    rollRoles () {
      if (this.createdState) {
        this.$database.rollRoles(this.selectedSeasonId, this.selectedMatchId)
      }
    },
    championsThatParticipantsHavePlayed (): Champion[] {
      if (this.selectedParticipant != null) {
        const selfChamps = this.selectedSeason?.matches
          .filter((x: Match) => x.champions.filter((y: ChampionParticipant) => y.participant.id === this.selectedParticipant?.id && y.champion).length > 0)
          .map((x: Match) => x.champions.filter((y: ChampionParticipant) => y.participant.id === this.selectedParticipant?.id)[0].champion ?? {} as Champion) ??
          []
        const otherChamps = this.selectedMatch?.champions
          .filter((x: ChampionParticipant) => x.champion)
          .map((x: ChampionParticipant) => x.champion) ?? []
        return [...selfChamps, ...otherChamps]
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
