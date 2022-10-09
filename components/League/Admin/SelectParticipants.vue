<template>
  <div class="flex flex-col justify-center align-middle">
    <h2>Participants</h2>
    <div v-for="p in availableParticipants" :key="p.id" class="ring rounded-full ring-blue-600">
      <input :id="p.id" v-model="participants" type="checkbox" :value="p.id">
      <label :for="p.id">{{ p.name }}</label>
    </div>
    <button v-if="allowAddParticipants" class="rounded-full bg-blue-400 text-white py-2" @click.prevent="addingParticipant = true">
      Add Participant
    </button>
    <div v-if="addingParticipant">
      <label for="name">Name</label>
      <input id="name" v-model="participantName" class="border border-blue-600 rounded-full">
      <button class="rounded-full bg-blue-400 text-white py-2 px-4" @click.prevent="pushParticipant(participantName)">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'SelectParticipants',
  props: {
    season: {
      type: Object as () => Season,
      required: true
    },
    allowAddParticipants: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      availableParticipants: [] as Participant[],
      participantName: '',
      addingParticipant: false,
      participants: []
    }
  },
  watch: {
    participants (newVal) {
      const p = this.availableParticipants.filter((p : Participant) => newVal.includes(p.id))
      this.$emit('participant-selected', p)
    }
  },
  mounted () {
    this.refreshParticipants()
  },
  methods: {
    pushParticipant (name: string) {
      this.$database.addParticipant(name)
      this.refreshParticipants()
      this.addingParticipant = false
    },
    refreshParticipants () {
      this.$database.getParticipants().then((participants : Participant[]) => {
        this.availableParticipants = participants
      })
    }
  }
})
</script>

<style>

</style>
