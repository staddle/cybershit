<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <label for="season">Season:</label>
      <select id="season" v-model="selectedSeason">
        <option v-for="season in seasons" :key="season.id">
          {{ season.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-row">
      <label for="player">Player:</label>
      <select v-if="players" id="player" v-model="selectedParticipant">
        <option v-for="player in players" :key="player.id">
          {{ player.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'SelectComponent',
  props: {
    seasons: {
      type: Array as () => Season[],
      required: true
    }
  },
  data () {
    return {
      selectedSeason: null as Season | null,
      selectedParticipant: null as Participant | null
    }
  },
  computed: {
    players (): Participant[] {
      return this.selectedSeason ? this.selectedSeason.participants : []
    }
  },
  watch: {
    selectedSeason (newSeason) {
      if (newSeason) {
        this.$emit('season-selected', newSeason)
      }
    },
    selectedParticipant (newParticipant) {
      if (newParticipant) {
        this.$emit('participant-selected', newParticipant)
      }
    }
  }
})
</script>
