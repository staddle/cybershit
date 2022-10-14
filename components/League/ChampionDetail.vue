<template>
  <div>
    <div v-if="participant.champion" class="grid grid-cols-1 grid-rows-3 h-full">
      <span>{{ participant.champion.name }}</span>
      <a :href="`https://lolalytics.com/lol/${participant.champion.id.toLowerCase()}/build/`" class="mx-auto row-span-2 my-auto relative">
        <div class="ring-2 ring-inset ring-violet-800 absolute top-0 right-0 w-full h-full" />
        <LeagueChampIcon :champ="participant.champion" :clickable="false" />
      </a>
    </div>
    <div v-else class="grid grid-cols-1 grid-rows-3 h-full">
      <span>No champion selected</span>
      <div class="text-violet-600 border border-violet-800 mx-auto w-12 h-12 row-span-2 my-auto flex justify-center items-center">
        <FontAwesomeIcon icon="question" class="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChampionParticipant } from '~/model/Season'

export default Vue.extend({
  name: 'ChampionDetail',
  props: {
    participant: {
      type: Object as () => ChampionParticipant,
      required: true
    },
    isOwn: {
      type: Boolean,
      required: true
    }
  }
})
</script>
