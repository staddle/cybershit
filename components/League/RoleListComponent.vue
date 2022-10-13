<template>
  <div class="grid grid-cols-5 grid-rows-1 bg-slate-800 rounded-md border border-violet-800 text-white px-4 divide-x">
    <div
      v-for="cp in participantsSortedByRole"
      :key="cp.participant.id"
      class="flex flex-col px-4 py-2 border-slate-600"
      :class="{'text-white': cp.participant.id === ownParticipant.id,
               'text-slate-300': cp.participant.id !== ownParticipant.id}"
    >
      <span>
        {{ cp.participant.name }}
      </span>
      <LeagueRoleComponent
        v-if="state"
        :role="cp.role"
        :is-own="cp.participant.id === ownParticipant.id"
        :show-name="false"
      />
      <LeagueChampionDetail
        :participant="cp"
        :is-own="cp.participant.id === ownParticipant.id"
      />
    </div>
    <button v-if="!state" class="rounded-md bg-violet-800 text-white py-2 px-4 mx-auto col-start-3 mb-2" @click.prevent="$emit('roll')">
      Roll Roles
    </button>
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
