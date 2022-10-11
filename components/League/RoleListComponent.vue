<template>
  <div class="flex flex-row">
    <div
      v-for="cp in participantsSortedByRole"
      :key="cp.participant.id"
      class="flex flex-col"
      :class="{'text-black': cp.participant.id === ownParticipant.id,
               'text-slate-600': cp.participant.id !== ownParticipant.id}"
    >
      <span>
        {{ cp.participant.name }}
      </span>
      <LeagueRoleComponent v-if="state" :role="cp.role" :is-own="cp.participant.id === ownParticipant.id" />
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
