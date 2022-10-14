<template>
  <div class="w-full h-full flex flex-col align-middle justify-center">
    <div class="bg-slate-800 rounded-md border border-teal-600 mx-auto pb-8 pt-4">
      <div class="mx-4 flex flex-row justify-between">
        <h1 class="font-bold text-2xl">
          Admin Console
        </h1>
        <FontAwesomeIcon icon="arrow-right-to-bracket" class="cursor-pointer hover:text-teal-500" @click.prevent="$router.push('/flexerator')" />
      </div>
      <hr class="border-teal-600 mt-1">
      <div class="mx-4 mt-4">
        <label for="season" class="mr-2">Season: </label>
        <select id="seasons" v-model="selectedSeasonIndex" class="rounded-md bg-slate-700 py-1 px-2">
          <option v-for="season in seasons" :key="season.id" :value="season.id">
            {{ season.name }}
          </option>
          <option value="new">
            New Season
          </option>
        </select>
        <LeagueAdminNewSeason
          :season="selectedSeason"
          :seasons-length="seasons.length"
          class="mt-2"
          @season-created="(s) => seasonAdded(s)"
        />
        <LeagueAdminSelectParticipants
          v-if="selectedSeason != null"
          :season="selectedSeason"
          :allow-add-participants="true"
        />
      </div>
    </div>
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
      selectedSeason: null as Season | null,
      loading: true
    }
  },
  watch: {
    selectedSeasonIndex (val) {
      if (val === 'new') {
        this.selectedSeason = null
      } else {
        const tempSeason = this.seasons.find((x : Season) => x.id === this.selectedSeasonIndex)
        if (tempSeason) { this.selectedSeason = tempSeason } else { this.selectedSeason = null }
      }
    }
  },
  mounted () {
    this.refreshSeasons()
  },
  methods: {
    refreshSeasons () {
      this.$database.getSeasons().then((seasons: Season[]) => {
        this.loading = false
        this.seasons = seasons
        if (this.seasons && this.seasons.length > 0) {
          this.selectedSeasonIndex = this.seasons[0].id.toString()
        }
      })
    },
    seasonAdded (newSeason : Season) {
      const newId = this.$database.addSeason(newSeason)
      this.refreshSeasons()
      this.selectedSeasonIndex = newId
    }
  }
})
</script>
