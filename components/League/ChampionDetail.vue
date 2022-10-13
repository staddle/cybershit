<template>
  <div class="flex flex-col">
    <div v-if="participant.champion" class="flex flex-col">
      <span>{{ participant.champion.name }}</span>
      <LeagueChampIcon :champ="participant.champion" :clickable="false" />
      <span v-if="isOwn">
        <a :href="`https://lolalytics.com/lol/${participant.champion.id.toLowerCase()}/build/`">Builds</a>
      </span>
    </div>
    <div v-else class="text-violet-600 border border-violet-800 mx-auto w-8 h-8 rounded-md">
      <FontAwesomeIcon icon="question" />
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
