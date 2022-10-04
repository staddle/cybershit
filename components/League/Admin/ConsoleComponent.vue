<template>
  <div>
    <label for="season">Season: </label>
    <select id="seasons" v-model="selectedSeasonIndex">
      <option v-for="season in seasons" :key="season.id" :value="season.id">
        {{ season.name }}
      </option>
      <option value="new">
        New Season
      </option>
    </select>
    <LeagueAdminNewSeason :season="selectedSeason" :seasons-length="seasons.length" @season-created="(s) => seasonAdded(s)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeagueAdminConsole',
  data () {
    return {
      selectedSeasonIndex: 'new',
      seasons: [] as Season[],
      selectedSeason: null as Season | null
    }
  },
  watch: {
    selectedSeasonIndex (val) {
      if (val === 'new') {
        this.selectedSeason = null
      } else {
        const tempSeason = this.seasons.find((x : Season) => x.id === Number.parseInt(this.selectedSeasonIndex))
        if (tempSeason) { this.selectedSeason = tempSeason } else { this.selectedSeason = null }
      }
    }
  },
  mounted () {
    this.refreshSeasons()
  },
  methods: {
    refreshSeasons () {
      const dbRef = this.$fire.database.ref('lol/seasons')
      dbRef.on('value', (snapshot) => {
        this.seasons = snapshot.val()
        if (this.seasons.length > 0) {
          this.selectedSeasonIndex = this.seasons[0].id.toString()
        }
      })
    },
    seasonAdded (newSeason : Season) {
      const dbRef = this.$fire.database.ref('lol/seasons')
      dbRef.push(newSeason).then(this.refreshSeasons).then(() => {
        this.selectedSeasonIndex = newSeason.id.toString()
      })
    }
  }
})
</script>
