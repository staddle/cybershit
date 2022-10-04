<template>
  <div class="grid grid-flow-col justify-center align-middle">
    <LeagueSelectComponent
      :seasons="seasons"
      @season-selected="(s) => selectedSeason = s"
      @participant-selected="(p) => selectedParticipant = p"
    />
    <div v-if="selectedParticipant">
      <LeagueChampionList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeaguePage',
  data: () => ({
    seasons: [] as Season[],
    selectedSeason: null as Season | null,
    selectedParticipant: null as Participant | null,
    selectedTab: 'overview'
  }),
  mounted () {
    const dbRef = this.$fire.database.ref('lol/seasons')
    dbRef.on('value', (snapshot) => {
      this.seasons = snapshot.val()
    })
  }
})
</script>
