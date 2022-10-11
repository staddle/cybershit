<template>
  <div class="flex flex-col justify-center align-middle">
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
    <button v-if="createdState" class="rounded-full bg-blue-600 text-white py-4 px-2" @click.prevent="rollRoles">
      Roll
    </button>
    <LeagueRoleListComponent v-if="createdState || rolledState" :participants="selectedMatch?.champions" :own-participant="selectedParticipant" :state="rolledState" />
    <div v-if="rolledState">
      <LeagueChampionList
        :not-champions="championsThatParticipantsHavePlayed()"
        @select-participant="(c) => selectChampion(c)"
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
    loading: true
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
    }
  },
  mounted () {
    this.refreshSeasons()
  },
  methods: {
    refreshSeasons () {
      this.loading = false
      this.$database.getSeasons().then((seasons: Season[]) => {
        this.seasons = seasons
        this.loading = false
      })
    },
    refreshSelectedSeason () {
      this.$database.getSeason(this.selectedSeasonId).then((season: Season) => {
        this.seasons = this.seasons.map((x: Season) => x.id === season.id ? season : x)
      })
    },
    setSelectedSeason (seasonId: string) {
      this.selectedSeasonId = seasonId
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
    selectChampion (champion: Champion) {
      if (this.selectedParticipant && this.selectedMatch) {
        this.$database.selectChampion(this.selectedSeasonId,
          this.selectedMatchId,
          this.selectedParticipant.id,
          champion).then(this.refreshSelectedSeason)
      }
    }
  }
})
</script>
