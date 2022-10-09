<template>
  <div>
    <div class="flex flex-col flex-auto">
      <span>ID: {{ seasonId }}</span>
      <label for="name">Name: </label>
      <input id="name" v-model="name" class="border border-blue-600 rounded-full">
      <LeagueAdminSelectParticipants
        :season="season"
        :allow-add-participants="true"
        @participant-selected="(p) => selectParticipant(p)"
      />
      <button class="rounded-full bg-blue-600 text-white py-2 px-4 mt-8" @click.prevent="submit">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Match, Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeagueAdminNewSeason',
  props: {
    season: {
      type: Object as () => Season,
      required: false,
      default: () => undefined
    },
    seasonsLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      seasonId: this.season ? (this.season as Season).id : this.seasonsLength,
      name: this.season?.name ?? '',
      participants: [] as Participant[]
    }
  },
  methods: {
    submit () {
      this.$emit('season-created', {
        id: this.seasonId,
        name: this.name,
        participants: this.participants,
        matches: [] as Match[]
      } as Season)
    },
    selectParticipant (p : Participant[]) {
      this.participants = p
    }
  }
})
</script>

<style>

</style>
