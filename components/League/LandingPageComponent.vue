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
    <div v-if="selectedParticipant">
      <LeagueChampionList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChampionParticipant, Match, Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeaguePage',
  data: () => ({
    seasons: [] as Season[],
    selectedSeasonId: '',
    selectedParticipant: null as Participant | null,
    selectedMatch: null as Match | null,
    selectedTab: 'overview',
    loading: true
  }),
  computed: {
    selectedSeason (): Season | undefined {
      return this.seasons.find((x: Season) => x.id === this.selectedSeasonId)
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
    setSelectedSeason (seasonId: string) {
      this.selectedSeasonId = seasonId
    },
    setSelectedMatch (match: Match) {
      this.selectedMatch = match
    },
    addMatch (newMatch : Match) {
      if (this.selectedSeason) {
        this.$database.addMatch(newMatch, this.selectedSeason.id)
        this.refreshSeasons()
      }
    }
  }
})
</script>
