<template>
  <div>
    <div class="grid grid-flow-row gap-2">
      <div class="flex flex-row">
        <label for="name" class="mr-2 my-auto">Name: </label>
        <input id="name" v-model="name" class="bg-slate-700 px-2 py-1 rounded-md focus-visible:outline-teal-600 focus-visible:outline-1 focus-visible:outline">
      </div>
      <button v-if="season == null" class="rounded-md bg-violet-800 text-white py-2 px-4 mt-4 hover:bg-violet-700 active:bg-violet-900" @click.prevent="submit">
        Create New
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeagueAdminNewSeason',
  props: {
    season: {
      type: Object as () => Season | null,
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
      name: this.season?.name ?? '',
      participants: [] as Participant[]
    }
  },
  watch: {
    season (newVal) {
      this.name = newVal?.name ?? ''
    }
  },
  mounted: function () {
    if (this.season) {
      this.name = this.season.name
    }
  },
  methods: {
    submit () {
      this.$emit('season-created', {
        name: this.name
      } as Season)
    },
    update () {
      this.$emit('update', {
        name: this.name,
        participants: this.participants
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
