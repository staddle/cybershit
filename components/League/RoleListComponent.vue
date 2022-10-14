<template>
  <div class="grid grid-cols-5 grid-rows-1 bg-slate-800 rounded-md border border-violet-800 text-white divide-x">
    <div
      v-for="cp in participantsSortedByRole"
      :key="cp.participant.id"
      class="px-4 py-2 text-center grid grid-cols-1 text-white border-slate-600"
      :class="{
        'grid-rows-3': state,
        'grid-rows-2': !state
      }"
    >
      <div>
        <span class="rounded-md mx-auto px-2 pb-1 text-2xl" :class="{'bg-violet-800': cp.participant.id === ownParticipant.id}">
          {{ cp.participant.name }}
        </span>
        <hr class="border-slate-600 mt-3 w-32 mx-auto">
      </div>
      <LeagueRoleComponent
        v-if="state"
        :role="cp.role"
        :is-own="cp.participant.id === ownParticipant.id"
        :show-name="false"
        :height="46"
        :width="46"
        class="mx-auto"
      />
      <LeagueChampionDetail
        v-if="state"
        :participant="cp"
        :is-own="cp.participant.id === ownParticipant.id"
      />
      <LeagueRoleAnimation v-else class="h-16" :delay="Math.random()" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChampionParticipant, Participant } from '~/model/Season'

export default Vue.extend({
  name: 'RoleListComponent',
  props: {
    participants: {
      type: Array as () => ChampionParticipant[],
      required: true
    },
    ownParticipant: {
      type: Object as () => Participant,
      required: true
    },
    state: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    participantsSortedByRole () : ChampionParticipant[] {
      return [...this.participants].sort((a: ChampionParticipant, b: ChampionParticipant) => {
        if (a.role === undefined) {
          return 1
        }
        if (b.role === undefined) {
          return -1
        }
        return a.role - b.role
      })
    }
  }
})
</script>
